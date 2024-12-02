console.log("hello from single galery js")
import { sha256 } from "/static/js/crypto-hash/browser.js";

//console.log(await sha256('🦄'));


const fileInput = document.getElementById('fileInput');
const submitButton = document.getElementById('submit')
const progressBar = document.getElementById('progress-bar')
const uploadErrorBox = document.getElementById('upload-error')
const uploadCurrentFIle = document.getElementById('curent-counter')
const uploadMaxFIle = document.getElementById('max-counter')



let fileList = [];

fileInput.addEventListener('change', () => {
    fileList = [];
    for (let i = 0; i < fileInput.files.length; i++) {
        fileList.push(fileInput.files[i]);
    }
    console.log(fileList)
}
);



const sendFile = async (file) => {
    const { width, height } = await imageSize(file);
    const hash = await imageHash(file);
    console.log("width: " + width + " height: " + height);
    console.log(hash);
    return await makeRequest(file, width, height, hash);
}

const makeRequest = async (file, width, height, hash) => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('width', width);
    formData.append('height', height);
    formData.append('hash', hash);
    const currentPath = window.location.pathname;
    let responseData
    try {
        const response = await fetch(`${currentPath}/upload`, {
            method: 'POST',
            body: formData
        });
        responseData = await response.json();
        console.log("backend response: " +  JSON.stringify(responseData))
        if (!responseData.DB.success) {
            throw new Error(`Upload failed: ${responseData.DB.error}`);
        }

        return {
            'success': responseData.DB.success,
            'message': 'Your upload is successful'
        };
        
    } catch (error) {
        return {
            'success': responseData.DB.success || false,
            'message': responseData.DB.error
        };
    }
}

submitButton.addEventListener('click', async function (evnt) {
    evnt.preventDefault();
    progressBar.setAttribute("aria-valuemax",fileList.length)
    uploadMaxFIle.innerText = fileList.length;
    let counter = 0;
    for (const file of fileList) {
        counter++
        try {
            const {success, message } = await sendFile(file);
            progressBar.setAttribute("aria-valuenow",counter)
            progressBar.setAttribute("style",("width:" + (counter/fileList.length)*100 + "%"))
            progressBar.innerText = counter;
            uploadCurrentFIle.innerText = counter;
            if(!success) {
                uploadErrorBox.innerHTML += `<li>"Nie udało się wgrać: "  ${file.name} | ${message}</li>`;
                throw new Error(`Upload failed: ${success} ${message}`);
            }
        } catch (error) {
            console.error("Error: ", error.message);
        }
    }
});



async function imageHash(image) {
    const fileReader = new FileReader();
    const fileReaderPromise = new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = reject;
    });
    fileReader.readAsArrayBuffer(image);
    const bufferArray = await fileReaderPromise;
    const hashed = await sha256(bufferArray)
    return hashed;
}


async function imageSize(image) {
    const fileReader = new FileReader();
    const fileReaderPromise = new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = reject;
    });
    fileReader.readAsDataURL(image);
    const fileResult = await fileReaderPromise;
    const img = new Image();
    const imgPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
    });
    img.src = fileResult;
    return await imgPromise;
}





