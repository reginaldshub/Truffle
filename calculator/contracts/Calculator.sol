pragma solidity 0.4.24;

contract Calculator{

    uint result=0;

    constructor() public
    {

    }

    function getResult() public view returns (uint)
    {
        return result;
    }

    function addition(uint num1, uint num2) public pure returns (uint)
    {
        return (num1+num2);

    }

    function sub(uint num1, uint num2) public pure returns (uint)
    {
        return (num1 - num2);
    }

    function mult(uint num1, uint num2) public pure returns (uint)
    {
        return (num1 * num2);
    }

    function div(uint num1, uint num2) public pure returns (uint)
    {
        return (num1 / num2);
    }

    }