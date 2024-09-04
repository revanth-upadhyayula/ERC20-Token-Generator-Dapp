// Get the video element
const video = document.getElementById('background-video');
const loopStartTime = 8; // Start time in seconds
const loopEndTime = 16; // End time in seconds

video.addEventListener('timeupdate', function() {
    if (video.currentTime >= loopEndTime) {
        video.currentTime = loopStartTime;
    }
});

// When the video ends, reset it to 8 seconds
video.addEventListener('ended', function() {
    video.currentTime = 8;
    video.play();
});
function redirectToCreate() {
    window.location.href = "create.html"; 
}

function redirectToTransfer() {
    window.location.href = "https://venerable-lebkuchen-0e1a27.netlify.app/"; 
}

document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners to the buttons
    document.getElementById("createButton").addEventListener("click", redirectToCreate);
    document.getElementById("transferButton").addEventListener("click", redirectToTransfer);
});

