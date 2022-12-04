const contractAddress = "0x811737663d9ed628ddc71418c16dcc87d5f3d450";
const addr = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada"
let price;
const app_id = "e22ca4b1-ed92-4cbb-8f38-a62f30f0045e";
const api_key = "HziWYKHVP.429840c1-257c-4d41-aa7d-329202d56f63";

import {
    helperAttributes,
    getDomainSeperator,
    getDataToSignForPersonalSign,
    getDataToSignForEIP712,
    buildForwardTxRequest,
    getBiconomyForwarderConfig
  } from './biconomyForwardHelpers.js';

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

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);

async function load() {
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

    const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)
    const decimals = await priceFeed.methods.decimals().call();
    console.log(decimals);
    price = await priceFeed.methods.latestRoundData().call();
    console.log(price['answer']);
    price = price['answer'] * Math.pow(10, -decimals);
    console.log(price);

    //const response = await fetch('https://api.apilayer.com/exchangerates_data/live?base=USD&symbols=EUR,GBP', {
    const creators = await contractInstance.methods.getAllCreators().call();
    console.log(creators);
    let shareData = await contractInstance.methods.getCreatorShare(creators[0]).call();
    console.log(shareData);
    document.getElementById('creator_image').setAttribute('src', shareData['uri']);
    document.getElementById('name').innerText = shareData['name'];
    document.getElementById('creator').innerText = shareData['name'];
    document.getElementById('available').innerText = (shareData['_totalAmount'] - shareData['_bought']) + " Available" ;
    document.getElementById('equity').innerText = "Equity per NFT: "+(shareData['equity'] / shareData['_totalAmount']);


    let pricePerNFT = shareData['_price'] * Math.pow(10, -18);
    pricePerNFT = pricePerNFT * price;
    await fetch("https://api.apilayer.com/fixer/convert?to=INR&from=USD&amount="+pricePerNFT, {
        method: 'GET', // or 'PUT'
        headers: {
            'apikey': '2230qaQHz0OY06RmsAjC03iJjdiMtY75',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data['result']);
        price = data['result'].toFixed(2);
        document.getElementById('price').innerText = data['result'].toFixed(2) + " INR";
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

load();

document.getElementById('buyBtn').addEventListener('click', async() => {
    // await fetch('https://api.razorpay.com/v1/orders', {
    //     method:'POST', 
    //     headers: {'Authorization': 'Basic ' + btoa('rzp_test_ZsOauyCO54085l:Ihly4FAMAqAUdkU51YWl5pbC')},
    //     body: {
    //         "amount": price,
    //         "currency": "INR",
    //         "receipt": Date.now()+"creator",
    //     }
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data);
    // })
    // .catch((error) => console.log);
    var options = {
        "key": "rzp_test_ZsOauyCO54085l", 
        "amount": document.getElementById('buy_now_qty').value * price * 100, 
        "currency": "INR",
        "order_id": "order_Knfpn2n97itJRG", 
        "handler": async function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)

            const web3 = new Web3(window.ethereum);
            const contractInstance = new web3.eth.Contract(
                abi,
                contractAddress
            );

            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            let userAddress =  accounts[0];
            let networkId = await web3.eth.net.getId();

            const txValue = await web3.utils.toWei('1', 'ether');
            let functionSignature = contractInstance.methods.invest(accounts[0], id, 1).encodeABI();

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
        },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
})