const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
// unsplash API
const count = 10;
const apiKey = '8cqxuTqX65At5ir5Im-pPE14V5JyY9kyMd_qpIBXhn8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photo from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
    } catch (error) {
      // catch error
    }
}

// on Load
getPhotos();