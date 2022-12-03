import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import dotenv from 'dotenv';
dotenv.config(); 

const Pkey = `0x${process.env.PK}`;
const signer = new ethers.Wallet(Pkey);

const sendNotification = async(type, title, body, cta, recipient) => {
  try {
    let notificationText = {
      signer,
      type: type, 
      identityType: 2, 
      notification: {
        title: title,
        body: body
      },
      payload: {
        title: title,
        body: body,
        cta: cta,
        img: ''
      },
      recipients: recipient,
      channel: 'eip155:5:0xFaadD7A7091bd909D90893317a9A94ae7B32fA18', 
      env: 'staging'
    };
    
    const apiResponse = await PushAPI.payloads.sendNotification(notificationText);
    
    console.log('API repsonse: ', apiResponse);
  } catch (err) {
    console.error('Error: ', err);
  }
}

/// NFT published
// NFT bought
//payouts released