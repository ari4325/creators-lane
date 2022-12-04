import { multicast } from "./sendNotifications.mjs";

const contractAddress = "0xb722486eDD24bEc2640dE4866d6A21C15C8cFCcE";
const addr = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada"

document.getElementById('payout').addEventListener('click', async() => {
  console.log('inside payout');
    start();
})

const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_creatorNFT",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_forwarder",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_buyer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Invested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_token",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_payoutValue",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "tokenOwners",
                "type": "address[]"
            }
        ],
        "name": "PayoutReleased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_token",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_numberOfTokens",
                "type": "uint256"
            }
        ],
        "name": "SharesPublished",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "claimPayout",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllCreators",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            }
        ],
        "name": "getCreatorShare",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_totalAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_fundsRaised",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_bought",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "genre",
                        "type": "string"
                    }
                ],
                "internalType": "struct Creator.Share",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            }
        ],
        "name": "getPayoutDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "released",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountPerBeliever",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Creator.Payout",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getPayoutDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "released",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountPerBeliever",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Creator.Payout",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTrustedForwarder",
        "outputs": [
            {
                "internalType": "address",
                "name": "forwarder",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUserTokens",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "invest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "forwarder",
                "type": "address"
            }
        ],
        "name": "isTrustedForwarder",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_minter",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_genre",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "publishShares",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "releasePayouts",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_forwarder",
                "type": "address"
            }
        ],
        "name": "setTrustedForwarder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
]

const start = async() => {
    await window.ethereum.enable();
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
        abi,
        contractAddress
    );

    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    let userAddress =  accounts[0];
    document.getElementById('connectWallet').innerText = userAddress.substring(0, 4) + "..."+userAddress.substring(36, 42);
    let networkId = await web3.eth.net.getId();

    const payoutDone = await contractInstance.methods.releasePayouts().send({ from: userAddress})
    .on('receipt', function(receipt){
      console.log(receipt.events);
      contractInstance.events.PayoutReleased(() => {
      })
      .on('data', function(event){
          console.log('Event:', event);
          console.log('Creator Wallet Address: ',event.returnValues._creator, event.returnValues._token, event.returnValues._payoutValue, event.returnValues.tokenOwners);
          multicast(event.returnValues._creator, event.returnValues._token, event.returnValues.tokenOwners);
      })
      .on('error', function(error, receipt) {
          console.log('Error:', error, receipt);
      });    
   });
}