var JobPayContract = artifacts.require("JobPayContract");

// const Web3 = require('web3')

// const web3 = new Web3(
//     new Web3.providers.HttpProvider(
//       'http://localhost:8545'
//     )
//   )

contract('JobPayContract', function(accounts) {

    let JobPayContractInstance = null;
    let Deployer = accounts[0];
    let Employer = accounts[1];
    let Worker = accounts[2];
    let Charge = 5000000;

    beforeEach('setup contract for each test', async() => {
        JobPayContractInstance = await JobPayContract.new(accounts[1],accounts[2]);
    })
    
    it('should have employer and worker assigned', async() => {
        let employer = await JobPayContractInstance.employer();
        let worker = await JobPayContractInstance.worker();
        assert.equal(employer, Employer);
        assert.equal(worker, Worker);
    })

    // Failure case
    // it('should have employer and worker assigned Fail case', async() => {
    //     let employer = await JobPayContractInstance.employer();
    //     let worker = await JobPayContractInstance.worker();
    //     assert.notEqual(employer, Employer);
    //     assert.notEqual(worker, Worker);
    // })


    it('only Employer can increase pay amount', done => {
        (async () => {      
            JobPayContractInstance.sendTransaction({
            from: Employer, value: Charge
          }).then(() => done()).catch(() => done('Error Only Employer can pay the contract'))
        })()
    })

    // Failure Case
    it('Deployer trying', done => {
        (async () => {      
            JobPayContractInstance.sendTransaction({
            from: Deployer, value: Charge
          }).then(() => done()).catch(() => done('Error Only Employer can pay the contract'))
        })()
    })

     // Failure Case
     it('Worker trying', done => {
        (async () => {      
            JobPayContractInstance.sendTransaction({
            from: Worker, value: Charge
          }).then(() => done()).catch(() => done('Error Only Employer can pay the contract'))
        })()
    })

    it('Employer Charge check', async() => {
        await JobPayContractInstance.sendTransaction({
            from: Employer, value: Charge
        });
        let charge = await JobPayContractInstance.charge();
        assert.equal(Charge,charge.toNumber());
    })

    // Failure Case
    it('Deployer trying', async() => {
        await JobPayContractInstance.sendTransaction({
            from: Deployer, value: Charge
        });
        let charge = await JobPayContractInstance.charge();
        assert.equal(Charge,charge.toNumber());
    })

 // Failure Case
    it('Worker trying', async() => {
        await JobPayContractInstance.sendTransaction({
            from: Worker, value: Charge
        });
        let charge = await JobPayContractInstance.charge();
        assert.equal(Charge,charge.toNumber());
    })

    it('only Deployer can make payment', async () => {
        expect(await JobPayContractInstance.deployer()).to.equal(Deployer);
        let charge = await JobPayContractInstance.charge();
        assert.equal(0,charge.toNumber());
      })

      //Failure Case
      it('Employer tries', async () => {
        expect(await JobPayContractInstance.deployer()).to.equal(Employer);
        let charge = await JobPayContractInstance.charge();
        assert.equal(0,charge.toNumber());
      })

       //Failure Case
       it('Worker tries', async () => {
        expect(await JobPayContractInstance.deployer()).to.equal(Worker);
        let charge = await JobPayContractInstance.charge();
        assert.equal(0,charge.toNumber());
      })

   

    })