import React from "react";
import { useEffect, useState } from "react";
import { getAllItems, buy } from "../utils/utils";
import ImageCardHome from "./cards/ImageCardHome";
import MusicCardHome from "./cards/MusicCardHome";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [image, setImage] = useState([]);
  const [music, setMusic] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const items = await getAllItems();
    const imageItems = items.filter((i) => i.category === "image");
    const musicItems = items.filter((i) => i.category === "music");
    setImage(imageItems);
    setMusic(musicItems);
    setNfts(items);
    setLoadingState("loaded");
  }

  async function buyNft(nft) {
    await buy(nft);
    loadNFTs();
  }

  if (loadingState === "not-loaded") {
    return (
      <img src="./Loading.gif" alt="Loading.." className="d-block m-auto" />
    );
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <>
      <div className="hero">
        <img src="./banner.jpg" alt="houses on the water" className="w-full" />
        <div className="heading-container absolute flex justify-center items-center w-full">
          <h1 className="text-5xl text-white">
            Discover And Collect Digital Art
          </h1>
        </div>
        <div className="heading-second mt-10 absolute flex justify-center items-center w-full">
          <h1 className="text-2xl text-white">
            World Of Rare Non Fungible Tokens
          </h1>
        </div>
        <div className="mt-20 absolute search">
          <div className="container flex justify-center items-center">
            <div className="relative">
              <input
                type="text"
                className="h-12 w-96 pr-8 pl-5 rounded-full z-0 text-gray-600 focus:shadow focus:outline-none"
                placeholder="Search anything..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <div className="absolute top-3 right-5">
                <i className="fa fa-search text-xl text-indigo-400 z-20 "></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-20 pb-10">
        {Boolean(image.length) && (
          <ImageCardHome data={image} search={searchTerm} function={buyNft} />
        )}
        {Boolean(music.length) && (
          <MusicCardHome data={music} search={searchTerm} function={buyNft} />
        )}
      </div>
    </>
  );
}
