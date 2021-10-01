import React from "react";

function SoldCard(props) {
  return (
    <div>
      <div>
        <h2 className="text-2xl py-2">Items sold</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {props.imgData.map((nft, i) => (
            <div key={i} className="border shadow overflow-hidden">
              <img
                alt=""
                style={{ height: "200px", width: "100%" }}
                src={nft.image}
              />
              <div className="p-4 bg-gray-100">
                <p className="text-xl font-bold text-gray-900">{nft.name}</p>
              </div>
              <div className="p-4 bg-gray-900">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
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

export default SoldCard;
