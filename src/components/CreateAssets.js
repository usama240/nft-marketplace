import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useHistory } from "react-router-dom";
import Web3Modal from "web3modal";

import { nftaddress, nftmarketaddress } from "../config";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export default function CreateAssets() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
    category: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  async function onChange(e) {
    const file = e.target.files[0];
    const { category } = formInput;

    if (!file.name.match(/.(jpg|jpeg|png|gif)$/i) && category === "image") {
      setError("Please choose image file");
      return;
    }

    if (!file.name.match(/.(mp3|wav)$/i) && category === "music") {
      setError("Please choose music file");
      return;
    }
    setError("");
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function onCategoryChange(e) {
    updateFormInput({ ...formInput, category: e.target.value });
  }

  async function createMarket() {
    const { name, description, price, category } = formInput;
    if (!name || !description || !price || !category || !fileUrl) {
      setError("Please fill all fields");
      return;
    }

    const data = JSON.stringify({
      name,
      description,
      category,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
      value: listingPrice,
    });
    await transaction.wait();
    history.push("/");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/3 flex flex-col py-12 px-8 mt-10 rounded-xl mt-3 bg-purple-400 ">
        <>
          {Boolean(error.length) && (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">ERROR! </strong>
              <span className="block sm:inline">{error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  onClick={() => setError("")}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
        </>
        <input
          placeholder="Asset Name"
          className="mt-8 border  p-4 bg-white rounded focus:bg-white "
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border  p-4  bg-white rounded focus:bg-white "
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          type="number"
          min="0"
          placeholder="Asset Price in Eth"
          className="mt-2 border  p-4 bg-white rounded focus:bg-white "
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <select
          name="category"
          className="py-2 mt-2 bg-white rounded"
          onChange={onCategoryChange}
        >
          <option value="">Category</option>
          <option value="image">Image</option>
          <option value="music">Music</option>
        </select>
        <input
          type="file"
          name="Asset"
          className="my-4  rounded"
          onChange={onChange}
        />
        {fileUrl && (
          <img className=" mt-4" width="350" alt="Uploaded" src={fileUrl} />
        )}
        <button
          onClick={createMarket}
          className="font-bold mt-4 mx-20 rounded bg-purple-800 text-white p-4 shadow-lg"
        >
          Create Digital Asset
        </button>
      </div>
    </div>
  );
}
