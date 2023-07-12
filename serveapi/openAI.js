import OpenAI from "openai-api";
import { Configuration, OpenAIApi } from "openai";
import { useState, useRef } from "react";
import axios from "axios";
import { convertToSquarePNG, readImageAsBytes, resizeImageToSquare } from "../ImageReader";

const key = "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";
const key2 = "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";

const configuration = new Configuration({
  apiKey: key,
});

const openai = new OpenAIApi(configuration);

export async function davinci(prompt1 = "say hello") {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt1,
    max_tokens: 500,
    temperature: 0.9,
  });
  const result = response.data.choices[0].text;
  console.log(result);
  return result;
  //console.log(process.env.REACT_APP_OPENAI_API_KEY)
}



const cleanYouTubeTranscript = (text) => {
  // Regular expression to match timestamps in the format "mm:ss"
  var timestampRegex = /\d+:\d+/g;
  // Replace all timestamps with a dash
  const replacedText = String(text).replace(timestampRegex, "-");
  //console.log(replacedText)
  return replacedText;
};

export async function generatePostBody(cruiseInfo) {
  //console.log(cruiseInfo)
  //openai.listModels();
  //return
  const cleanText = cleanYouTubeTranscript(cruiseInfo);
  const prompt = cruisePost(cleanText);
  console.log("Here is the prompt", prompt);
  return davinci(prompt);
}

export async function gpt35Chat(prompt = "Who was the first president") {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 500,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  });
  const result = completion.data.choices[0].message;
  return result;
}
export function modifyPhoto(imageURL){
    let newPhoto = ""
  resizeImageToSquare(imageURL, 300, (result) => {
//     console.log(result)
    const squarePNG = convertToSquarePNG(result);
    //const squareBlob = getImageThroughProxy(imageURL)
    console.log(squarePNG)
   //newPhoto = openai.createImageVariation(squarePNG,1,"512x512","url")

 })
 return newPhoto;
}

