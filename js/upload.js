const contractAddress = "0x811737663d9ed628ddc71418c16dcc87d5f3d450";
const addr = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada"
const app_id = "ec920c4f-7773-48bd-8acb-8505cb41cb26";
const api_key = "HziWYKHVP.429840c1-257c-4d41-aa7d-329202d56f63";

import {
  helperAttributes,
  getDomainSeperator,
  getDataToSignForPersonalSign,
  getDataToSignForEIP712,
  buildForwardTxRequest,
  getBiconomyForwarderConfig
} from './biconomyForwardHelpers.js';
import { broadCast } from './sendNotifications.mjs';

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
                    },
                    {
                        "internalType": "uint256",
                        "name": "equity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "uri",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getTokenOwners",
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
            },
            {
                "internalType": "uint256",
                "name": "_equity",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_uri",
                "type": "string"
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
    },
    {
        "stateMutability": "payable",
        "type": "receive"
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

let accounts, web3, contractInstance, userAddress, networkId;

async function load() {
    await window.ethereum.enable();
    web3 = new Web3(window.ethereum);
    contractInstance = new web3.eth.Contract(
        abi,
        contractAddress
    );

    accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    userAddress =  accounts[0];
    document.getElementById('connectWallet').innerText = userAddress.substring(0, 4) + "..."+userAddress.substring(36, 42);
    networkId = await web3.eth.net.getId();
}

load();

async function storeNFTandMint(imagePath, genre, fundUse, equity, royalties, nftcount) {
    // var bodyFormData = new FormData();
    // bodyFormData.append('file', imagePath);
    // bodyFormData.append('meta', {
    //   genre: genre, 
    //   name: fundUse, 
    //   equity: equity, 
    //   royalties: royalties, 
    //   nftcount: nftcount,  
    // })
    // const result = await axios.post('https://api.nft.storage/store',
    // {
    //   data: bodyFormData
    // },
    // {
    //   headers: {
    //     'Authorization': `Bearer ${NFT_STORAGE_KEY}`,
    //     'Content-Type': `multipart/form-data`,
    //   }
    // })

    const result = await axios({
        method: 'post',
        url: 'https://api.nft.storage/upload',
        data: imagePath,
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ4ZWY0RGY5ZDhFNjY1MWEwNTFBMzQxYjRGNDMzM0ZERWRmNjIyOTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1ODAzMDAxMjIyNSwibmFtZSI6IkVhcnRoUmFpc2VyIn0.go2tdDF2TJ4Se7qrD3vasa8mgjVRqlvIWRbUBEkvQS4' }
    })
    alert("Stored Successfully With Hash: " + result['data']['value']['cid']);

    const txValue = await web3.utils.toWei((royalties/nftcount)+"", 'ether');
    console.log(1);
    let functionSignature = contractInstance.methods.publishShares(accounts[0]+"", fundUse+"", genre+"", nftcount, txValue, equity, "https://"+result['data']['value']['cid']+".ipfs.nftstorage.link").encodeABI();
    console.log(2);
    console.log(functionSignature)

    const trustedForwarder = "0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b";
    let txGas = await web3.eth.estimateGas({
        from: trustedForwarder, 
        data: functionSignature,
        to: contractAddress
    }); 

    let forwarder = await getBiconomyForwarderConfig(networkId);
    console.log(forwarder);
    let forwarderContract = new web3.eth.Contract(
        forwarder.abi,
        forwarder.address
    );

    const batchNonce = await forwarderContract.methods.getNonce(accounts[0],10).call();
    const gasLimitNum = Number(txGas);
    const to = contractAddress;
    const batchId = 10;

    const request = await buildForwardTxRequest({account:userAddress,to,gasLimitNum,batchId,batchNonce,data:functionSignature});
    console.log(request)

    const network = await web3.eth.net.getId();
    console.log(network);
    const domainSeparator = await getDomainSeperator(network);
    console.log(domainSeparator);
    const dataToSign =  await getDataToSignForEIP712(request,networkId);
   
    web3.currentProvider.send({
            jsonrpc: "2.0",
            id: 999999999999,
            method: "eth_signTypedData_v4",
            params: [userAddress, dataToSign]
        },
        function (error, response) {
            console.info(`User signature is ${response.result}`);
            if (error || (response && response.error)) {
                //showErrorMessage("Could not get user signature");
                console.log(error);
                console.log(response);
            } else if (response && response.result) {
                let sig = response.result;
                console.log(sig);
                //sendTransaction({userAddress, request, domainSeparator, sig, signatureType:biconomy.EIP712_SIGN});
                const params = [request, domainSeparator, sig];
                fetch(`https://api.biconomy.io/api/v2/meta-tx/native`, {
                  method: "POST",
                  headers: {
                      "x-api-key": api_key,
                      "Content-Type": "application/json;charset=utf-8",
                },
                  body: JSON.stringify({
                      to: contractAddress,
                      apiId: app_id,
                      params: params,
                      from: userAddress,
                      signatureType: "EIP712_SIGN"
                }),
                })
                .then((response) => response.json())
                .then(async function (result) {
                    console.log(result);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    );

    broadCast(accounts[0]);
}

async function main(filePath, genre, fundUse, equity, royalties, nftcount) {
    const result = await storeNFTandMint(filePath, genre, fundUse, equity, royalties, nftcount);
    console.log(result)
}

document.getElementById('submit_nft').addEventListener('click', async() => {
  console.log('clicked');
  let filePath = document.getElementById('upload_file').files[0];

  var fileReader = new FileReader();

  fileReader.onload = function (event) {
    document.getElementById('preview').setAttribute("src", event.target.result);
  }

  fileReader.readAsDataURL(filePath);

  console.log(filePath);
  const fileInput = document.getElementById('upload_file');
  fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];

    var fileReader = new FileReader();

    fileReader.onload = function (event) {
      document.getElementById('preview').setAttribute("src", event.target.result);
    }

    fileReader.readAsDataURL(selectedFile);

    console.log(selectedFile);
  }

  let genre = document.getElementById('genre');
  console.log(genre.value)
  let selected = genre.value;
  let name = document.getElementById('item_title').value;
  let equity = document.getElementById('item_royalties').value;
  let funds = document.getElementById('funds_to_raise').value;
  let nftcount = document.getElementById('item_count').value;
  console.log(selected, name, equity, funds, nftcount);

  document.getElementById('preview_name').innerText = name;
  document.getElementById('preview_genre').innerText = selected;
  document.getElementById('preview_price').innerText = (funds / nftcount) + " MATIC";
  document.getElementById('preview_equity').innerText = "Equity per share: " + (equity/nftcount) + "%";
  await storeNFTandMint(filePath, genre, name, equity, funds, nftcount);
});
