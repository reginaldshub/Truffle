pragma solidity ^0.4.23;
    
contract ComplexConfig {
   
   struct Account {
        string name;
        string balance;
        string dailyLimit;
        address public_address;
    }
    
    // uint private httpPort = 80;
    // string private dbname;
    // string private dbString = "database";
    
    Account private myAccount;
    mapping(address => Account) accountDetails; //address to person 

    function stringCompare(string a, string b) public pure returns (bool){
       return keccak256(a) == keccak256(b);
   }

     function getIT() public view returns (address) {
        return msg.sender;
    }
   
    // function setValue(string _value, string _name) public{
    //   if (stringCompare(_name,dbString))
    //       dbname = _value;
    // }
   
//   function getValue(string  _name) public view returns (string) {
//       if (stringCompare(_name,dbString))
//           return dbname;
//     }
    
    // function getPort() public view returns (uint) {
    //     return httpPort;
    // }
    
    // function setAccount(string _name,uint _balance, uint _limit) public{
    //     myAccount.name = _name;
    //     myAccount.balance = _balance;
    //     myAccount.dailyLimit = _limit;
    // }
    
    // function getAccount() view public returns(string,uint,uint) {
    //     return(myAccount.name,myAccount.balance,myAccount.dailyLimit);
    // }
    
    function registerAccountDetails(string _name,string _balance,string _limit) public{
            accountDetails[msg.sender].name = _name;
            accountDetails[msg.sender].balance = _balance;
            accountDetails[msg.sender].dailyLimit = _limit;
            accountDetails[msg.sender].public_address = msg.sender;
    }
    
    function getAccountDetails() public view returns(string,string,string,address){
        
        return(accountDetails[msg.sender].name,accountDetails[msg.sender].balance,accountDetails[msg.sender].dailyLimit,accountDetails[msg.sender].public_address);
    }
}