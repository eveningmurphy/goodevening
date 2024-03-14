function setNavbarUrls(){
    // Get the current domain URL
    const baseUrl = window.location.origin;

    // Update the href attributes of the scrapyard and links links
    document.getElementById('scrapyard-link').href = `${baseUrl}/templates/scrapyard.html`;
    document.getElementById('links-link').href = `${baseUrl}/templates/links.html`;
    // Blogs link
}

// Startup function
function goodEveningStartup(){
    setNavbarUrls();
}

// Call the function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    goodEveningStartup();
});