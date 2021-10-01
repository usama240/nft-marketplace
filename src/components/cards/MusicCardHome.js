import React from "react";

function MusicCardHome(props) {
  function buy(nft) {
    props.function(nft);
  }

  const result = props.data.filter((val) => {
    if (props.search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(props.search.toLowerCase())) {
      return val;
    }
  });
  if (!result.length) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl py-2 mt-10 border-top text-3xl">Music</h2>
      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: "1600px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {props.data
              .filter((val) => {
                if (props.search === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(props.search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((nft, i) => (
                <div key={i} className="border shadow-xl overflow-hidden">
                  <div>
                    <img
                      alt=""
                      style={{ height: "150px", width: "100%" }}
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
                    <p className="text-2xl mb-4 font-bold text-gray-800">
                      {nft.price} ETH
                    </p>
                    <button
                      className="w-full bg-gray-700 text-white font-bold py-2 px-12 "
                      onClick={() => buy(nft)}
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
  );
}

export default MusicCardHome;
