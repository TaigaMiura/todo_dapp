import Web3 from 'web3';

let currentWeb3;
// MetaMask ver0.5以上
if (window.ethereum) {
  let instance = new Web3(window.ethereum);
  try {
    window.ethereum.enable();
    currentWeb3 = instance;
  } catch (error) {
    alert('Please allow access for the app to work');
  }
// MetaMask ver0.5以前
} else if (window.web3) {
  currentWeb3 = new Web3(window.web3.currentProvider);
} else {
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default currentWeb3;