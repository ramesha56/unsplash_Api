

const apiKey = "LJXe8Gbi1OyBOn4q8d-0mhhnTX5qRm0lNNhid8W_nSw";
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const imageContainer = document.getElementById("imageContainer");
const loadingMessage = document.getElementById("loading");

async function fetchImages(query) {
    const encodedQuery = encodeURIComponent(query); 
    const url = `https://api.unsplash.com/search/photos?query=${encodedQuery}&per_page=12&client_id=${apiKey}`;

    try {
        loadingMessage.style.display = "block"; //
        const response = await fetch(url); 
        const data = await response.json(); 
        loadingMessage.style.display = "none"; 

  
        if (data.results && data.results.length > 0) {
            displayImages(data.results);
        } else {
            imageContainer.innerHTML = "<p>No images found for this search term. Try a different query.</p>";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        imageContainer.innerHTML = "<p>Error fetching images. Please try again later.</p>";
    }
}

function displayImages(images) {
    imageContainer.innerHTML = ""; 

    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || "Image";
        imageContainer.appendChild(imgElement); 
    });
}


searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim(); 
    if (query) {
        fetchImages(query); 
    } else {
        imageContainer.innerHTML = "<p>Please enter a search term.</p>"; 
    }
});
