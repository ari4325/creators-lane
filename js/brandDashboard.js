const contractAddress = "0x811737663d9ed628ddc71418c16dcc87d5f3d450";
const addr = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada"

document.getElementById('connectWallet').addEventListener('click', async() => {
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

    const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)
    const decimals = await priceFeed.methods.decimals().call();
    console.log(decimals);
    let price = await priceFeed.methods.latestRoundData().call();
    console.log(price['answer']);
    price = price['answer'] * Math.pow(10, -decimals);
    console.log(price);

    //const response = await fetch('https://api.apilayer.com/exchangerates_data/live?base=USD&symbols=EUR,GBP', {

    const creators = await contractInstance.methods.getAllCreators().call();
    console.log(creators);

    var l = creators.length;
    

    for (var i = 0; i < l; i++) {
        console.log(creators[i]);
        let shareData = await contractInstance.methods.getCreatorShare(creators[i]).call();
        console.log(shareData);

        let pricePerNFT = shareData['_price'] * Math.pow(10, -18);
        pricePerNFT = pricePerNFT * price;

        const believers = await contractInstance.methods.getTokenOwners(shareData['_tokenId']).call();

        await fetch("https://api.apilayer.com/fixer/convert?to=INR&from=USD&amount="+pricePerNFT, {
            method: 'GET', // or 'PUT'
            headers: {
                'apikey': '2230qaQHz0OY06RmsAjC03iJjdiMtY75',
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data['result']);
            document.getElementById('creatorList').innerHTML += `<tr>
                    <th>
                <div class="coll_list_pp">
                    <img class="lazy" src="${shareData['uri']}" alt="">
                    <i class="fa fa-check"></i>
                </div>  
                ${shareData['name']}</th>
                <td>Education</td>
                <td class="d-plus">${(shareData['_fundsRaised'] * Math.pow(10, -18) * data['result']).toFixed(2)} INR</td>
                <td class="d-plus">${believers.length}</td>
                <td><a href="#" class="btn-main btn-lg" data-bs-toggle="modal" data-bs-target="#buy_now">
                Pay
                </a></td>
                </tr>`
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        //Do something
    }

    document.getElementById('payout').addEventListener('click', async() => {
        await contractInstance.methods.releasePayouts().send({ from: userAddress, to: contractAddress, value: await web3.utils.toWei(document.getElementById('buy_now_qty').value+"", "ether")})
        .on('receipt', function(receipt){
            console.log(receipt);
        })
        .on('error', function(error, receipt) {
            console.log('Error:', error, receipt);
        });
    })
}

start();