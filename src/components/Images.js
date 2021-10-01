import React from "react";
import { useEffect, useState } from "react";
import { getItems, buy } from "../utils/utils";

export default function Images() {
  const [image, setImage] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const items = await getItems();
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
          <h2 className="text-2xl py-2">Images</h2>
          <div className="flex justify-center">
            <div className="px-4" style={{ maxWidth: "1600px" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {image.map((nft, i) => (
                  <div key={i} className="border shadow-xl  overflow-hidden">
                    <img
                      alt="nft"
                      style={{ height: "200px", width: "100%" }}
                      src={nft.image}
                    />
                    <div className="p-4 bg-gray-100">
                      <p
                        style={{ height: "50px" }}
                        className="text-2xl font-semibold"
                      >
                        {nft.name}
                      </p>
                      <div style={{ height: "50px", overflow: "hidden" }}>
                        <p className="text-gray-400">{nft.description}</p>
                      </div>
                      <div style={{ overflow: "hidden" }}>
                        <p
                          className="pt-2 pb-2 text-gray-600"
                          style={{
                            borderTop: "1px solid #D3D3D3",
                            borderBottom: "1px solid #D3D3D3",
                          }}
                        >
                          <span className="mr-3">Minted By: </span>
                          {nft.mintedBy.substr(0, 5) +
                            "...." +
                            nft.mintedBy.substr(38, 42)}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 bg-gray-100">
                      <p className="text-2xl mb-4 font-bold text-black">
                        {nft.price} ETH
                      </p>
                      <button
                        className="w-full bg-gray-700 text-black font-bold py-2 px-12 "
                        onClick={() => buyNft(nft)}
                      >
                        <span className="text-white">Buy</span>
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
