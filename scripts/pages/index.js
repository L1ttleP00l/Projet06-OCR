// Function to asynchronously fetch photographers data from a JSON file
async function getPhotographers() {
    try {
        const response = await fetch("data/photographers.json");
        if (!response.ok) {
            throw new Error("Unable to fetch photographers data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle and log any errors that occur during data fetching
        console.error(error);
        throw error;
    }
}

// Function to display a photographer's information
function displayPhotographer(photographer) {
    // Get the DOM element for the photographers section
    const photographersSection = document.querySelector(".photographer_section");

    // Create a photographer model and get the corresponding DOM element
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    // Append the photographer's card to the photographers section
    photographersSection.appendChild(userCardDOM);
}

// Initialization function
async function init() {
    try {
        // Fetch photographers data and destructure the photographers array
        const { photographers } = await getPhotographers();

        // Iterate through the photographers and display each one
        photographers.forEach(displayPhotographer);
    } catch (error) {
        // Handle and log any errors that occur during initialization
        console.error(error);
    }
}

// Call the initialization function to start the process
init();
