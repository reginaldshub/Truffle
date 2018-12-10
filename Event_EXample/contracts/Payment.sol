pragma solidity ^0.4.17;

contract Payment {
  address transferFrom;
  address transferTo;
  uint paymentAmount;
 
  constructor() public {
    transferFrom = msg.sender;
  }
 
  event TransferFundEvent(address _transferTo, address _transferFrom, uint amount);
 
  function transferFund(address _transferTo) public payable returns (bool){
      transferTo = _transferTo;
      transferTo.transfer(msg.value);
  
      emit TransferFundEvent(transferTo, transferFrom, msg.value);
 
      return true;
  }
 
  function getBalanceOfCurrentAccount() public payable returns (uint) {
    return transferFrom.balance;
  }
 
}