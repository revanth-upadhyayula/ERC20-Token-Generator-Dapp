window.addEventListener('load', async () => {
    // Connect to MetaMask
    let accounts = [];

    const connectButton = document.getElementById('connectButton');
    const status = document.getElementById('status');
    const transactionHash = document.getElementById('transaction-hash'); // Get the transaction hash element

    // Initialize web3
    let web3;
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            accounts = await web3.eth.getAccounts();
            console.log('Connected to MetaMask:', accounts);
            connectButton.innerText = `Connected: ${accounts[0]}`;
        } catch (error) {
            console.error('User denied account access:', error);
            status.innerText = 'Error: User denied account access';
        }
    } else {
        console.error('No web3 provider detected');
        status.innerText = 'Error: No web3 provider detected';
    }

    // Event listener for connect button
    connectButton.addEventListener('click', async () => {
        // Call connectToMetaMask function here
    });

    // Function to mint tokens
    document.getElementById('create-token-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form values
        const tokenName = document.getElementById('tokenName').value;
        const tokenSymbol = document.getElementById('tokenSymbol').value;
        const totalSupply = document.getElementById('totalSupply').value;

        // Address of the deployed MDATokenFactory contract
        const factoryAddress = '0xc7c75463F234CBE795Ba521472C92C76fC334Bec'; // Replace with the actual address

        // ABI of the MDATokenFactory contract
        const factoryABI = [{"inputs":[{"internalType":"address","name":"_mda","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"supply","type":"uint256"}],"name":"deployFree","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"supply","type":"uint256"},{"internalType":"uint256","name":"tokenType","type":"uint256"}],"name":"deployPaidBNB","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"},{"internalType":"uint256","name":"supply","type":"uint256"},{"internalType":"uint256","name":"tokenType","type":"uint256"}],"name":"deployPaidMDA","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getDeployPriceBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDeployPriceMDA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPaidTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPaidTokenDecimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateDeployPriceBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateDeployPriceMDA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"account","type":"address"}],"name":"withdrawBNB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawTokenAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

        // Instantiate the MDATokenFactory contract
        const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);

        try {
            // Send a transaction to the MDATokenFactory contract to deploy the token
            const transaction = await factoryContract.methods.deployFree(tokenName, tokenSymbol, totalSupply).send({ from: accounts[0] });

            // Set the inner text of the transaction hash element with the transaction hash
            transactionHash.innerText = `Transaction Hash: ${transaction.transactionHash}`;

            
        } catch (error) {
            console.error('Error deploying token:', error);
            status.innerText = `Error: ${error.message}`;
        }
    });
});
