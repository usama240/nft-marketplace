import React from "react";

function MyAssetCard(props) {
  return (
    <div>
      <div className="m-40 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {props.imgData.map((nft, i) => (
            <div key={i} className=" shadow-xl overflow-hidden">
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
                <p className=" font-bold text-gray-600">{nft.price} ETH</p>
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
            </div>
          ))}

          {props.musicData.map((nft, i) => (
            <div key={i} className=" shadow-xl overflow-hidden">
              <div>
                <img
                  alt=""
                  className="rounded-xl"
                  style={{ height: "233px", width: "400px" }}
                  src="/music.jpg"
                />
              </div>
              <div>
                <audio
                  className="bg-gray-100 w-full"
                  autoPlay={false}
                  controls={true}
                >
                  <source type="audio/mp3" src={nft.image} />
                </audio>
              </div>
              <div className="p-4 pb-0 pl-6 bg-white float-left	">
                <p className="text-xl text-gray-600 font-semibold">
                  {nft.name}
                </p>
              </div>

              <div className="p-5 pb-0 bg-white float-right	">
                <p className=" font-bold text-gray-600">{nft.price} ETH</p>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyAssetCard;
