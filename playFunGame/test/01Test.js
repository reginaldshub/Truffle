var Game = artifacts.require("Game");

contract('Game', function(accounts) {

    let GameContractInstance = null;
    let Player1 = accounts[0];
    let Player2 = accounts[1];

    beforeEach('setup contract for each test', async() => {
        GameContractInstance = await Game.new();
    })
    
    it('player1 assigned to deployer', async() => {
        let player1 = await GameContractInstance.player1();
        assert.equal(player1, Player1);
    })

    it('player2 assigned to account[1]', async() => {
        await GameContractInstance.registerAsAnOpponent(accounts[1]);
        let player2 = await GameContractInstance.player2();
        assert.equal(player2, Player2);
    })

    it('only player1 can increase pay amount of player1',  async() => {
        await GameContractInstance.play({
            from: Player1, value: 10000
        });
        let Player1Deposit = await GameContractInstance.player1Deposit();
        assert.equal(Player1Deposit.toNumber(),10000);
        let Player1Played = await GameContractInstance.player1Played();
        assert.equal(true, Player1Played);
    })

    it('only player2 can increase pay amount of player2',  async() => {
        await GameContractInstance.play({from: Player2, value: 100});
        let Player2Deposit = await GameContractInstance.player2Deposit();
        assert.equal(Player2Deposit.toNumber(),10000);
        let Player2Played = await GameContractInstance.player2Played();
        assert.equal(true, Player2Played);
    })
})