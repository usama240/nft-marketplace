import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export async function getItems() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://ropsten.infura.io/v3/df94e10d4d5f445b8ab45fd023ae25f8"
  );
  const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    nftmarketaddress,
    Market.abi,
    provider
  );
  const data = await marketContract.fetchMarketItems();
  const items = await Promise.all(
    data.map(async (i) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(i.price.toString(), "ether");
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        mintedBy: i.mintedBy,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
        category: meta.data.category,
      };
      return item;
    })
  );
  return items;
}

export async function buy(nft) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
  const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
  const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
    value: price,
  });
  await transaction.wait();
}
