pragma solidity ^0.4.18;

contract Owned {
    address owner;
    
    function Owned() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
}

contract EtherATM is Owned{
    enum State {Active, Locked, Inactive}
    State state;
    string public r_user_name;
    address public requester;
    address public giver;
    uint public amount_wei;
    
    modifier inState(State _state ) {
        require (state == _state);
        _;
    }
    
    modifier onlyRequester() {
        require (msg.sender == requester);
        _;
    }
    
    
    modifier onlyGiver() {
        require (msg.sender == giver);
        _;
    }
    /// Create a new contract.
    function EtherATM() public {
        // state = State.Active;
        state = State.Inactive;
    }
    
    function setUserName(string _name) public {
        r_user_name = _name;
    }
    // new request event for giver to receive new request
    event RequestCreated(string r_name, uint r_usd, uint r_wei);
    // accept request event for inform requester if his/her request is accepted by someone or not
    event RequestAccepted (address giver, address requester);
    
    // create new cash request
    function newRequest (string _name, uint _usd, uint _wei) public {
        RequestCreated( _name, _usd, _wei);
		// state = State.Locked;
		state = State.Active;
        r_user_name = _name;
        requester = msg.sender;
		amount_wei = _wei;
    }
    
    
    //function acceptRequest () public inState(State.Locked) {
    function acceptRequest () public inState(State.Active) {
        // state = State.Inactive;
        state = State.Locked;
        giver = msg.sender;
        RequestAccepted(msg.sender, requester);
    }
    
    //function confirmCashReceived () public inState(State.Inactive) onlyRequester {
    function confirmCashReceived () public inState(State.Locked) onlyRequester {
        //state = State.Active;
        state = State.Inactive;
    }

	//function confirmCashReceivedAndPayWinner () public inState(State.Inactive) onlyRequester {
	//	giver.transfer(amount_wei);
    //    state = State.Active;
    //}

}
