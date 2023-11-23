const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = '8cqxuTqX65At5ir5Im-pPE14V5JyY9kyMd_qpIBXhn8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoader() {
    // console.log('image loaded');
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }

}

function setAttribute (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// create Elements for Links & Photos, Add to Dom
function displayphotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run fucntion for each objeect in photoArray
    photosArray.forEach((photo) => {
    //    Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttribute(item, {
        href: photo.links.html,
        target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttribute (img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoader);

    // Put <img> inside <a>, then put both insde image Container Element
    item.appendChild(img);
    imageContainer.appendChild(item); 
    });
}
// Get photo from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayphotos();
    } catch (error) {
      // catch error
    }
}

// checking to see if scrolling near bottom of a page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// on Load
getPhotos();