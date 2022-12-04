const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4RWIxQzcwYTZDMzVBOEIyZDY1NWQ0RjI3ODdmRmQwNjE5QjU4NjciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MDEwNDM0ODg5MywibmFtZSI6IkV0aEluZGlhIn0.amblZjdnAok5oCIbd7Zi_SDKMK47dHmC9R8EnClvv2w'
async function storeNFT(imagePath, genre, fundUse, equity, royalties, nftcount) {
    var bodyFormData = new FormData();
    bodyFormData.append('file', imagePath);
    bodyFormData.append('meta', {
      genre: genre, 
      fundUse: fundUse, 
      equity: equity, 
      royalties: royalties, 
      nftcount: nftcount,  
    })
    const result = await axios.post('https://api.nft.storage/store',
    {
      data: bodyFormData
    },
    {
      headers: {
        'Authorization': `Bearer ${NFT_STORAGE_KEY}`,
        'Content-Type': `multipart/form-data`,
      }
    })
    return result;
}

async function main(filePath, genre, fundUse, equity, royalties, nftcount) {
    const result = await storeNFT(filePath, genre, fundUse, equity, royalties, nftcount);
    console.log(result)
}

document.getElementById('submit_nft').addEventListener('click', async() => {
  console.log('clicked');
  let filePath = document.getElementById('upload_file').files[0];
  console.log(filePath);
  const fileInput = document.getElementById('upload_file');
  fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];
    console.log(selectedFile);
  }
  let genre = document.getElementsByClassName('active');
  console.log(genre.innerText)
  let fundUse = document.getElementById('item_title').value;
  let equity = document.getElementById('item_royalties').value;
  let royalties = document.getElementById('item_royalties').value;
  let nftcount = document.getElementById('item_count').value;
  console.log(genre, fundUse, equity);
  await main(filePath, genre, fundUse, equity, royalties, nftcount);
});
