//site functionality

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

//gay shite

// Anomaly event listener functs

function addAnomalyEventListener(){
    const anomaly = document.querySelector("#anomaly-gif");
    anomaly.addEventListener("click",anomalyClicked);
}

function anomalyClicked(event){

    const parentDiv = event.target.parentElement;

    if (!parentDiv.querySelector(".sidequest-container")){
        // Create a popup element
        const popup = document.createElement('div');
        popup.classList.add('sidequest-container');

        // Add content to the popup
        popup.innerHTML = `
            <div class="sidequest-popup">
                <p style="margin-bottom: 60px; margin-top: 10px;">Accept sidequest?</p>
            </div>
            <div class="sidequest-btns">
                <button onclick="anomalySidequestAccept()" style="color: green; padding: 3px; margin: 3px; margin-right: 50px;">yes</button>
                <button onclick="anomalySidequestDeny()" style="color: red; padding: 3px; margin: 3px; margin-left: 50px;">no</button>
            </div>
            `;

        // Append the popup to the parent div
        parentDiv.appendChild(popup);
    }
}

function anomalySidequestAccept() {
    // Testing
    // alert('Sidequest accepted!');

    // Remove popup
    const popup = document.querySelector(".sidequest-container");
    if (popup){
        popup.remove();
    }

    // Reroute to cube etc ...
    window.location.href = window.location.origin+"/cube.html";
}

function anomalySidequestDeny(){
    // Remove popup
    const popup = document.querySelector(".sidequest-container");
    if (popup){
        popup.remove();
    }
}

// Main

// Call the set up functs when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    goodEveningStartup();
    addAnomalyEventListener();
});