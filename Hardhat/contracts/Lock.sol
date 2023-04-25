// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    string public name = "lockToken";
    string public symbol = "LT";
    address public owner;

    uint256 public totalsupply = 1000;

    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalsupply;
    }

    function transfer(uint amount, address to) external {
        require(balances[msg.sender] >= amount, "insufficient balances");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balancesOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
