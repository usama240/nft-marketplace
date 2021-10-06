import React from "react";
import { useHistory } from "react-router-dom";
function ImageCardHome(props) {
  let history = useHistory();
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

  if (result.length === 0) {
    return null;
  }

  return (
    <div>
      <h2
        className="text-4xl text-bold py-2 border-gray-600 text-center mt-10 mx-auto border-b-2 border-t-2 text-gray-600"
        style={{ width: "900px" }}
      >
        Images
      </h2>
      <div className="flex justify-center mt-10 bg-purple-300">
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
              .slice(0, 4)
              .map((nft, i) => (
                <div
                  key={i}
                  className=" shadow-xl mb-5 rounded-t-xl bg-white overflow-hidden"
                >
                  <img
                    alt=""
                    style={{ height: "300px", width: "400px" }}
                    src={nft.image}
                    className="rounded-xl bg-gray-200"
                  />
                  <div className="bg-white">
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
                    <div className="clear-both px-5 bg-white py-2">
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
                        onClick={() => buy(nft)}
                        className="bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="content-center flex justify-center items-center mt-10">
        <button
          onClick={() => {
            history.push("/images");
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 text-xl rounded"
        >
          See All
        </button>
      </div>
    </div>
  );
}

export default ImageCardHome;
