const { onRequest } = require("firebase-functions/v2/https");
const { onCall } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
import { Configuration, OpenAIApi } from "openai";

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const client = axios.create({
  headers: {
    Authorization: "Bearer " + apiKey
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest({cors:false},(request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// exports.checkCall = onCall((data, context) => {
//   return `hello, ninjas`;
// });

// exports.getAIMessage = onCall((data, context) => {
// //   const completion = await openai.createCompletion({
// //     model: "text-davinci-003",
// //     prompt: data,
// //     temperature: 0.6,
// //   });
// //   const result = completion.data;
//   console.log(data)
//   return data;
// });
