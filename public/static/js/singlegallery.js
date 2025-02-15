import { sha256 } from "/static/js/crypto-hash/browser.js";

const CONCURRENT_UPLOAD_LIMIT = 5;

class FileUploader {
  constructor(config) {
    this.fileInput = config.fileInput;
    this.submitButton = config.submitButton;
    this.progressBar = config.progressBar;
    this.uploadErrorBox = config.uploadErrorBox;
    this.currentFileCounter = config.currentFileCounter;
    this.maxFileCounter = config.maxFileCounter;

    this.fileList = [];
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.fileInput.addEventListener("change", () => {
      this.fileList = Array.from(this.fileInput.files);
    });

    this.submitButton.addEventListener("click", this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.resetUploadState();

    try {
      const results = await this.uploadFiles(
        this.fileList,
        CONCURRENT_UPLOAD_LIMIT,
        this.createCompletionCallback()
      );
    } catch (error) {
      console.error("Batch upload failed:", error);
    }
  }

  resetUploadState() {
    this.progressBar.setAttribute("aria-valuemax", this.fileList.length);
    this.maxFileCounter.innerText = this.fileList.length;
    this.uploadErrorBox.innerHTML = "";
  }

  createCompletionCallback() {
    return (results) => {
      const successfulUploads = results.filter((r) => r.success);
      const failedUploads = results.filter((r) => !r.success);

      this.logUploadSummary(results);
      this.displayUploadNotification(successfulUploads, results);
    };
  }

  logUploadSummary(results) {
    console.log(`Upload complete: 
            Total files: ${results.length}
            Successful uploads: ${results.filter((r) => r.success).length}
            Failed uploads: ${results.filter((r) => !r.success).length}
        `);
  }

  displayUploadNotification(successfulUploads, results) {
    if (successfulUploads.length === results.length) {
      const successMessage = `<div class="alert alert-success">
        All files uploaded successfully! <span id="reload-countdown"></span>
      </div>`;
      this.uploadErrorBox.innerHTML = successMessage + this.uploadErrorBox.innerHTML;

      // Add a countdown timer for the page reload
      let countdown = 5;
      const countdownElement = document.getElementById("reload-countdown");

      const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.innerText = `Reloading in ${countdown} seconds...`;

        if (countdown === 0) {
          clearInterval(countdownInterval);
          window.location.reload();
        }
      }, 1000);
    } else if (successfulUploads.length > 0) {
      this.uploadErrorBox.innerHTML = `<div class="alert alert-warning">
        ${successfulUploads.length} out of ${results.length} files uploaded successfully <button type="button" class="btn btn-light" onclick="{window.location.reload();}">Reload the page to see the changes</button>
      </div>` + this.uploadErrorBox.innerHTML;
    } else {
      this.uploadErrorBox.innerHTML = `<div class="alert alert-warning">
        No files were uploaded successfully
      </div>` + this.uploadErrorBox.innerHTML;
    }
  }

  async uploadFiles(files, concurrencyLimit, onCompletedCallback = null) {
    const results = [];
    const uploadQueue = [...files];
    const activeUploads = new Set();

    return new Promise((resolve) => {
      const uploadNext = async () => {
        if (uploadQueue.length === 0 && activeUploads.size === 0) {
          this.finalizeUpload(results, onCompletedCallback);
          resolve(results);
          return;
        }

        if (activeUploads.size >= concurrencyLimit) return;

        if (uploadQueue.length > 0) {
          const file = uploadQueue.shift();
          const uploadPromise = this.processFile(file, results).finally(() => {
            activeUploads.delete(uploadPromise);
            this.updateProgress(results.length, files.length);
            uploadNext();
          });

          activeUploads.add(uploadPromise);
        }

        while (
          activeUploads.size < concurrencyLimit &&
          uploadQueue.length > 0
        ) {
          uploadNext();
        }
      };

      uploadNext();
    });
  }

  async processFile(file, results) {
    try {
      const { width, height } = await this.getImageSize(file);
      const hash = await this.generateImageHash(file);
      const { dateCreated, dateModified } = await this.readFileCreatedDate(file);
      console.log("File info:", file.name, width, height, hash, dateCreated, dateModified);
      const result = await this.uploadFile(file, width, height, hash, dateCreated, dateModified);
      results.push(result);

      if (!result.success) {
        this.uploadErrorBox.innerHTML = `<div class="alert alert-danger">
            Failed to upload: ${file.name} | ${result.message}
          </div>` + this.uploadErrorBox.innerHTML;
      }
    } catch (error) {
      console.error("Upload error:", error);
      results.push({
        success: false,
        message: error.message,
        filename: file.name,
      });
    }
  }

  finalizeUpload(results, onCompletedCallback) {
    if (typeof onCompletedCallback === "function") {
      try {
        onCompletedCallback(results);
      } catch (callbackError) {
        console.error("Upload completion callback error:", callbackError);
      }
    }
  }

  updateProgress(currentUpload, totalFiles) {
    const uploadPercentage = ((currentUpload / totalFiles) * 100).toFixed(1);
    this.progressBar.setAttribute("value", uploadPercentage);
    this.currentFileCounter.innerText = currentUpload;
  }

  async uploadFile(file, width, height, hash, dateCreated, dateModified) {
    const formData = new FormData();
    formData.append("file", file, file.name);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("hash", hash);
    formData.append("dateCreated", dateCreated);
    formData.append("dateModified", dateModified);
    const currentPath = window.location.pathname;

    try {
      const response = await fetch(`${currentPath}/upload`, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();

      if (!responseData.DB.success) {
        throw new Error(`Upload failed: ${responseData.DB.error}`);
      }

      return {
        success: true,
        message: "Upload successful",
        filename: file.name,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        filename: file.name,
      };
    }
  }

  async getImageSize(image) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  }

  async generateImageHash(image) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const hash = await sha256(event.target.result);
          resolve(hash);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(image);
    });
  }

  async readFileCreatedDate(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const view = new DataView(event.target.result);
        const offset = 0;
        const length = 8;
        const dateCreated = view.getUint32(offset, true);
        const dateModified = view.getUint32(offset + 4, true);
        resolve({ dateCreated, dateModified });
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  const uploader = new FileUploader({
    fileInput: document.getElementById("fileInput"),
    submitButton: document.getElementById("submit"),
    progressBar: document.getElementById("progress-bar"),
    uploadErrorBox: document.getElementById("upload-error"),
    currentFileCounter: document.getElementById("current-counter"),
    maxFileCounter: document.getElementById("max-counter"),
  });
});
