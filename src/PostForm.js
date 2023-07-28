import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState, useRef } from "react";
import { addPost as sendNow } from "./Firebase";
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
  postTitlePrompt,
  postBodyPrompt,
  postSummaryPrompt
} from "./api/openAI";
import OpenAI from "openai-api";
import { Configuration, OpenAIApi } from "openai";

export const PostFormData = {
  id:"",
  shipName:"",
  cruiseLine: "",
  destination: "",
  heading: "",
  summary: "",
  body: "",
  featureIMG: "",
  sections: [
    {
      type: "",
      details: "",
      img: "",
    },
  ],
  dates: [{ date: "11/09/2023", type: "start" }],
  extras: [
    {
      title: "Dining Promo",
      info: ["In room dining special for all suites 5 nights or more"],
    },
  ],
  tags: ["deal", "celebrity", "long", "90days"],
};
function PostForm({
  post,
  update,
  setPostState,
  updateExtras,
  updateDates,
  updateSections,
  updateCruiseLine,
  updateDestination,
  updateShipName
}) {
  //console.log(post)

  const [formState, setFormState] = useState(update ? post : PostFormData);

  const tagInputRef = useRef(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([...formState.tags]);
  const [dates, setDates] = useState([...formState.dates]);
  const [sections, setSections] = useState([...formState.sections]);
  const [extras, setExtras] = useState([...formState.extras]);
  const [open, setOpen] = useState(1);
  const [aiReply, setAIReply] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [info, setInfo] = useState("");
  const [cruiseLine, setCruiseLine] = useState(formState.cruiseLine);
  const [shipName, setShipName] = useState(formState.shipName);
  const [destination, setDestination] = useState(formState.destination);
  // const [infoLines, setInfoLines] = useState(["add info here"])
  //console.log(formState)
  const updatePostState = () => {
    // setFormState({...formState,dates:dates,sections:sections,extras:extras})
    setPostState(formState);
  };
  const addPost = () => {
    setFormState({
      ...formState,
      dates: dates,
      sections: sections,
      extras: extras,
      shipName: shipName,
      cruiseLine: cruiseLine,
      destination: destination
    });
    const finalPost = {...formState,
      dates: dates,
      sections: sections,
      extras: extras,
      shipName: shipName,
      cruiseLine: cruiseLine,
      destination: destination}
    //console.log(formState)
    
      sendNow(finalPost);
   
    //sendNow(formState)
  };

  // function addDate(){
  //   setDates(...dates, {date:"", type:""})
  // }
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleAIWrite = async (mode) => {
    let result = ""
    switch (mode) {
      
      case 'heading':
        console.log("heading");
       result = await davinci(
        postTitlePrompt(info,cruiseLine,shipName,destination),
        0.5,
        cruiseLine,
        shipName,
        destination
      );
      setFormState((formState) => ({
        ...formState,
        heading : result,
      }));
      if (update) {
        setPostState((formState) => ({
          ...formState,
          heading : result,
        }));
      }
      break;
      case "summary":
        console.log("summary");
       result = await davinci(
        postSummaryPrompt(info,cruiseLine,shipName,destination),
        0.9,
        cruiseLine,
        shipName,
        destination
      );
      setFormState((formState) => ({
        ...formState,
        summary : result,
      }));
      if (update) {
        setPostState((formState) => ({
          ...formState,
          summary : result,
        }));
      }
      break;
      case "body":
        console.log("body");
       result = await davinci(
        postBodyPrompt(info,cruiseLine,shipName,destination),
        0.9,
        cruiseLine,
        shipName,
        destination
      );
      setFormState((formState) => ({
        ...formState,
        body : result,
      }));
      if (update) {
        setPostState((formState) => ({
          ...formState,
          body : result,
        }));
      }
      break;
      default:
        break;
    }
    
  };

  const addDate = () => {
    setDates((dates) => [...dates, { date: "", type: "" }]);

    if (update) {
      updatePostState();
    }
  };
  const updateDate = (index, newDate) => {
    //console.log(newDate);
    const newDates = [...dates];
    newDates[index] = { date: newDate, type: dates[index].type };
    setDates(newDates);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })

    //console.log(newDates);

    if (update) {
      updateDates(newDates);
    }
  };
  const updateDateHeader = (index, header) => {
    console.log(header);
    const newDates = [...dates];
    newDates[index] = { date: dates[index].date, type: header };
    setDates(newDates);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    console.log(newDates);

    if (update) {
      updateDates(newDates);
    }
  };
  //SECTIONS
  const addSection = () => {
    setSections((sections) => [
      ...sections,
      { details: "", type: "", img: "" },
    ]);

    if (update) {
      updateSections((sections) => [
        ...sections,
        { details: "", type: "", img: "" },
      ]);
    }
  };

  const updateSectionDetails = (index, details) => {
    console.log(details);
    const newSections = [...sections];
    newSections[index] = {
      details: details,
      type: sections[index].type,
      img: sections[index].img,
    };
    setSections(newSections);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    //console.log(newSections);
    if (update) {
      updateSections(newSections);
    }
  };
  const updateSectionHeader = (index, header) => {
    //console.log(header);
    const newSections = [...sections];
    newSections[index] = {
      details: sections[index].details,
      type: header,
      img: sections[index].img,
    };
    setSections(newSections);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    //console.log(newSections);
    if (update) {
      updateSections(newSections);
    }
  };
  const updateSectionIMG = (index, img) => {
    console.log(img);
    const newSections = [...sections];
    newSections[index] = {
      details: sections[index].details,
      type: sections[index].type,
      img: img,
    };
    setSections(newSections);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    console.log(newSections);
    if (update) {
      updateSections(newSections);
    }
  };

  //ADD EXTRAS
  const addExtra = () => {
    setExtras((extras) => [...extras, { title: "", info: [""] }]);
    if (update) {
      updateExtras((extras) => [...extras, { title: "", info: [""] }]);
    }
  };

  const updateExtraInfo = (exIndex, inIndex, info) => {
    console.log(exIndex);

    const newExtras = [...extras];
    const newExtra = extras[exIndex];
    //return
    newExtra.info[inIndex] = info;
    newExtras[exIndex] = newExtra;
    setExtras([...newExtras]);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    if (update) {
      updateExtras([...newExtras]);
    }
    console.log(extras);
  };
  const updateExtrasHeader = (index, header) => {
    console.log(header);
    const newExtras = [...extras];
    newExtras[index] = { title: header, info: extras[index].info };
    setExtras(newExtras);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    console.log(extras);
    if (update) {
      updateExtras(newExtras);
    }
  };
  function addInfoLine(index) {
    var newExtras = extras;
    var newExtra = extras[index];
    const newInfo = [...newExtra.info, "add info here"];
    newExtra.info = newInfo;
    newExtras[index] = newExtra;
    setExtras([...newExtras]);

    if (update) {
      updateExtras([...newExtras]);
    }
    // setExtras((extras) => [...infoLines, "add info here"]);
  }
  // function renderInfos(){
  //   return infoLines.map( (line, index) => {
  //     return <Textarea
  //     label="info"
  //     key={index}
  //     id={"info-" + index}
  //     value={extra.info}
  //     onChange={(event) => {
  //       updateExtras(index, event.target.value);
  //     }}
  //   />
  //   })
  // }

  function checkDates() {
    console.log(dates);
  }
  function renderTags() {
    return formState.tags.map((tag, index) => {
      return (
        <Chip
          key={index}
          onClick={(event) => {
            removeTag(tag);
          }}
          color="red"
          value={tag}
        />
      );
    });
  }
  const removeTag = (tag) => {
    console.log(tag);
    const tags = formState.tags.filter((i) => i !== tag);
    console.log(tags);

    setFormState({ ...formState, tags });
  };
  const handleAddTag = () => {
    console.log(tagInput);
    const tags = [...formState.tags, tagInput];
    setFormState({ ...formState, tags: tags });
    setTagInput("");
    //tagInputRef.current.clear()
  };

  const handleTagUpdate = (tag) => {
    setTagInput(tag);
  };

  function renderSections() {
    return sections.map((section, index) => {
      return (
        <>
          <Input
            size="lg"
            label="sectionImage"
            key={index}
            value={section.img}
            onChange={(event) => {
              updateSectionIMG(index, event.target.value);
            }}
          />
          <Input
            size="md"
            label="sectionHeader"
            type="text"
            key={"sechead" + index}
            id={"sechead" + index}
            value={section.type}
            onChange={(event) => {
              updateSectionHeader(index, event.target.value);
            }}
          />
          <Textarea
            type="text"
            label="sectionDetails"
            value={section.details}
            rows="8"
            
            onChange={(event) => {
              updateSectionDetails(index, event.target.value);
            }}
          />
        </>
      );
    });
  }
  function renderExtras() {
    return extras.map((extra, index) => {
      return (
        <>
          <Input
            type="text"
            label="extraHeader"
            size="lg"
            value={extra.title}
            onChange={(event) => {
              updateExtrasHeader(index, event.target.value);
            }}
          />
          {extra.info.map((info, i) => {
            return (
              <Textarea
                label={"info " + extra.title + "-" + i}
                value={info}
                name={extra.title + "-" + i}
                onChange={(event) =>
                  updateExtraInfo(index, i, event.target.value)
                }
              />
            );
          })}
        </>
      );
    });
  }
  function renderDates() {
    return dates.map((date, index) => {
      return (
        <>
          <Input
            type="text"
            label="dateHeader"
            size="lg"
            value={date.type}
            onChange={(event) => {
              updateDateHeader(index, event.target.value);
            }}
          />
          <Input
            size="md"
            label="date"
            type="date"
            key={index}
            id={"date-" + index}
            value={date.date}
            onChange={(event) => {
              updateDate(index, event.target.value);
            }}
          />
        </>
      );
    });
  }
  const updateFormState = (event) => {
    const { name, value } = event.target;
    setFormState((formState) => ({
      ...formState,
      [name]: value,
    }));
    console.log(formState);

    //if(update){updatePostState()}
    if (update) {
      setPostState((formState) => ({
        ...formState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Card className="flex-wrap content-center " color="transparent">
        <Typography
          className="w-auto text-center"
          variant="h4"
          color="blue-gray"
        >
          {update ? "Update " : "Add "} Post
        </Typography>
        <Typography color="gray" className="w-auto mt-1 font-normal">
          Enter Post Information
        </Typography>
        <form className="max-w-screen-lg mt-8 mb-2 sm:w-96" onSubmit={addPost}>
          <Accordion open={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="text-sm">
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
                      if(update){updateCruiseLine(val.target.value)}
                    }}
                    placeholder="Cruise line"
                    className="p-4 border-black rounded-md bg-blue-gray-100 m-b3 border-spacing-3"
                  />
                  <input
                    type="text"
                    value={shipName}
                    onChange={(val) => {
                      setShipName(val.target.value);
                      if(update){updateShipName(val.target.value)}
                    }}
                    placeholder="Cruise Ship Name"
                    className="p-4 border-black rounded-md bg-blue-gray-100 m-b3 border-spacing-3"
                  />
                  <input
                    type="text"
                    value={destination}
                    onChange={(val) => {
                      setDestination(val.target.value);
                      if(update){updateDestination(val.target.value)}
                    }}
                    placeholder="Destination"
                    className="p-4 border-black rounded-md bg-blue-gray-100 m-b3 border-spacing-3"
                  />
                  <textarea
            className="border-black rounded-md bg-blue-gray-100 m-b3"
            placeholder="Enter information about a cruise here..."
            value={info}
            onChange={(val) => setInfo(val.target.value)}
          />
                </div>
              </div>
            </AccordionBody>
          </Accordion>

          <div className="flex flex-col gap-6 mb-4">
            <Accordion open={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="text-sm"
              >
                Generate Heading
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col flex-wrap p-4 bg-gray-100">
                  {/* //Send Button */}
                  {destination != "" && shipName != "" && info != "" ? (
                    <input
                      className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
                      type="button"
                      value="Generate AI response"
                      onClick={() => handleAIWrite("heading")}
                    />
                  ) : (
                    <h3 className="text-black bg-red-400 border-b-2 border-white">
                      !!Set Cruise Info First!!
                    </h3>
                  )}

                  {/* {aiReply != "" && (
            <p className="p-4 mt-3 font-serif font-bold whitespace-pre-line border-white bg-blue-gray-100 min-h-fit">
              {aiReply}
            </p>
          )} */}
                </div>
              </AccordionBody>
            </Accordion>
            <Input
              type="text"
              size="lg"
              label="heading"
              value={formState.heading}
              name="heading"
              onChange={updateFormState}
            />

            <Accordion open={open === 3}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="text-sm"
              >
                Generate Summary
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col flex-wrap p-4 bg-gray-100">
                  {/* //Send Button */}
                  {destination != "" && shipName != "" && info != "" ? (
                    <input
                      className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
                      type="button"
                      value="Generate AI response"
                      onClick={() => handleAIWrite("summary")}
                    />
                  ) : (
                    <h3 className="text-black bg-red-400 border-b-2 border-white">
                      !!Set Cruise Info First!!
                    </h3>
                  )}

                  {/* {aiReply != "" && (
            <p className="p-4 mt-3 font-serif font-bold whitespace-pre-line border-white bg-blue-gray-100 min-h-fit">
              {aiReply}
            </p>
          )} */}
                </div>
              </AccordionBody>
            </Accordion>
            <Textarea
              label="summary"
              value={formState.summary}
              name="summary"
              onChange={updateFormState}
            />
            <Accordion open={open === 4}>
              <AccordionHeader
                onClick={() => handleOpen(4)}
                className="text-sm"
              >
                Generate Body
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col flex-wrap p-4 bg-gray-100">
                  {/* //Send Button */}
                  {destination != "" && shipName != "" && info != "" ? (
                    <input
                      className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
                      type="button"
                      value="Generate AI response"
                      onClick={() => handleAIWrite("body")}
                    />
                  ) : (
                    <h3 className="text-black bg-red-400 border-b-2 border-white">
                      !!Set Cruise Info First!!
                    </h3>
                  )}

                  {/* {aiReply != "" && (
            <p className="p-4 mt-3 font-serif font-bold whitespace-pre-line border-white bg-blue-gray-100 min-h-fit">
              {aiReply}
            </p>
          )} */}
                </div>
              </AccordionBody>
            </Accordion>
            <Textarea
              label="body"
              name="body"
              onChange={updateFormState}
              value={formState.body}
            />
            {/* <Input size="lg" label="Email" /> */}
            <Accordion open={open === 5}>
              <AccordionHeader
                onClick={() => handleOpen(5)}
                className="text-sm"
              >
                Generate Image
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col flex-wrap p-4 bg-gray-100">
                  {/* //Send Button */}
                  {destination != "" && shipName != "" && info != "" ? (
                    <input
                      className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
                      type="button"
                      value="Generate AI response"
                      onClick={() => handleAIWrite("feature")}
                    />
                  ) : (
                    <h3 className="text-black bg-red-400 border-b-2 border-white">
                      !!Set Cruise Info First!!
                    </h3>
                  )}

                  {/* {aiReply != "" && (
            <p className="p-4 mt-3 font-serif font-bold whitespace-pre-line border-white bg-blue-gray-100 min-h-fit">
              {aiReply}
            </p>
          )} */}
                </div>
              </AccordionBody>
            </Accordion>
            <Input
              size="lg"
              label="featureIMG"
              name="featureIMG"
              value={formState.featureIMG}
              onChange={updateFormState}
            />
            {/* <Input size="md" label="date" type="date"/> */}
            <Accordion open={open === 6}>
              <AccordionHeader
                onClick={() => handleOpen(6)}
                className="text-sm"
              >
                Generate Dates
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col flex-wrap p-4 bg-gray-100">
                  {/* //Send Button */}
                  {destination != "" && shipName != "" && info != "" ? (
                    <input
                      className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
                      type="button"
                      value="Generate AI response"
                      onClick={() => handleAIWrite("dates")}
                    />
                  ) : (
                    <h3 className="text-black bg-red-400 border-b-2 border-white">
                      !!Set Cruise Info First!!
                    </h3>
                  )}

                  {/* {aiReply != "" && (
            <p className="p-4 mt-3 font-serif font-bold whitespace-pre-line border-white bg-blue-gray-100 min-h-fit">
              {aiReply}
            </p>
          )} */}
                </div>
              </AccordionBody>
            </Accordion>
            <Button className="mb-4 fullWidth" onClick={addDate}>
              Add Date
            </Button>
            <Button
              className="mb-4 fullWidth"
              onClick={() => {
                console.log(formState);
              }}
            >
              Check Dates
            </Button>
            <div className="flex flex-col gap-4" id="datesSection">
              {renderDates()}
            </div>
            <Accordion open={open === 7}>
              <AccordionHeader
                onClick={() => handleOpen(7)}
                className="text-sm"
              >
                Generate Sections
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col flex-wrap p-4 bg-gray-100">
                  {/* //Send Button */}
                  {destination != "" && shipName != "" && info != "" ? (
                    <input
                      className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
                      type="button"
                      value="Generate AI response"
                      onClick={() => handleAIWrite("sections")}
                    />
                  ) : (
                    <h3 className="text-black bg-red-400 border-b-2 border-white">
                      !!Set Cruise Info First!!
                    </h3>
                  )}

                  {/* {aiReply != "" && (
            <p className="p-4 mt-3 font-serif font-bold whitespace-pre-line border-white bg-blue-gray-100 min-h-fit">
              {aiReply}
            </p>
          )} */}
                </div>
              </AccordionBody>
            </Accordion>
            <Button className="mb-4 fullWidth" onClick={addSection}>
              Add Section
            </Button>
            <div className="flex flex-col gap-4" id="sectionsSection">
              {renderSections()}
            </div>
            <Accordion open={open === 8}>
              <AccordionHeader
                onClick={() => handleOpen(8)}
                className="text-sm"
              >
                Generate Extra Info
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col flex-wrap p-4 bg-gray-100">
                  {/* //Send Button */}
                  {destination != "" && shipName != "" && info != "" ? (
                    <input
                      className="p-3 mt-4 border-2 border-white rounded-sm bg-blue-gray-100 "
                      type="button"
                      value="Generate AI response"
                      onClick={() => handleAIWrite("extras")}
                    />
                  ) : (
                    <h3 className="text-black bg-red-400 border-b-2 border-white">
                      !!Set Cruise Info First!!
                    </h3>
                  )}

                  {/* {aiReply != "" && (
            <p className="p-4 mt-3 font-serif font-bold whitespace-pre-line border-white bg-blue-gray-100 min-h-fit">
              {aiReply}
            </p>
          )} */}
                </div>
              </AccordionBody>
            </Accordion>
            <Button className="mb-4 fullWidth" onClick={addExtra}>
              Add Extras
            </Button>
            <div className="flex flex-col gap-4" id="extrasSection">
              {renderExtras()}
            </div>
            <h3>Tags</h3>
            {tagInput != "" && <Button onClick={handleAddTag}>Add Tag</Button>}
            <Input
              size="md"
              type="text"
              ref={tagInputRef}
              label="Enter Tag Name"
              value={tagInput}
              onChange={(event) => {
                handleTagUpdate(event.target.value);
              }}
            />
            <div className="flex flex-row flex-wrap gap-4">{renderTags()}</div>
            {/* <Input type="password" size="lg" label="Password" /> */}
          </div>

          {!update && (
            <Button onClick={addPost} className="mt-6" fullWidth>
              Add Post
            </Button>
          )}
        </form>
      </Card>
    </>
  );
}
export default PostForm;
