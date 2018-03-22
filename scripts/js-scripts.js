/**
Part 1:
Functions and global variables used by both requester.html and giver.html
**/

/*Set up web3 provider*/
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
	// console.log("Metamask detected");
} else {
	// console.log("Metamask not detected");
	web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
}

/*To test if web3 is connected*/
// if (web3.isConnected()) {
// 	console.log("OK Good");
// } else {
// 	console.log("nothing");
// }

// var accounts = web3.eth.accounts;
web3.eth.defaultAccount = web3.eth.accounts[0];


/* Refresh or update the account info */
function displayAccountInfo() {
	setInterval(function() {
		displayAccount();
		displayBalance();}, 500);
}

/* Display the default account address, which is the first account from the account list */
function displayAccount() {
	document.getElementById('account').textContent = web3.eth.defaultAccount;
}

/* Display the balance in the default account */
function displayBalance() {
	var balance;
	web3.eth.getBalance(web3.eth.defaultAccount, web3.eth.defaultBlock, function (error, result) {
		balance = web3.fromWei(result, 'ether').toFixed(6);
		document.getElementById('balance').textContent =  'ETH ' + balance;
	});
	return balance;
}


var contractABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "r_user_name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "amount_wei",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "giver",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "requester",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "confirmCashReceived",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "giver",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "requester",
				"type": "address"
			}
		],
		"name": "RequestAccepted",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "setUserName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "r_name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "r_usd",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "r_wei",
				"type": "uint256"
			}
		],
		"name": "RequestCreated",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "acceptRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_usd",
				"type": "uint256"
			},
			{
				"name": "_wei",
				"type": "uint256"
			}
		],
		"name": "newRequest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];



var EtherATMContract = web3.eth.contract(contractABI);
var contractAddress = '0x59b6f3c8be83b04a6c6c3d690663e40839a7c73d';
// var contractAddress = '0x1e747df75ee456625e9d5670abe0f1cad91cbec1';
var EtherATMInstance = EtherATMContract.at(contractAddress);

