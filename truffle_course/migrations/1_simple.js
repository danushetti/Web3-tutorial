var simpleStorage = artifacts.require("./simple.sol");

module.exports = function(deployer){
    deployer.deploy(simpleStorage);
};