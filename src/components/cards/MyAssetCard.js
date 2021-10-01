import React from "react";

function MyAssetCard(props) {
  return (
    <div>
      <div className="m-40 mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {props.imgData.map((nft, i) => (
            <div key={i} className="border shadow-xl  overflow-hidden">
              <img
                alt=""
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
              </div>
            </div>
          ))}

          {props.musicData.map((nft, i) => (
            <div key={i} className="border shadow overflow-hidden">
              <div>
                <img
                  alt=""
                  style={{ height: "146px", width: "100%" }}
                  src="/music.jpg"
                />
              </div>
              <audio
                className="bg-gray-100 w-full"
                autoPlay={false}
                controls={true}
              >
                <source type="audio/mp3" src={nft.image} />
              </audio>
              <div
                className="p-4 bg-gray-100"
                style={{
                  borderTop: "2px solid #D3D3D3",
                }}
              >
                <p className="text-xl font-bold text-gray-900">{nft.name}</p>
              </div>
              <div className="p-4 bg-gray-900">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
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
