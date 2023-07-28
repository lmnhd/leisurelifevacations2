import { useState } from "react";
import {
  aiCheck,
  gpt35Chat,
  generatePostBody,
  getImageBytes,
  createOriginalImage,
  convertByteArrayToPNG,
  generateExtraInfo,
  generateImage,
  assistantPrompt,

  davinci,
  featuresPrompt,
} from "./api/openAI";
import { 
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography } from "@material-tailwind/react";
import axios from "axios";

export function AIPlayground() {
  const [aiReply, setAIReply] = useState("");
  const [info, setInfo] = useState("");
  const [sectionsInfo, setSectionInfo] = useState("");
  const [extraInfoInfo, setExtraInfo] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [cruiseLine, setCruiseLine] = useState("");
  const [shipName, setShipName] = useState("");
  const [destination, setDestination] = useState("");
  const [image1, setImage1] = useState(
    "https://images.unsplash.com/photo-1583157048761-ac1dba033233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
  );
  const [open, setOpen] = useState(1);
  
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  
  const testAI = () => {
    console.log("testing openai")
    aiCheck();

  }
  const genericAIMessage = (prompt) => {
    const message = assistantPrompt(prompt);
    const result = davinci(message,0.1,cruiseLine,shipName, destination);
    console.log(result)


  }
  const getMessage = async () => {
    const reply = await gpt35Chat();
    //setAIReply(reply);
    console.log(reply);
    setAIReply(reply.content);
  };
  const getSections = async () => {
    const result = davinci(
      featuresPrompt(sectionsInfo),
      0.2,
      cruiseLine,
      shipName,
      destination
    );
    console.log(result);
  };
  const getExtras = async () => {
    const result = generateExtraInfo(
      extraInfoInfo,
      cruiseLine,
      shipName,
      destination
    );
    console.log(result);
  };

  const handleClick = async () => {
    const result = await generatePostBody(info,cruiseLine,shipName,destination);
    setAIReply(result);
  };
  const handleImageUrlChange = (event) => {
    setImage1(event.target.value);
  };
  const createPhoto = () => {
    axios
      .post("http://localhost:3001/createImage", {
        method: "POST",
        data: image1,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  const createImage = async () => {
    const img = await createOriginalImage(imagePrompt);
    setMainImageUrl(img);
  };
  const getImage1Bytes = async () => {
    //axios.get('/serverapi/generate').then(console.log('worked!!!'))

    await getImageBytes(image1).then((bytes) => {
      console.log(bytes);
      const img = convertByteArrayToPNG(bytes);
      console.log(img);

      axios
        .post("http://localhost:3001/modifyImage", {
          method: "POST",
          data: img,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        });
    });
  };

  // axios.get('http://localhost:3001/modifyImage',
  // {
  //   method: "POST",
  //   headers: {
  //      "Content-Type": "application/json",
  //      "image":img
  //   }

  // ).then((res) => {console.log(res)})

  //   //const aiimage = generateImage(img).
  //   //setImage1(img)
  //   //const newPhoto = openai.createImageVariation(img,1,"512x512","url")
  // })
  //console.log(imageBytes)
  //const photo = modifyPhoto(image1)

  //setImage1(photo)

  return (
    <>
      <Typography
        className="text-center whitespace-pre-line border-black border-b-3"
        variant="h3"
      >
        AI Content Generator
        
      </Typography>
      {/* <button
      className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
        
        value="check"
        onClick={testAI}
        >CheckAI</button> */}

<Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Ship Info
        </AccordionHeader>
        <AccordionBody>
        <div className="flex flex-col p-4 bg-gray-100 flex-nowrap">
        <div className="flex flex-col flex-wrap self-center justify-center w-3/4 gap-4 p-6 align-middle bg-blue-gray-50">
          <input
            type="text"
            value={cruiseLine}
            onChange={(val) => {
              setCruiseLine(val.target.value);
            }}
            placeholder="Cruise line"
            className="p-4 border-black rounded-md bg-blue-gray-100 m-b3 border-spacing-3"
          />
          <input
            type="text"
            value={shipName}
            onChange={(val) => {
              setShipName(val.target.value);
            }}
            placeholder="Cruise Ship Name"
            className="p-4 border-black rounded-md bg-blue-gray-100 m-b3 border-spacing-3"
          />
          <input
            type="text"
            value={destination}
            onChange={(val) => {
              setDestination(val.target.value);
            }}
            placeholder="Destination"
            className="p-4 border-black rounded-md bg-blue-gray-100 m-b3 border-spacing-3"
          />
        </div>
        
      </div>
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
        Post Body Generator
        </AccordionHeader>
        <AccordionBody>
        <div className="flex flex-col flex-wrap p-4 bg-gray-100">
        <Typography
            variant="h4"
            className="text-center whitespace-pre-line border-black border-b-3"
          >
            Post Body Generator
          </Typography>
          <textarea
            className="border-black rounded-md bg-blue-gray-100 m-b3"
            placeholder="Enter information about a cruise here..."
            value={info}
            onChange={(val) => setInfo(val.target.value)}
          />
          {/* //Send Button */}
          {destination != "" && shipName != "" ? (
            <input
              className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
              type="button"
              value="Send"
              onClick={handleClick}
            />
          ) : (
            <h3 className="text-black bg-red-400 border-b-2 border-white">
              !!Set Cruise Name and Destination First!!
            </h3>
          )}
          {aiReply != "" && (
            <p className="p-4 mt-3 font-serif font-bold whitespace-pre-line border-white bg-blue-gray-100 min-h-fit">
              {aiReply}
            </p>
          )}
         
      </div>
        </AccordionBody>
      </Accordion>

      
 {/* Highlight Sections  */}
 <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
        Sections Generator
        </AccordionHeader>
        <AccordionBody>
        <div className="flex flex-col flex-wrap p-4 bg-gray-100">
        <Typography
          variant="h4"
          className="text-center whitespace-pre-line border-black border-b-3"
        >
          Sections Generator
        </Typography>
        <textarea
          placeholder="Enter information about the special features of this cruise i.e.: special entertainment, onboard credits, exotic destinations, etc."
          className="border-black rounded-md bg-blue-gray-100 m-b3"
          onChange={(val) => {
            setSectionInfo(val.target.value);
          }}
        ></textarea>
        {destination != "" && shipName != "" ? (
          <input
            className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
            type="button"
            value="Get Sections"
            onClick={getSections}
          />
        ) : (
          <h3 className="text-black bg-red-400 border-b-2 border-white">
            !!Set Cruise Name and Destination First!!
          </h3>
        )}
      </div>
        </AccordionBody>
      </Accordion>
      
          {/* EXTRA INFO SECTION */}
          <Accordion open={open === 4}>
        <AccordionHeader onClick={() => handleOpen(4)}>
        Extras Generator
        </AccordionHeader>
        <AccordionBody>
        <div className="flex flex-col p-4 bg-gray-100 flex-nowrap">
      <Typography
          variant="h4"
          className="text-center whitespace-pre-line border-black border-b-3"
        >
          Extras Generator
        </Typography>
        <textarea
          placeholder="Enter extra information about the cruise like deals, prices, packages, etc."
          className="border-black rounded-md bg-blue-gray-100 m-b3"
          onChange={(val) => {
            setExtraInfo(val.target.value);
          }}
        ></textarea>
        {destination != "" && shipName != "" ? (
          <input
            className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
            type="button"
            value="Get Extra Info"
            onClick={getExtras}
          />
        ) : (
          <h3 className="text-black bg-red-400 border-b-2 border-white">
            !!Set Cruise Name and Destination First!!
          </h3>
        )}
      </div>
        </AccordionBody>
      </Accordion>
      
      {/* Image 1 uploader */}
      {/* <div className="flex flex-col items-center w-1/2 gap-3 p-4 m-5">
          <img placeholder="" src={image1} />

          <input
            className="w-full h-10 pl-3 pr-3 text-white bg-blue-gray-500"
            type="text"
            value={image1}
            placeholder="Enter Image URL"
            onChange={handleImageUrlChange}
          />

          <button onClick={modifyPhoto}>process image</button>
        </div> */}

      {/* Image  prompter */}
      <Accordion open={open === 5}>
        <AccordionHeader onClick={() => handleOpen(5)}>
        Create Photograph
        </AccordionHeader>
        <AccordionBody>
        <div className="flex flex-col items-center justify-center gap-3 p-4 m-5">
        {mainImageUrl != "" && (
          <img className="" placeholder="" src={mainImageUrl} />
        )}
        <Typography as="h4">Create Photograph</Typography>
        <input
          className="w-full h-10 pl-3 pr-3 text-white bg-blue-gray-500"
          type="text"
          value={imagePrompt}
          placeholder="A Gold Plated Cruise Ship Sailing at Sunset --Photo Realistic"
          onChange={(val) => {
            setImagePrompt(val.target.value);
          }}
        />

        <button
          className="p-4 border-separate rounded-lg bg-blue-gray-400 text-blue-gray-800 hover:text-green-800"
          onClick={createImage}
        >
          Generate Image
        </button>
      </div>
        </AccordionBody>
      </Accordion>
      

      
    </>
  );
}
