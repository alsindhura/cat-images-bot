let currentId = 0;
let currentUrl = '';
let prevId = 0;

// Fetch data based on an id (or no id for the initial fetch)
function fetchData(id) {
    const url = id ? `https://api.thecatapi.com/v1/images/${id}` : 'https://api.thecatapi.com/v1/images/search';
    console.log("Fetching image for ID:", id);  // Log the ID being fetched
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("API response:", data);

            // Set the current image ID and URL
            if (Array.isArray(data)) {
                // If the response is an array, use data[0]
                currentId = data[0]?.id;
                currentUrl = data[0]?.url;
            } else if (data && typeof data === 'object') {
                // If the response is a single object
                currentId = data?.id;
                currentUrl = data?.url;
            } else {
                console.log("Unexpected data format:", data);
            }

            console.log("Fetched image with ID:", currentId);
            console.log("Fetched URL:", currentUrl);

            // If valid data exists, display the image
            if (currentId && currentUrl) {
                const img = document.createElement('img');
                img.src = currentUrl;
                img.style.width = '100%';
                img.style.height = '100%';
                const displayPic = document.getElementById('display-pic');
                displayPic.innerHTML = '';  // Clear previous image
                displayPic.appendChild(img);  // Append the new image
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Page load fetch
function onLoad() {
    console.log("The window has loaded");
    fetchData();  // Initial fetch when the page is loaded (no ID provided)
}

onLoad();  // Initial call to fetch data on page load

// Next button functionality
function nextBtn() {
    let nextButton = document.getElementById('next');
    nextButton.addEventListener('click', function () {
        // Store the current image ID in prevId before fetching the next image
        prevId = currentId;  // Store the previous image ID
        console.log("Previous ID:", prevId);
        
        // Fetch a new random image
        fetchData();  // This will automatically assign a new currentId
    });
}

nextBtn();  // Initialize the next button functionality

// Previous button functionality
function prevButton() {
    let prevBtn = document.getElementById('previous');
    prevBtn.addEventListener('click', function () {
        if (prevId !== 0) {
            console.log("Going back to prevId:", prevId);
            // Fetch the previous image using the stored prevId
            fetchData(prevId);
        } else {
            console.log("No previous ID available.");
        }
    });
}

prevButton();  // Initialize the previous button functionality
