//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";

contract intern {
    struct transaction {
        string BuyerPAN;
        string SellerPAN;
        uint256 InvoiceAmount;
        uint256 InvoiceDate;
        bool status;
    }

    mapping(string => transaction) public transactionDetails;
    mapping(address => string) public addressToString;
    mapping(string => address payable) public stringToAddress;

    function transact(
        string memory buyerPAN,
        string memory sellerPAN,
        uint256 invoiceAmount
    ) public payable {
        transactionDetails[buyerPAN].BuyerPAN = buyerPAN;
        transactionDetails[buyerPAN].SellerPAN = sellerPAN;
        transactionDetails[buyerPAN].InvoiceAmount = invoiceAmount;
        transactionDetails[buyerPAN].InvoiceDate = block.timestamp;
        transactionDetails[buyerPAN].status = true;
    }

    function getPAN(address addr) public view returns (string memory) {
        return addressToString[addr];
    }

    function getaddr(string memory PAN) public view returns (address) {
        return stringToAddress[PAN];
    }

    function register(string memory PAN, address addr) public {
        stringToAddress[PAN] = payable(addr);
        addressToString[addr] = PAN;
    }

    //working in progress

    function getSellerPAN(string memory buyerPAN)
        public
        view
        returns (string memory)
    {
        return transactionDetails[buyerPAN].SellerPAN;
    }

    function getInvoiceAmount(string memory buyerPAN)
        public
        view
        returns (uint256)
    {
        return transactionDetails[buyerPAN].InvoiceAmount;
    }

    function getTransactionDate(string memory buyerPAN)
        public
        view
        returns (string memory)
    {
        uint256 timest = transactionDetails[buyerPAN].InvoiceDate;
        uint256 year;
        uint256 month;
        uint256 day;
        (year, month, day) = timestampToDate(timest);

        string memory d;
        string memory m;
        string memory y;
        d = Strings.toString(day);
        m = Strings.toString(month);
        y = Strings.toString(year);

        bytes memory b;
        b = abi.encodePacked(d, "/", m, "/", y);

        string memory str = string(b);
        return str;
    }

    function getTransactionStatus(string memory buyerPAN)
        public
        view
        returns (bool)
    {
        return transactionDetails[buyerPAN].status;
    }

    //Timesstamp to date
    function _daysToDate(uint256 _days)
        internal
        pure
        returns (
            uint256 year,
            uint256 month,
            uint256 day
        )
    {
        int256 __days = int256(_days);
        int256 OFFSET19700101 = 2440588;
        int256 L = __days + 68569 + OFFSET19700101;
        int256 N = (4 * L) / 146097;
        L = L - (146097 * N + 3) / 4;
        int256 _year = (4000 * (L + 1)) / 1461001;
        L = L - (1461 * _year) / 4 + 31;
        int256 _month = (80 * L) / 2447;
        int256 _day = L - (2447 * _month) / 80;
        L = _month / 11;
        _month = _month + 2 - 12 * L;
        _year = 100 * (N - 49) + _year + L;

        year = uint256(_year);
        month = uint256(_month);
        day = uint256(_day);
    }

    function timestampToDate(uint256 timestamp)
        internal
        pure
        returns (
            uint256 year,
            uint256 month,
            uint256 day
        )
    {
        uint256 SECONDS_PER_DAY = 24 * 60 * 60;

        (year, month, day) = _daysToDate(timestamp / SECONDS_PER_DAY);
    }
}
