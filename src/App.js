import { Fragment, useEffect } from 'react';
import React, { Component } from 'react';
import './App.css';
import Home_page from './Home_page';
import Nav_bar from './Nav_bar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { ethers, utils } from 'ethers';
import payment_abi from './contracts/payment_abi.json';

function App() {
  const cntadd = '0x8c77d1F95bcaE66Fede75F76176F8653c29C825F';

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState('');
  const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [PANbuttontext, setPANbuttontext] = useState('connect PAN');
  const [defaultPAN, setdefaultPAN] = useState('');
  const [pannumber, setpannumber] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [PANbuttonget, setPANbuttonget] = useState('View PAN Number');
  const [buyerPAN, setbuyerPAN] = useState('');
  const [buyeraddr, setbuyeraddr] = useState('0X');
  const [amount, setamount] = useState(0);
  const [haspan, sethaspan] = useState(false);

  // const [getsellerpan, setgetsellerpan] = useState(null);
  // const [getamount, setgetamount] = useState(0);
  // const [getdate, setgetdate] = useState('');
  // const [getvalidity, setgetvalidity] = useState(false);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          result[0] = utils.getAddress(result[0]);
          accountChangedHandler(result[0]);
          setConnButtonText('Wallet Connected');
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  };

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    setdefaultPAN('');
    updateEthers();
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);

  window.ethereum.on('chainChanged', chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(cntadd, payment_abi, tempSigner);
    setContract(tempContract);
  };

  const registerhandler = (event) => {
    event.preventDefault();
    console.log('sending ' + pannumber + ' to the contract');
    contract.register(pannumber, defaultAccount);
    setPANbuttontext('connected');
  };

  async function getpan() {
    const x = await contract.getPAN(ethers.utils.getAddress(defaultAccount));
    await setdefaultPAN(x);
    sethaspan(true);
    setPANbuttonget('Your PAN Number');
  }

  async function handleclick(e) {
    e.preventDefault();

    const y = await contract.getaddr(buyerPAN);
    setbuyeraddr(y);
    try {
      if (!window.ethereum) alert('No crypto wallet found. Please install it.');
      if (amount <= 0) alert('enter valid amount of ethers');
      if (buyeraddr == '0x') alert('please enter valid address');

      await window.ethereum.send('eth_requestAccounts');

      ethers.utils.getAddress(buyeraddr);

      const tx = await signer.sendTransaction({
        to: buyeraddr,
        value: ethers.utils.parseEther(amount),
      });

      const x = await contract.transact(buyerPAN, defaultPAN, amount);

      setamount(0);
      setbuyeraddr('0x');
    } catch (err) {
      console.log(err);
    }
  }

  // async function checktransaction() {
  //   const a = await contract.getSellerPAN(buyerPAN);
  //   setgetsellerpan(a);
  //   const b = await contract.getInvoiceAmount(buyerPAN);
  //   setgetamount(b);
  //   const c = await contract.getTransactionDate(buyerPAN);
  //   setgetdate(c);
  //   const d = await contract.getTransactionStatus(buyerPAN);
  //   setgetvalidity(d);

  //   console.log(buyerPAN, getsellerpan, getamount, getdate, getvalidity);
  // }

  return (
    <BrowserRouter>
      <Container className="mt-3">
        <Nav_bar
          connectbutton={connButtonText}
          defaultaccount={defaultAccount}
          connectwallet={connectWalletHandler}
          connectPAN={registerhandler}
          defaultPAN={defaultPAN}
          PANbutton={PANbuttontext}
          pannumber={pannumber}
          setpannum={setpannumber}
          getpan={getpan}
          PANbuttonget={PANbuttonget}
          haspan={haspan}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home_page
                amount={amount}
                setamount={setamount}
                buyerPAN={buyerPAN}
                setbuyerPAN={setbuyerPAN}
                handleclick={handleclick}
                // checktransaction={checktransaction}
                // getSellerpan={getsellerpan}
                // getdate={getdate}
                // getvalidity={getvalidity}
                // getamount={getamount}
              />
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
