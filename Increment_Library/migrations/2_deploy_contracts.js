const TestLibrary = artifacts.require('./TestLibrary.sol');
const IntExtended = artifacts.require('./IntExtended.sol');

module.exports = function (deployer) {
    deployer.deploy(IntExtended).then(() => {
        deployer.link(IntExtended, TestLibrary).then(() => {
     deployer.deploy(TestLibrary)
     })
    });
};