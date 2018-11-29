var TestLibrary = artifacts.require("TestLibrary");

contract('TestLibrary', function(accounts) {

    let TestLibraryContractInstance = null;
    let number = 10;

    beforeEach('setup contract for each test', async() => {
        TestLibraryContractInstance = await TestLibrary.new();
    })
    
    it('Should increment with 1', async() => {
        let val = await TestLibraryContractInstance.testIncrement(number);
        assert.equal(val.toNumber(), 11);
    })

    it('Should decrement by 1', async() => {
        let val = await TestLibraryContractInstance.testDecrement(number);
        assert.equal(val.toNumber(), 9);
    })

    it('Should increment number with value', async() => {
        let value = 1;
        let val = await TestLibraryContractInstance.testIncrementByValue(number,value);
        assert.equal(val.toNumber(), (number+value));
    })

    it('Should decrement number with value', async() => {
        let value = 1;
        let val = await TestLibraryContractInstance.testDecrementByValue(number,value);
        assert.equal(val.toNumber(), (number-value));
    })
})