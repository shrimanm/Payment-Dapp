import React, { useState } from 'react';
import { ethers } from 'ethers';
import payment_abi from './contracts/payment_abi.json';
import { LinkContainer } from 'react-router-bootstrap';
function Home_page(props) {
  const [page, setpage] = useState(false);

  return (
    <div class="w-screen h-screen py-20 bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 ">
      <div class="bg-white max-w-lg mx-auto p-8 md:p-12 my-14 rounded-lg shadow-2xl">
        <section>
          <h3 class="font-bold text-2xl text-center">
            Welcome to Payment Dapp
          </h3>
          <div class="flex justify-around mt-3">
            <button
              class="bg-blue-400 hover:bg-blue-300 hover:text-black text-white  py-1 px-2 rounded visited:font-bold"
              onClick={() => setpage(false)}
            >
              send ether
            </button>
            {/* <button
              class="bg-blue-400 hover:bg-blue-300 hover:text-black text-white py-1 px-2 rounded active:text-black"
              onClick={() => setpage(true)}
            >
              check transaction
            </button> */}
          </div>
        </section>

        <section class="mt-10">
          <form class="flex flex-col">
            <div class="mb-6 pt-3 rounded bg-gray-200">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                for="email"
              >
                Enter buyer PAN
              </label>
              <input
                type="text"
                id="vehicle_number"
                placeholder="XXXXX0000X"
                class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 uppercase"
                value={props.buyerPAN}
                onChange={(e) => {
                  props.setbuyerPAN(e.target.value);
                }}
              />
            </div>
            <div class="mb-6 pt-3 rounded bg-gray-200">
              <label
                class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                for="email"
              >
                Enter amount
              </label>
              <input
                type="text"
                id="vehicle_number"
                placeholder="0000"
                class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 uppercase"
                value={props.amount}
                onChange={(e) => {
                  props.setamount(e.target.value);
                }}
              />
            </div>
            {/* <LinkContainer to="/certificate"> */}
            <button
              class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
              onClick={props.handleclick}
            >
              Submit
            </button>
            {/* </LinkContainer> */}
          </form>
        </section>

        {/* {page && (
          <section class="mt-10">
            <form class="flex flex-col">
              <div class="mb-6 pt-3 rounded bg-gray-200">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  for="email"
                >
                  Enter buyer PAN
                </label>
                <input
                  type="text"
                  id="vehicle_number"
                  placeholder="XXXXX0000X"
                  class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3 uppercase"
                  value={props.buyerPAN}
                  onChange={(e) => {
                    props.setbuyerPAN(e.target.value);
                  }}
                />
              </div>
              <button
                class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                type="submit"
                onClick={props.checktransaction}
              >
                Submit
              </button>
            </form>
            <div>
              <p>{props.getsellerpan}</p>
              <p>{props.getdate}</p>
              <p>{props.getamount}</p>
              <p>{props.getvalidity}</p>
            </div>
          </section>
        )} */}
      </div>
    </div>
  );
}

export default Home_page;
