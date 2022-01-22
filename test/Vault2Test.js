const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault 2", () => {
	beforeEach(async () => {
		Vault2 = await ethers.getContractFactory("Vault2");
		[owner, adr1] = await ethers.getSigners();

		vault2 = await Vault2.deploy();

		await vault2.deployed();
	});


	it('mint coins', async () => {
		await vault2.connect(owner).mint({value: 1});
		expect(await vault2.balanceOf(owner.address)).to.equal(1);
	});

	it('burn coins', async () => {
		await vault2.connect(owner).mint({value: 3});
		await vault2.connect(owner).burn(2);
		expect(await vault2.balanceOf(owner.address)).to.equal(1);
	});

});
