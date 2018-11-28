pragma solidity ^0.4.4;

contract Game {
    address public player1;
    address public player2;

    bool public player1Played;
    bool public player2Played;

    uint public player1Deposit;
    uint public player2Deposit;

    bool public gameFinished = false; 
    address public winner;
    uint public gains;

   event StartEvent(address player1, address player2);
   event EndRound(uint player1Deposit, uint player2Deposit);
   event EndEvent(address winner, uint gains);
   
   constructor() public {
      player1 = msg.sender;
   }
   
   function registerAsAnOpponent(address _address) public {
        // require(player2 == address(0));
        player2 = _address;
        emit StartEvent(player1, player2);
   }
   

  function play() public payable {
    	assert(!gameFinished && (msg.sender == player1 || msg.sender == player2));

    	if(msg.sender == player1) {
    		require(player1Played == false);
    		player1Played = true;
    		player1Deposit = player1Deposit + msg.value;
    	} else { 
    		require(player2Played == false);
    		player2Played = true;
    		player2Deposit = player2Deposit + msg.value;
    	}
    	if(player1Played && player2Played) {
    		if(player1Deposit >= player2Deposit * 2) {
    			endOfGame(player1);
    		} else if (player2Deposit >= player1Deposit * 2) {
    			endOfGame(player2);
    		} else {
                endOfRound();
    		}
    	}
    }

  function endOfRound() public {
    	player1Played = false;
    	player2Played = false;
    	emit EndRound(player1Deposit, player2Deposit);
  }

  function endOfGame(address _winner) public {
        gameFinished = true;
        winner = _winner;
        gains = player1Deposit + player2Deposit;
        emit EndEvent(winner, gains);
  }

  function withdraw() public {
        // require(gameFinished && winner == msg.sender);

        uint amount = gains;

        gains = 0;
        msg.sender.transfer(amount);
    }

}