// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BuyMeACoffee is Ownable {
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    Memo[] memos;

    address payable tipsReceiver;

    constructor() {
        tipsReceiver = payable(msg.sender);
    }

    function buyCoffee(string memory name, string memory message)
        public
        payable
    {
        require(msg.value != 0, "Should be value");

        memos.push(Memo(msg.sender, block.timestamp, name, message));

        emit NewMemo(msg.sender, block.timestamp, name, message);
    }

    function changeOwner(address newTipsReceiver) public onlyOwner {
        tipsReceiver = payable(newTipsReceiver);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function withdrawTips() public {
        require(msg.sender == tipsReceiver, "No owner");
        require(tipsReceiver.send(address(this).balance));
    }
}
