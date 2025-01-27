gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
        opacity: 0,
        display: "none",
        duration: 1.5,
        delay: 3.5,
    }
);
gsap.fromTo(
    ".logo-name",
    {
        y: 50,
        opacity: 0,
    },
    {
        y: 0,
        opacity: 1,
        duration: 2,
        delay: 0.5,
    }
);
gsap.fromTo(
    ".header",
    { opacity: 0 },
    {
        opacity: 1,
        duration: 1.5,
        delay: 3.5,
    }
);
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
    // Set the currentTime to 8 seconds
    video.currentTime = 8;
    // Play the video
    video.play();
});
window.addEventListener('load', async () => {
    // Initialize web3
    let web3;

    // Event listener for connect button
    const connectButton = document.getElementById('connectButton');
    connectButton.addEventListener('click', async () => {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Initialize web3 with MetaMask provider
                web3 = new Web3(window.ethereum);

                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Get connected accounts
                const accounts = await web3.eth.getAccounts();
                console.log('Connected to MetaMask:', accounts);
                
                // Update connect button text
                connectButton.innerText = `Connected: ${accounts[0]}`;

                // Perform further actions with the connected account here

            } else {
                console.error('MetaMask not detected');
                // Handle case where MetaMask is not installed
            }
        } catch (error) {
            console.error('MetaMask connection error:', error);
            // Handle errors, such as user rejection
        }
    });
});
document.getElementById('validateButton').addEventListener('click', () => {
    const PANInput = document.getElementById('PAN');
    const PAN = PANInput.value.trim();

    if (PAN.length === 10 && PAN[3].toUpperCase() === 'C') {
        // Redirect to main2.html
        window.location.href = 'main2.html';
    } else {
        // Show error message
        const gstinError = document.getElementById('PAN-error');
        gstinError.innerText = 'PAN number not belongs to company or organisation';
    }
});