pragma solidity ^0.7.0;

contract Thing {
    uint public num = 100;

    function action(uint _num) public {
        num = _num;
    }
}
