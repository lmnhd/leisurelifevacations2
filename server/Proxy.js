const express = require("express");
const axios = require("axios");
const app = express("maxHttpHeaderSize", 16000);
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
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
function convertToSquarePNG(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = function () {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const size = Math.min(image.width, image.height);
      canvas.width = size;
      canvas.height = size;

      context.drawImage(image, 0, 0, size, size);

      canvas.toBlob(function (blob) {
        resolve(blob);
      }, "image/png");
    };
  });
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

app.get("/image-proxy", async (req, res) => {
  try {
    const imageUrl = req.query.url; // Get the image URL from the query parameter
    console.log(imageUrl);

    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageData = Buffer.from(imageResponse.data, "binary");

    res.set("Content-Type", "image/jpeg"); // Adjust the Content-Type based on the image format
    res.send(imageData);
  } catch (error) {
    console.error("Error proxying image:", error);
    res.sendStatus(500);
  }
});
app.get("/check", async (req, res) => {
  console.log("working!!!");
  res.send("Hello");
});

app.post("/modifyImage", async (req, res) => {
  try {
    const imageUrl = req.body.data; // Get the image URL from the query parameter
    console.log(imageUrl);
    //load image from url
    const blob = getImageBytes(imageUrl);
    //const png = convertByteArrayToPNG(bytes);
    console.log(blob);
    //const newPhoto = openai.createImageVariation(squarePNG,1,"512x512","url")
    res.send("done");
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
