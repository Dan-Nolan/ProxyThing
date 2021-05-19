pragma solidity ^0.7.0;

contract Thing2 {
    uint public num = 100;

    function action(uint _x, uint _y) public {
        num = _x + _y;
    }

    function action2(uint _z) public {
        num = _z * 300;
    }
}
