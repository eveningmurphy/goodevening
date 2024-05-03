function adminLogin(username, password){
    const json_url = '../../admin.json';

    // Send request to retrieve JSON data
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                
                // Compare username and password with stored credentials
                if (compare(json.username, username, json.shift) && compare(json.password, password, json.shift)){
                    return true;
                }
            } else {
                console.error('Error fetching JSON:', xhr.statusText);
            }
        }
    };
    xhr.open('GET', json_url, true);
    xhr.send();
    
    return false;
}

function convertToHTML(formData) {
    const blogType = formData.get('blogType');
    const title = formData.get('title');
    const content = formData.get('content');
    const imageUrl = formData.get('image');

    let htmlStructure = '';

    if (blogType === 'pigeon') {
        htmlStructure += `<div class="roscoe-blog-post">`;
        htmlStructure += ` <h2>${title}</h2> `;
    } else {
        htmlStructure += `<div class="blog-post">`;
        htmlStructure += ` <h2>~ ${title} ~</h2> `;
    }

    if (imageUrl) {
        htmlStructure += ` <img src="${imageUrl.substring(3)}" style="width: 70%; height: 400px;">`;
    }

    htmlStructure += `<p>${content}</p>
        <span class="post-date">${getCurrentTime()}</span>
    </div>`;

    return htmlStructure;
}

function getCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${timeString} ${dateString}`;
}

function uploadBlogPost() {
    const form = document.getElementById('blogForm');
    const formData = new FormData(form);
    const htmlCode = convertToHTML(formData);

    var blogDivId = '';
    const blogType = formData.get('blogType');
    if (blogType === 'pigeon'){
        blogDivId = 'roscoe-blog';
    } else {
        blogDivId = 'personal-blog';
    }
    
    // Load the blog.html file
    fetch('../blog.html')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Get the blog div where the new post will be appended
            const blogDiv = doc.getElementById(blogDivId);
            
            // Create a temporary container to hold the new post
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = htmlCode;
            
            // Append the new post to the blog div
            while (tempContainer.firstChild) {
                blogDiv.appendChild(tempContainer.firstChild);
            }
            
            // Send the entire HTML content to the PHP script
            $.ajax({
                url: 'blog_upload.php',
                type: 'POST',
                data: {
                    htmlContent: doc.documentElement.outerHTML
                },
                success: function(response) {
                    console.log(response);
                    alert('Blog HTML updated successfully.');
                },
                error: function(xhr, status, error) {
                    console.error('Error updating blog HTML:', error);
                    alert('Error updating blog HTML. Please try again.');
                }
            });
        })
        .catch(error => {
            console.error('Error loading blog.html:', error);
        });
}

// Function to fetch image URLs from PHP script
function fetchImageUrls() {
    fetch('fetch_imgs.php')
        .then(response => response.json())
        .then(data => {
            // Process the list of image URLs
            populateDropdownMenu(data);
        })
        .catch(error => {
            console.error('Error fetching image URLs:', error);
        });
}

// Populate dropdown menu with each image URL (thumbnail and name)
function populateDropdownMenu(urls) {
    const dropdown = document.getElementById('imageDropdown');
    
    // Clear previous options
    dropdown.innerHTML = '';

    let option = document.createElement('option');
    option.value = "";
    option.innerHTML="none";
    // Append option to dropdown
    dropdown.appendChild(option);

    // Create and append options for each image URL
    urls.forEach(url => {
        const option = document.createElement('option');
        option.value = url;
        
        // Append URL to option
        option.appendChild(document.createTextNode(url));

        // Append option to dropdown
        dropdown.appendChild(option);
    });

    // Event listener to display selected image
    dropdown.addEventListener('change', function() {
        const selectedImageUrl = this.value;
        // Create and display 100x100 thumbnail preview
        
        // Remove any existing thumbnail preview
        const existingThumbnail = document.getElementById('thumbnailPreview');
        if (existingThumbnail) {
            existingThumbnail.parentNode.removeChild(existingThumbnail);
        }

        // Create and display 100x100 thumbnail preview
        const thumbnailPreview = document.createElement('img');
        thumbnailPreview.id = 'thumbnailPreview';
        thumbnailPreview.src = selectedImageUrl;
        thumbnailPreview.setAttribute("style","margin-top: 5px;padding: 5px;");
        thumbnailPreview.style.width = '100px';
        thumbnailPreview.style.height = '100px';

        // Insert thumbnail preview after the dropdown
        this.insertAdjacentElement('afterend', thumbnailPreview);
    });
}