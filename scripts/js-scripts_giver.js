

/**
Part 3:
All functions and variables used only for giver are defined in this part
**/

/* Cash giver is always wait for new request from requester */
var requestCreatedEvent = EtherATMInstance.RequestCreated();
requestCreatedEvent.watch(function(error, result){
    if (!error) {
    	var eth = web3.fromWei(result.args.r_wei, 'ether');
    	$("#new_req_info").html(result.args.r_name + ' requests $' + result.args.r_usd + ' for ' + eth + ' ETH!');
    } else {
    	console.log(error);
    }
});

function acceptRequest() {	
	EtherATMInstance.acceptRequest(function(error, result){
		if(!error) {
			$("#win_msg").html('You are the winner! Please go and hand in the cash');
		} else {
			console.log(error);
		}
	});
}

// function startWatchEvent() {

// }

// function stopWatchEvent() {
	
// }



