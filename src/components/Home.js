import React from "react";
import { useEffect, useState } from "react";
import { getItems, buy } from "../utils/utils";
import ImageCardHome from "./cards/ImageCardHome";
import MusicCardHome from "./cards/MusicCardHome";

export default function Home(props) {
  const [nfts, setNfts] = useState([]);
  const [image, setImage] = useState([]);
  const [music, setMusic] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const items = await getItems();
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
      <div className="container mx-auto px-20 pb-10">
        <div
          className="bg-gray-400 relative rounded-xl  text-gray-600 center  mt-20 "
          style={{
            width: "550px",
            padding: "15px 0 20px 140px",
            marginLeft: "400px",
          }}
        >
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <button className="absolutes top-0 cursor-default mt-5 mr-4 bg-gray-800 p-2 pb-4">
            <svg
              className="text-gray-300 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
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
