import Web3 from 'web3';

//import { Biconomy } from '@biconomy/mexa';
import {
    helperAttributes,
    getDomainSeperator,
    getDataToSignForPersonalSign,
    getDataToSignForEIP712,
    buildForwardTxRequest,
    getBiconomyForwarderConfig
} from './biconomyForwardHelpers.js';

let contractAddress = "0x04CB36Cdcd6935B030199ca4aAE67896575b90d0";
const app_id = "33cd52a9-bcb4-47c0-b2ea-432759d958d8";
const api_key = "HziWYKHVP.429840c1-257c-4d41-aa7d-329202d56f63";
let mintContractAddress = "0x9A875842235A33858dee0f03c68c49b4a94FADf4";

document.getElementById('connectWallet').addEventListener('click', async() => {
    start();
})

abi = [
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
                "internalType": "uint256",
                "name": "_token",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "_payoutValue",
                "type": "uint256"
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

const start = async() => {
    await window.ethereum.enable();
    // const biconomy = new Biconomy.Biconomy(window.ethereum, {
    //     apiKey: api_key,
    //     debug: true,
    //     contractAddresses: [contractAddress], 
    // });

    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
        abi,
        contractAddress
    );

    accounts = await walletWeb3.eth.getAccounts();
    console.log(accounts[0]);
    let userAddress =  accounts[0];
    let networkId = await walletWeb3.eth.net.getId();

    const txValue = await web3.utils.toWei('1', 'ether');
    let functionSignature = contract.methods.publishShares("Arishmit", "Media", 1000, txValue).encodeABI();

    console.log(functionSignature)

    const trustedForwarder = "0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b";
    let txGas = await web3.eth.estimateGas({
        from: trustedForwarder, 
        data: functionSignature,
        to: contractAddress
    }); 

    let forwarder = await getBiconomyForwarderConfig(networkId);
    console.log(forwarder);
    let forwarderContract = new walletWeb3.eth.Contract(
        forwarder.abi,
        forwarder.address
    );

    const batchNonce = await forwarderContract.methods.getNonce(accounts[0],10).call();
    const gasLimitNum = Number(txGas);
    const to = contractAddress;
    const batchId = 10;

    const request = await buildForwardTxRequest({account:userAddress,to,gasLimitNum,batchId,batchNonce,data:functionSignature});
    console.log(request)

    const network = await walletWeb3.eth.net.getId();
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
}
  

