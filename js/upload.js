import mime from "mime";
import fs from 'fs';
import path from 'path';
const axios = require('axios');

const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4RWIxQzcwYTZDMzVBOEIyZDY1NWQ0RjI3ODdmRmQwNjE5QjU4NjciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MDEwNDM0ODg5MywibmFtZSI6IkV0aEluZGlhIn0.amblZjdnAok5oCIbd7Zi_SDKMK47dHmC9R8EnClvv2w'

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
async function storeNFT(imagePath, genre, fundUse, equity, royalties, nftcount) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    const result = await axios.post('https://api.nft.storage/store',
    {
      file: image,
      meta: {
        genre: genre, 
        fundUse: fundUse, 
        equity: equity, 
        royalties: royalties, 
        nftcount: nftcount  
      }
    },
    {
      authorization: {
        'Authorization': `Bearer ${NFT_STORAGE_KEY}`
      }
    })
    return result;
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}


/**
 * The main entry point for the script that checks the command line arguments and
 * calls storeNFT.
 * 
 * To simplify the example, we don't do any fancy command line parsing. Just three
 * positional arguments for imagePath, name, and description
 */
async function main(filePath, genre, fundUse, equity, royalties, nftcount) {
    const result = await storeNFT(filePath, genre, fundUse, equity, royalties, nftcount);
    console.log(result)
}

document.getElementById('submit_nft').addEventListener('click', async() => {
  console.log('clicked');
  let filePath = document.getElementById('upload_file').value;
  let genre = document.getElementById('item_collection').value;
  let fundUse = document.getElementById('item_title').value;
  let equity = document.getElementById('item_royalties').value;
  let royalties = document.getElementById('item_royalties').value;
  let nftcount = document.getElementById('item_count').value;
  await main(filePath, genre, fundUse, equity, royalties, nftcount);
});

// Don't forget to actually call the main function!
// We can't `await` things at the top level, so this adds
// a .catch() to grab any errors and print them to the console.
// main()
//   .catch(err => {
//       console.error(err)
//       process.exit(1)
//   })