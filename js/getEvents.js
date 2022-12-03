const Web3 = require('web3');
const dotenv = require('dotenv');
dotenv.config({path:'../.env'}); 

const PAST_EVENT = async (TXN_HASH) => {
  
  await window.ethereum.enable();
  const web3 = new Web3(window.ethereum);
  
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const contractAbi = require('../build/contracts/Creator.json');
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const data = await web3.eth.getTransaction(TXN_HASH);
  await contract.getPastEvents('SharesPublished',
    {
      filter: { INDEXED_PARAMETER: VALUE },
      fromBlock: data.blockNumber,
      toBlock: data.blockNumber,
    },
    (err, events) => {
      console.log(events);
    });
};

PAST_EVENT();