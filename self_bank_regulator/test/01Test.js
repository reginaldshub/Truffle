var MyFirstContract = artifacts.require("MyFirstContract");
var Bank = artifacts.require("Bank");

contract('MyFirstContract', function(accounts) {

    let MyFirstContractInstance = null;
   
    // let Unknown = accounts[2];

    beforeEach('setup contract for each test', async() => {
        MyFirstContractInstance = await MyFirstContract.new();
        BankContractInstance = await Bank.new(100);
    })
    
    it('Should set and get the same name', async() => {
        await MyFirstContractInstance.setName("Regi");
        let name = await MyFirstContractInstance.getName();
        assert.equal(name.toString(), "Regi");
    })

    it('Should set and get the same age', async() => {
        await MyFirstContractInstance.setAge(100);
        let age = await MyFirstContractInstance.getAge();
        assert.equal(age.toNumber(), 100);
    })

//Bank Contract
    it('Initial Balance', async() => {
        // BankContractInstance = await Bank.new(100);
        // await MyFirstContractInstance.deposit(100);
        let bal = await MyFirstContractInstance.balance();
        // console.log(bal.toNumber());
        // assert.equal(bal.toNumber(), 100);
    })

    it('Should Deposit specified Amount', async() => {
        await MyFirstContractInstance.deposit(100);
        let bal = await MyFirstContractInstance.balance();
        assert.equal(bal.toNumber(), 110);
    })

    it('Should retain Balance before deposit and after Withdraw', async() => {        
        await MyFirstContractInstance.deposit(100);
        let initialbal = await MyFirstContractInstance.balance();
        let withdrawAmount = 20;
        await MyFirstContractInstance.withdraw(withdrawAmount);
        let bal = await MyFirstContractInstance.balance();
        initialbal -= withdrawAmount;
        assert.equal(bal.toNumber(), initialbal);
    })

    it('Should provide loan if sufficiant funds available', async() => {
        await MyFirstContractInstance.deposit(100);
        let loan = await MyFirstContractInstance.loan();
        assert.equal(loan, true);
        let bal = await MyFirstContractInstance.balance();
        await MyFirstContractInstance.withdraw(bal);
        //after withdrawing all the funds loan will return false
        loan = await MyFirstContractInstance.loan();
        assert.equal(loan, false);
    })

    it('Should checkValue with available amount and return boolean', async() => {
        let avail = await MyFirstContractInstance.checkValue(100);
        console.log(avail);
        // assert.equal(true, avail);
        let amount = 100;
        await MyFirstContractInstance.deposit(amount);
        let bal = await MyFirstContractInstance.balance();
        console.log(bal.toNumber());
        let availAfterDeposit = await MyFirstContractInstance.checkValue(amount);
        console.log(availAfterDeposit);
        // assert.equal(true, availAfterDeposit);
    })

})