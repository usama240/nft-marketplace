import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";

import MyAssetCard from "./cards/MyAssetCard";

const { ethereum } = window;

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [image, setImage] = useState([]);
  const [music, setMusic] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [isConnected, setConnection] = useState("false");

  if (ethereum) {
    var provider = new ethers.providers.Web3Provider(ethereum);
  }

  const isMetaMaskConnected = async () => {
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  };

  useEffect(async () => {
    await isMetaMaskConnected().then((connected) => {
      if (connected) {
        loadNFTs();
        setConnection("true");
      }
    });
  }, []);

  async function handleClick() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    if (signer) {
      setConnection("true");
      loadNFTs();
    }
  }

  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          mintedBy: i.mintedBy,
          image: meta.data.image,
          category: meta.data.category,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    const imageItems = items.filter((i) => i.category === "image");
    const musicItems = items.filter((i) => i.category === "music");

    setImage(imageItems);
    setMusic(musicItems);
    setNfts(items);
    setLoadingState("loaded");
  }
  if (isConnected === "false") {
    return (
      <div
        className="bg-gray-700 relative text-gray-600 center cursor-pointer  mt-20 "
        onClick={handleClick}
        style={{
          width: "450px",
          padding: "15px 0 20px 50px",
          marginLeft: "500px",
        }}
      >
        <img
          src="./metamask.png"
          className="inline-block"
          width="80px"
          height="80px"
          alt=""
        />
        <p className="text-gray-200 text-2xl inline-block ml-5">
          Sign in with metamask
        </p>
      </div>
    );
  }
  if (loadingState === "not-loaded") {
    return (
      <img src="./Loading.gif" alt="Loading.." className="d-block m-auto" />
    );
  }
  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;
  return <MyAssetCard imgData={image} musicData={music} />;
}