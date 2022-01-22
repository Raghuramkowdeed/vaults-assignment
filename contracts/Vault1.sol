pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract SimpleToken is ERC20 {
    address owner;

    constructor(
        string memory name,
        string memory symbol
    ) public ERC20(name, symbol) {
        owner = msg.sender;
        _mint(msg.sender, 100);
    }
}


contract Vault1 {

   ERC20 public token ;
   mapping(address => uint256) public balance;
   address public owner ;

    constructor(address _token_adr){
        owner = msg.sender;
        token = ERC20( _token_adr);
    }

 
    function deposit(uint _amount) external payable {
        require(_amount>0 , "amount > 0");
         require(token.balanceOf(msg.sender) >= _amount, "balance should be >= sent amount" );
         // approve button then call below func
         require( token.transferFrom(msg.sender, address(this), _amount),
         "tranfer failed");
         balance[msg.sender] += _amount ;
    }

    function withdraw(uint _amount) external payable {
        require(_amount>0 , "amount > 0");
        require(balance[msg.sender] >= _amount, "balance should be >= sent amount" );
        
        //token.approve(msg.sender, _amount);
        token.transfer( msg.sender, _amount);
        balance[msg.sender] -= _amount ;

        

    }

    function get_balance() public view returns(uint) {
        return balance[msg.sender];
    }
    
}
