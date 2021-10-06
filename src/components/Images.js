import React from "react";
import { useEffect, useState } from "react";
import { getAllItems, buy } from "../utils/utils";

export default function Images() {
  const [image, setImage] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const items = await getAllItems();
    const imageItems = items.filter((i) => i.category === "image");
    setImage(imageItems);
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
  if (loadingState === "loaded" && !image.length)
    return <h1 className="px-20 py-10 text-3xl">No Images in marketplace</h1>;
  return (
    <div className="container mx-auto px-20 pb-10">
      {Boolean(image.length) && (
        <div>
          <div className="flex justify-center">
            <div className="px-4" style={{ maxWidth: "1600px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {image.map((nft, i) => (
                  <div key={i} className=" shadow-xl pt-5 overflow-hidden">
                    <img
                      alt=""
                      style={{ height: "300px", width: "400px" }}
                      src={nft.image}
                      className="rounded-xl"
                    />
                    <div className="p-4 pb-0 pl-6 bg-white float-left	">
                      <p className="text-xl text-gray-600 font-semibold">
                        {nft.name}
                      </p>
                    </div>

                    <div className="p-5 pb-0 bg-white float-right	">
                      <p className=" font-bold text-gray-600">
                        {nft.price} ETH
                      </p>
                    </div>

                    <div className="clear-both px-5  py-2">
                      <p className="text-gray-400">{nft.description}</p>
                    </div>

                    <div className="p-4 pt-0 pl-6 bg-white border-t-1 text-semibold float-left	">
                      <p className=" text-gray-600 text-sm ">
                        Token Id: {nft.tokenId}
                      </p>
                      <p className=" text-gray-500 text-semibold text-sm ">
                        Minted By:{" "}
                        {nft.mintedBy.substr(0, 5) +
                          "...." +
                          nft.mintedBy.substr(38, 42)}
                      </p>
                    </div>
                    <div className="p-5 pt-0 bg-white float-right	">
                      <button
                        onClick={() => buyNft(nft)}
                        class="bg-transparent hover:bg-purple-700 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
