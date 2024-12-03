import { sha256 } from "/static/js/crypto-hash/browser.js";

const fileInput = document.getElementById('fileInput');
const submitButton = document.getElementById('submit');
const progressBar = document.getElementById('progress-bar');
const uploadErrorBox = document.getElementById('upload-error');
const uploadCurrentFile = document.getElementById('curent-counter');
const uploadMaxFile = document.getElementById('max-counter');

// Configurable concurrency limit
const CONCURRENT_UPLOAD_LIMIT = 3;

let fileList = [];

fileInput.addEventListener('change', () => {
    fileList = Array.from(fileInput.files);
    console.log(fileList);
});

const sendFile = async (file) => {
    const { width, height } = await imageSize(file);
    const hash = await imageHash(file);
    console.log(`width: ${width} height: ${height}`);
    console.log(hash);
    return await makeRequest(file, width, height, hash);
};

const makeRequest = async (file, width, height, hash) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('width', width);
    formData.append('height', height);
    formData.append('hash', hash);
    const currentPath = window.location.pathname;
    
    try {
        const response = await fetch(`${currentPath}/upload`, {
            method: 'POST',
            body: formData
        });
        const responseData = await response.json();
        console.log("Backend response: " + JSON.stringify(responseData));
        
        if (!responseData.DB.success) {
            throw new Error(`Upload failed: ${responseData.DB.error}`);
        }

        return {
            'success': true,
            'message': 'Your upload is successful'
        };
    } catch (error) {
        return {
            'success': false,
            'message': error.message
        };
    }
};

// Async upload with concurrency control
const uploadFilesWithConcurrency = async (files, concurrencyLimit) => {
    const results = [];
    const uploadQueue = [...files];
    const activeUploads = new Set();

    const updateProgress = (currentUpload, totalFiles) => {
        progressBar.setAttribute("aria-valuenow", currentUpload);
        progressBar.setAttribute("style", `width:${(currentUpload / totalFiles) * 100}%`);
        progressBar.innerText = currentUpload;
        uploadCurrentFile.innerText = currentUpload;
    };

    return new Promise((resolve, reject) => {
        const uploadNext = async () => {
            // If no more files to upload, resolve when all active uploads complete
            if (uploadQueue.length === 0 && activeUploads.size === 0) {
                resolve(results);
                return;
            }

            // If we've hit concurrency limit, wait
            if (activeUploads.size >= concurrencyLimit) {
                return;
            }

            // If files remain in queue
            if (uploadQueue.length > 0) {
                const file = uploadQueue.shift();
                const uploadPromise = sendFile(file)
                    .then(result => {
                        results.push(result);
                        updateProgress(results.length, files.length);

                        if (!result.success) {
                            uploadErrorBox.innerHTML += `<li>Failed to upload: ${file.name} | ${result.message}</li>`;
                        }
                    })
                    .catch(error => {
                        console.error("Upload error:", error);
                        uploadErrorBox.innerHTML += `<li>Failed to upload: ${file.name} | ${error.message}</li>`;
                    })
                    .finally(() => {
                        activeUploads.delete(uploadPromise);
                        uploadNext(); // Trigger next upload
                    });

                activeUploads.add(uploadPromise);
            }

            // Start more uploads if possible
            while (activeUploads.size < concurrencyLimit && uploadQueue.length > 0) {
                uploadNext();
            }
        };

        // Initial trigger
        uploadNext();
    });
};

submitButton.addEventListener('click', async function (event) {
    event.preventDefault();
    
    // Reset progress and error states
    progressBar.setAttribute("aria-valuemax", fileList.length);
    uploadMaxFile.innerText = fileList.length;
    uploadErrorBox.innerHTML = ''; // Clear previous errors
    
    try {
        await uploadFilesWithConcurrency(fileList, CONCURRENT_UPLOAD_LIMIT);
    } catch (error) {
        console.error("Batch upload failed:", error);
    }
});

async function imageHash(image) {
    const fileReader = new FileReader();
    const bufferArray = await new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = reject;
        fileReader.readAsArrayBuffer(image);
    });
    return await sha256(bufferArray);
}

async function imageSize(image) {
    const fileResult = await new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = reject;
        fileReader.readAsDataURL(image);
    });

    return await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = fileResult;
    });
}