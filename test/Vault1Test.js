const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Vault 1", () => {
//    beforeEach(async () => {
// 		Vault1 = await ethers.getContractFactory("Vault1");
// 		Token = await ethers.getContractFactory("SimpleToken");
// 		[owner] = await ethers.getSigners();

// 		vault1 = await Vault1.deploy();
// 		token = await Token.deploy();

// 		await vault1.deployed();
// 		await token.deployed();
// 	});



describe("V1 test", () => {
	beforeEach(async () =>  {
		[owner, addr1, addr2] = await ethers.getSigners();
  
		Token = await ethers.getContractFactory("SimpleToken");
		token = await Token.deploy('ABC', 'abc');
  
		Vault1 = await ethers.getContractFactory("Vault1");
		vault1 = await Vault1.deploy(token.address);
  
		//token.connect(owner).approve(vault1.address, 5);
		//vault1.connect(owner).deposit(5, ); 
  
	});
    
	it('deposit works as expected' , async () => { 

		token.connect(owner).approve(vault1.address, 5);
        vault1.connect(owner).deposit(5, );
        expect(await vault1.connect(owner).get_balance()).to.equal(5);
	});

	it('withdraw works as expected' , async () => {
		token.connect(owner).approve(vault1.address, 5);
        vault1.connect(owner).deposit(5, );
		vault1.connect(owner).withdraw(2, );
        expect(await vault1.connect(owner).get_balance()).to.equal(3);
	});

	it('deposit limit' , async () => {
		token.connect(owner).approve(vault1.address, 100);
		expect(vault1.connect(owner).deposit(200)).to.be.revertedWith("balance should be >= sent amount");


	});

	it('withdraw limit' , async () => {
		token.connect(owner).approve(vault1.address, 100);
		vault1.connect(owner).deposit(10);
		expect(vault1.connect(owner).withdraw(20)).to.be.revertedWith("balance should be >= sent amount");


	});

} );

