import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { getCreatedItems, buy } from "../utils/utils";
import OwnedCard from "./cards/OwnedCard";
import SoldCard from "./cards/SoldCard";
const { ethereum } = window;

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [soldImage, setSoldImages] = useState([]);
  const [soldMusic, setSoldMusic] = useState([]);
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
        setConnection("true");
        loadNFTs();
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
    const items = await getCreatedItems();
    const soldImages = items.filter((i) => i.sold && i.category === "image");
    const soldMusic = items.filter((i) => i.sold && i.category === "music");
    const imageItems = items.filter((i) => i.category === "image");
    const musicItems = items.filter((i) => i.category === "music");

    setImage(imageItems);
    setMusic(musicItems);
    setSoldImages(soldImages);
    setSoldMusic(soldMusic);
    setNfts(items);
    setLoadingState("loaded");
  }

  if (isConnected === "false") {
    return (
      <div
        className="bg-purple-700 relative text-gray-600 center cursor-pointer  mt-20 "
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
    return <h1 className="py-10 px-20 text-3xl">No assets created</h1>;
  return (
    <div className="pl-20 pr-20">
      <OwnedCard imgData={image} musicData={music} />
      <div className="px-4 mb-5">
        {Boolean(soldImage.length || soldMusic.length) && (
          <SoldCard imgData={soldImage} musicData={soldMusic} />
        )}
      </div>
    </div>
  );
}
