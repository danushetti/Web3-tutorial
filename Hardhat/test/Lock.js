const { equal } = require("assert");
const { expect, assert } = require("chai");
//const {ethers} = require("ethers");

describe("Lock", function () {
  let Lock;
  let lock;
  let addr1;
  let addr2;
  let addr3;
  let owner;

  beforeEach(async function () {
    Lock = await ethers.getContractFactory("Lock");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    lock = await Lock.deploy();
    //await lock.deployed();
  });

  describe("deployment", function () {
    //to check the owner
    it("should set the right owner", async function () {
      expect(await lock.owner()).to.equal(owner.address);
    });

    it("should assign the totalsupply of tokens to the owner", async function () {
      expect(await lock.balancesOf(owner.address)).to.equal(
        await lock.totalsupply()
      );
    });
  });

  describe("transactions", function () {
    it("should transfer tokens between accounts", async function () {
      //owner account to addr1.address
      await lock.transfer(5, addr1.address);
      expect(await lock.balancesOf(addr1.address)).to.equal(5);

      //add1 to addr2
      await lock.connect(addr1).transfer(5, addr2.address);
      expect(await lock.balancesOf(addr2.address)).to.equal(5);
    });

    it("should fail if sender does not have enough tokens", async function () {
      const initialownerbalance = await lock.balancesOf(owner.address);

      //for the require- statement
      await expect(
        lock.connect(addr1).transfer(10, owner.address)
      ).to.be.revertedWith("insufficient balances");
      expect(await lock.balancesOf(owner.address)).to.equal(
        initialownerbalance
      );
    });

    it("should update the state of balance of sender", async function () {
      const initialbalance = await lock.balancesOf(owner.address);
      await lock.transfer(10, addr1.address);
      await lock.transfer(15, addr2.address);

      expect(await lock.balancesOf(addr1.address)).to.equal(10);
      expect(await lock.balancesOf(addr2.address)).to.equal(15);

      expect(await lock.balancesOf(owner.address)).to.equal(initialbalance - 25);
    });
  
  });
});
