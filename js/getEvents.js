const Web3 = require('web3');
const web3 = new Web3('HTTPS_ENDPOINT');
const contractAddress = 'CONTRACT_ADDRESS';
const contractAbi = require('./ABI_JSON');
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const PAST_EVENT = async () => {
  await contract.getPastEvents('EVENT_NAME',
    {
      filter: { INDEXED_PARAMETER: VALUE },
      fromBlock: BLOCK_NUMBER,
      toBlock: BLOCK_NUMBER,
    },
    (err, events) => {
      console.log(events);
    });
};

PAST_EVENT();