async function getImageThroughProxy(imageUrl){
  console.log(imageUrl)
  
try{
  
    const response = await axios.get('http://localhost:3001/image-proxy', {
        params: {
          url: imageUrl, // Pass the original image URL as a query parameter
        },
        responseType: 'blob',
      });
      const blobUrl = URL.createObjectURL(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
}
export async function getImageBytes(imageUrl) {
  let result = []
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
export function generateImage(img){
  const newPhoto = openai.createImageVariation(img,1,"512x512","url")
}
export function convertByteArrayToPNG(byteArray) {
  // Create a Uint8Array from the byte array
  const uint8Array = new Uint8Array(byteArray);

// Create a Blob from the Uint8Array
const blob = new Blob([uint8Array], { type: 'image/png' });

// Create a File from the Blob
const file = new File([blob], 'image.png', { type: 'image/png' });
// const newPhoto = openai.createImageVariation(file,1,"512x512","url")
// return newPhoto;
  // Create a Blob from the Uint8Array
 // const blob = new Blob([uint8Array], { type: 'image/png' });

  
  // Create a URL for the blob
  //const blobUrl = URL.createObjectURL(blob);

  return file;
}

// export function resizeImage(inputFile, size = 900) {
//   let image = new Image()
  
// //   const squareSize = size; // The desired size of the square image
// //   inputFile.addEventListener("change", function (event) {
//     // const file = event.target.files[0];
//     resizeImageToSquare(file, squareSize, function (resizedImage) {
//       // Handle the resized image, e.g., upload it to a server
//       //console.log(resizedImage);
//     //}
//     //);
//   });
// }

//PROMPTS
let test = "say this is a test.";

// Cruise Post Data
const cruisePost = (info) => {
  return `
You are an AI travel specialist named "Cruise Freak". You are in constant search of great deals and experiences at sea.
Generate a paragraph between 50 and 75 words using the following transcript exploring why this cruise would be a memorable experience for anybody needing a fabulous vacation.

Transcript:
"""${info}"""


`;
};

// 1:11
// starting off with some pros I'm going to give a pro and then Laura will give us a pro as well I'm going to start off with
// 1:17
// the size of the ship there is lots to do various different activities whether it
// 1:23
// be for kids adults they've got it jam-packed on here the water slides
// 1:28
// pools normal slides the wave machine everything even down to the size of the
// 1:34
// spa is across two decks it's huge and that does tie in with the size of the ship you have got a lot to do a lot to
// 1:41
// keep you occupied various different restaurants to eat in as well that will be one of my other Pros your next Pro
// 1:47
// lore the size of this bedroom and the size of the bathroom we went on our first cruise with the Disney cruise and
// 1:54
// I walked into the bathroom and I was like I can't do nothing in here we ended up getting a spa package to get me
// 2:00
// showers in the spa because it was just so small but this bathroom's huge and you can have the
// 2:06
// door open and look out to see you can even do that and it's good you've got a massive couch you've got a table to do
// 2:12
// your makeup you've got plenty of wardrobe space the beds what size is it
// 2:17
// a king a Super King huge everything Master TV so it's a really nice place to
// 2:23
// just sit and chill in your room if you just need a bit of peace and quiet and just need to be on your own for a bit
// 2:28
// it's it's a great space it's modern as well you've got all your little USBS buying your bedside everything has a
// 2:35
// nice clean Sleek finish to it everything is brand new at the moment on this ship and I loved the color scheme of the room
// 2:40
// as well while we're on the topic of the rooms we've got a standard balcony Sea
// 2:46
// View room bear in mind there are two different balconies you can have a sea view on and you can have a Central Park
// 2:51
// if you want the CV one is my all preferred we love looking out at Sea yeah but I'll even love the color of the
// 2:57
// carpets with the blue throwing flowing through everything tied in very nicely and yeah I do think it's a good size for
// 3:03
// standard room it is a good good size very good size yeah as the next Pro I'm going to give is the
// 3:10
// amount of restaurants there are that are on board so you've got the likes of chopped grill which was meant to be
// 3:16
// absolutely fantastic we couldn't even get in there with a reservation you've got Johnny Rockets Burgers you've got
// 3:22
// Playmakers which do fantastic wings so many different options a lot of them are
// 3:28
// an up charge but you have got different options to have if you do get a bit fed
// 3:33
// up with the main dining room or the buffet or Windjammer you can go and pay for some other food and mix it up and
// 3:39
// get a bit of different quality as well yeah that was nice a pro for me was
// 3:45
// we've been on cruises where you could not get saved no matter how hard you tried yeah we've been on cruise where
// 3:51
// we've had the drinks packaged and it's like why have I got it because you can't even get saved this one the bars are
// 3:57
// fully stocked with enough people you never wait more than five minutes you've got people coming around to ask if you
// 4:03
// want drinks really easy to do so you never never without a drink when you are
// 4:08
// on drinks package or you're paying for your drinks so I've been buying like one cocktail a day yeah whether it's been in
// 4:14
// a saloon by the pool whatever and I've been getting just that one and it's never been hard to get so that's really
// 4:19
// good plus you can just get whatever you want and even a Wind Jammer they're coming around with them the free Waters
// 4:25
// and the free punch through punches seeing if you want any any so that's really good you're never ever without
// 4:31
// yeah the staff have been on the ball that brings us on to my next Pro as well my next plus and that is the solarium
// 4:38
// itself I really did enjoy that area it was a nice place to chill we found ourselves in there quite a lot I sat and
// 4:45
// did a lot of editing in there I loved the views out to the ocean the different style some beds you could have how
// 4:51
// relaxed the atmosphere was the there was music on but it was quiet and it was more like spa music so I really did like
// 4:59
// that Solarium I even enjoyed the solarium restaurant as well for the breakfast yeah we did enjoy that didn't
// 5:05
// we yeah that was a big plus for me we're gonna end up leading on to of the slight negatives now there is a few of them
// 5:12
// believe it or not with the size of the ship and how good of a time we've had there was a few things that I would watch out for and a few things to bear
// 5:18
// in mind first one for me is with the food although it was good we did find on this
// 5:25
// ship particularly compared to the one we did on Independence of the Seas we found
// 5:30
// the food variation wasn't very big this time it was a lot of the same stuff
// 5:36
// especially the desserts were quite underwhelming there wasn't much variation it was the same chocolate
// 5:43
// slice cake every time on the Windjammer the same cookies there wasn't a huge
// 5:48
// variation and I think the reason for that on this ship in particular is because they've got so many different
// 5:54
// restaurants that everyone wants to eat in chops Grill Playmakers so I think they keep the buffet quite standard
// 6:00
// because they know people are going to all these different restaurants these upcharge restaurants which works well for them as well of course people want
// 6:07
// to go and Peg and eat somewhere different but I would bear that in mind that when you pay to come on you are
// 6:12
// probably gonna want to and be tempted in or you're probably going to want to book some of these other restaurants we
// 6:18
// regret not getting in earlier and booking more in advance for chops Grill and a couple of the was because we did
// 6:24
// get a little bit fed up with the buffet was a little bit samey this this Cruise it was yeah it was especially especially
// 6:32
// for us we're not having we don't need that much variation food anyways maybe allergies and yeah there wasn't much
// 6:39
// chicken yeah until the sort of last day today there was a bit more chicken there was some skewers and chicken curries but
// 6:45
// the what I didn't see the the same variation that we saw on um Independence of the Seas on our last
// 6:51
// cruise but I do think that's down to the other restaurant so I would bear that in mind that when you book when you pay
// 6:57
// that price I would personally try and see it as you've booked a hotel you're
// 7:02
// going to be paying for some food on top you're going to be paying for drinks on top take that cruise price that you see
// 7:08
// on the website and I personally just try and see that as you've booked a hotel you then need
// 7:14
// to account for some money for food account for some money for the drinks even if it's soft drinks the only drinks
// 7:21
// you're gonna get are your free water your free juices uh any of the Cokes and things you need to pay for so that's how
// 7:27
// I would probably try and treat it in the future and make sure you get in there and Reserve at those restaurants early
// 7:33
// on yeah because they were all booked up when we got on board and now I can I can see why everyone's come on board and
// 7:40
// they they sort of see the buffet as a bit of a snack filler and their main thing is going out in the oven evening
// 7:45
// into Giovanni's Italian uh the one in Central Park they treat them as the
// 7:51
// dinners rarely yeah or you've got the main dining hall but we didn't really find ourselves in there very much no we
// 7:57
// didn't know no we didn't really find ourselves tempted too much by the menu but that's us personally you might love
// 8:03
// everything that's on the Windjammer you might love everything that's in the main restaurant that you get included but for
// 8:09
// me that's how I saw I saw as more of a treat it as you've booked your hotel there's snacks there if you want them
// 8:15
// and you know burgers and stuff on the Windjammer but rarely if you want to eat nice you want that fine dining you're
// 8:21
// going to pay to go in those upcharge restaurants definitely yeah"""
