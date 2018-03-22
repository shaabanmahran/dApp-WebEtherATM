/**
Part 2:
All functions and variables used only for requester.html
**/

function createRequest() {
	var userName = document.getElementById('user').value;
	var usd_in = document.getElementById('usd').value;
	var eth_in = document.getElementById('eth').value;
	var wei_in = web3.toWei(eth_in, 'ether');

	EtherATMInstance.newRequest(userName, usd_in, wei_in, function(error, result){
		if(!error) {
			console.log(error);
			$("#reqs").html('Your request is successfully sent out!');
		} else {
			console.log(result);
		}
	});
	document.getElementById("user").value = "";
    document.getElementById("usd").value = "";
    document.getElementById("eth").value = "";
	document.getElementById("eth_amount").value = eth_in;
}

/* Requester is always waiting for notification of who accepts the cash request */
var requestAcceptedEvent = EtherATMInstance.RequestAccepted();
requestAcceptedEvent.watch(function(error, result){
    if (!error) {
    	if (result.args.requester == web3.eth.defaultAccount) {
    		$("#accepter_info").html('Your request has been accepted by ' + result.args.giver);
			document.getElementById("pay_to").value = result.args.giver;
    	}
    } else {
    	console.log(error);
    }
});


/*Using API to obtain real-time exchange rate*/
function getExchangeRate() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH", false);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send();
	var response = xhttp.responseText;
	var rate = response.slice(7, -1);
	return rate;
}

/* Converter: from usd to ether with exchange rate */
function usdToEtherConverter() {
	var ether_value;
	var rate = getExchangeRate();
	ether_value = document.getElementById('usd').value * rate;
	document.getElementById('eth').value = ether_value.toFixed(8);
}

/**TO DO**/
/* Make verification: wheather the ether balance is enough to pay for the amount of dollars entered by user or not*/
function verifyEtherAmount() {

}

/* Requester confirms and pay ether to giver */
function sendPayment() {
	EtherATMInstance.confirmCashReceived(function(error, result){
		if(!error) {
			console.log(error);
			/* $("#reqs").html('Your request is successfully sent out!'); */
		} else {
			console.log(result);
		}
	});
	//var accounts = web3.eth.accounts;
	var account_from = web3.eth.defaultAccount;
	var to_address = document.getElementById('pay_to').value;
	var val_eth = document.getElementById('eth_amount').value;
	var val_wei = web3.toWei(val_eth, 'ether');

	web3.eth.sendTransaction({
//		from: accounts[0],
		from: account_from,
		to: to_address,
		value: val_wei
	}, function (error, result) {
		if (!error) {
			document.getElementById('response').innerHTML = 'Successful Transaction: <a href="https://rinkeby.etherscan.io/tx/' + result + '" target="_blank"> View Transaction </a>';
		} else {
			document.getElementById('response').innerHTML = '<pre>' + error + '</pre>';
		}
	});
}
function enable_disable1(){
    document.getElementById('eth').disabled = false;
}
function enable_disable2(){
	document.getElementById('eth').value="";
    document.getElementById('eth').disabled = true;
}
