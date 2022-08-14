import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-router-bootstrap';
import Button from 'react-router-bootstrap';
import { useState } from 'react';
import payment_abi from './contracts/payment_abi.json';
import { ethers, utils } from 'ethers';

function Nav_bar(props) {
  useEffect(() => {
    // Update the document title using the browser API
    props.connectwallet();
  }, []);

  return (
    <div>
      <nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="ml-8 container flex flex-wrap justify-between items-center mx-auto">
          <a href="https://flowbite.com/" class="flex items-center">
            <LinkContainer to="/">
              <h1 class="self-center text-2xl  whitespace-nowrap dark:text-white">
                Payment Dapp
              </h1>
            </LinkContainer>
          </a>
          <div class="flex md:order-2 flex-row mr-8">
            {!props.haspan && (
              <div class="flex flex-col">
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={props.connectPAN}
                >
                  {props.PANbutton}
                </button>
                <input
                  type="text"
                  id="pannumber"
                  placeholder="XXXXX0000X"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={props.pannumber}
                  onChange={(e) => {
                    props.setpannum(e.target.value);
                  }}
                />
              </div>
            )}
            <div class="flex flex-col">
              <button
                type="button"
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={props.connectwallet}
              >
                {props.connectbutton}
              </button>
              <p class="text-slate-500 hover:text-black">
                {props.defaultaccount}
              </p>
            </div>
            <div class="flex flex-col">
              <button
                type="button"
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={props.getpan}
              >
                {props.PANbuttonget}
              </button>
              <p class="text-slate-500 hover:text-black text-center uppercase">
                {props.defaultPAN}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav_bar;
