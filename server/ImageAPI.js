const express = require("express");
const axios = require("axios");
const app = express("maxHttpHeaderSize", 16000);
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const sharp = require("sharp")
//import { Configuration, OpenAIApi } from "openai";

const key = "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";
const configuration = new Configuration({
  apiKey: key,
});

const openai = new OpenAIApi(configuration);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

function convertByteArrayToPNG(byteArray) {
  // Create a Uint8Array from the byte array
  const uint8Array = new Uint8Array(byteArray);
  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array], { type: "image/png" });
  // Create a File from the Blob
  const file = new File([blob], "image.png", { type: "image/png" });

  return file;
}

function readImageAsBytes(url) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      return blob;
    });
}
async function convertToSquarePNG(url) {
    
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
    
        // Resize the image
        const resizedImage = await sharp(response.data)
          .resize(512, 512)
          .png()
          .toFile("C:/Users/Administrator/Dropbox/Source/leisurelifevacations2/server/file.png");
    
       return resizedImage;
      } catch (error) {
        console.error('Error fetching or processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
      }
  }

async function getImageBytes(imageUrl) {
  let result = [];
  await readImageAsBytes(imageUrl)
    .then((bytes) => {
      console.log("Image bytes:", bytes);
      result = bytes;
      // Do something with the image bytes
    })
    .catch((error) => {
      console.error("Error reading image:", error);
    });
  return result;
}



// app.post("/modifyImage", async (req, res) => {
//     let result = {}
//   try {
//     const imageUrl = req.body.data; // Get the image URL from the query parameter
//     console.log(imageUrl);
//     const img = await convertToSquarePNG(imageUrl);
    
//     console.log(img);
//     const newPhoto = await openai.createImageVariation(
//         fs.createReadStream("C:/Users/Administrator/Dropbox/Source/leisurelifevacations2/server/file.png"),
//         1,
//         "512x512",
//         "url").then( (data) => {
//             console.log("Returned Data!!",data)
//             result = data
//         })
    
        
//     res.send(result);
//   } catch (error) {}
// });
app.post("/createImage", async (req, res) => {
    let result = {}
  try {
    // const imageUrl = req.body.data; // Get the image URL from the query parameter
    // console.log(imageUrl);
    // const img = await convertToSquarePNG(imageUrl);
    
    // console.log(img);
    const response = await openai.createImage({
        prompt: req.body.prompt,
        n: 1,
        size: "1024x1024",
      });
     const image_url = response.data.data[0].url;
    console.log(image_url)
        
    res.send(image_url);
  } catch (error) {}
});
// Enable CORS for all routes
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));
//app.use(cors());

// Rest of your server configuration

app.listen(3001, () => {
  {
    console.log("Server listening on port 3001");
  }
});
