import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Chip,
} from "@material-tailwind/react";
import { useState, useRef } from "react";
import { addPost as sendNow }  from "./Firebase";


export const PostFormData = {
  heading: "",
  summary: "",
  body: "",
  featureIMG: "",
  sections: [
    {
      type: "",
      details: "",
      img:""
    },
  ],
  dates: [{ date: "11/09/2023", type: "start" }],
  extras: [
    {
      title: "Dining Promo",
      info: ["In room dining special for all suites 5 nights or more"],
    },
  ],
  tags:['deal','celebrity','long','90days']
}
function PostForm({post, update, setPostState, updateExtras, updateDates, updateSections}) {

  //console.log(post)

  const [formState, setFormState] = useState(update ? post : PostFormData);
  
  const tagInputRef = useRef(null)
const [tagInput, setTagInput] = useState("")
const [tags,setTags] = useState([...formState.tags])
  const [dates, setDates] = useState([...formState.dates]);
  const [sections, setSections] = useState([...formState.sections]);
  const [extras, setExtras] = useState([...formState.extras]);
  // const [infoLines, setInfoLines] = useState(["add info here"])
  //console.log(formState)
  const updatePostState = () => {
    // setFormState({...formState,dates:dates,sections:sections,extras:extras})
    setPostState(formState);
   
  }
  const addPost = () => {
    
    setFormState({...formState,dates:dates,sections:sections,extras:extras})
    //console.log(formState)
    setTimeout(() => {sendNow(formState)},2000)
    //sendNow(formState)

  }

 
 

  // function addDate(){
  //   setDates(...dates, {date:"", type:""})
  // }

  const addDate = () => {
    setDates((dates) => [...dates, { date: "", type: "" }]);

    if(update){updatePostState()}
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

    if(update){updateDates(newDates)}
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

    if(update){updateDates(newDates)}
  };
  //SECTIONS
  const addSection = () => {
    setSections((sections) => [...sections, { details: "", type: "", img:"" }]);

    if(update){updateSections((sections) => [...sections, { details: "", type: "", img:"" }])}
  };

  const updateSectionDetails = (index, details) => {
    console.log(details);
    const newSections = [...sections];
    newSections[index] = { details: details, type: sections[index].type, img: sections[index].img };
    setSections(newSections);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    //console.log(newSections);
    if(update){updateSections(newSections)}
  };
  const updateSectionHeader = (index, header) => {
    //console.log(header);
    const newSections = [...sections];
    newSections[index] = { details: sections[index].details, type: header, img: sections[index].img };
    setSections(newSections);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    //console.log(newSections);
    if(update){updateSections(newSections)}
  };
  const updateSectionIMG = (index, img) => {
    console.log(img);
    const newSections = [...sections];
    newSections[index] = { details: sections[index].details, type: sections[index].type, img:img };
    setSections(newSections);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    console.log(newSections);
    if(update){updateSections(newSections)}
  };
  
  //ADD EXTRAS
  const addExtra = () => {
    setExtras((extras) => [...extras, { title: "", info: [""] }]);
    if(update){updateExtras((extras) => [...extras, { title: "", info: [""] }])}
  };

  const updateExtraInfo = (exIndex,inIndex, info) => {
    console.log(exIndex);
    
    const newExtras = [...extras]
    const newExtra = extras[exIndex];
    //return
    newExtra.info[inIndex] = info;
    newExtras[exIndex] = newExtra;
    setExtras([...newExtras]);
    //   setDates( dates => {
    //     const newDates = [...dates];
    // newDates[index] = {date:newDate, type:""}
    //   })
    if(update){updateExtras([...newExtras])}
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
    if(update){updateExtras(newExtras)}
  };
  function addInfoLine(index){
    var newExtras = extras;
    var newExtra = extras[index];
    const newInfo = [...newExtra.info,"add info here"]
    newExtra.info = newInfo;
    newExtras[index] = newExtra
    setExtras([...newExtras])

    if(update){updateExtras([...newExtras])}
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
  function renderTags(){
    return formState.tags.map( (tag,index) => {
      return(<Chip key={index} onClick={ (event) => {removeTag(tag)}}  color="red" value={tag}/>)
      
    })
  }
  const removeTag = (tag) => {

    console.log(tag)
    const tags = formState.tags.filter(i => i !== tag)
    console.log(tags)
    
    setFormState({...formState, tags})
  }
  const handleAddTag = () => {
    console.log(tagInput)
    const tags = [...formState.tags,tagInput]
    setFormState({...formState, tags:tags})
    setTagInput('')
    //tagInputRef.current.clear()
  }

  const handleTagUpdate = (tag) => {
    setTagInput(tag)
  }


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
              updateSectionIMG(index, event.target.value)
            }}
            />
            <Input
              size="md"
              label="sectionHeader"
              type="text"
              key={'sechead' + index}
              id={'sechead' + index}
              value={section.type}
              onChange={(event) => {
                updateSectionHeader(index, event.target.value);
              }}
            />
            <Textarea
              type="text"
              label="sectionDetails"
              value={section.details}
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
          { extra.info.map( (info, i) => {
            return( <Textarea
              label={'info ' + extra.title + '-' + i}
              value={info}
              name={extra.title + '-' + i}
              onChange={(event) => updateExtraInfo(index,i,event.target.value)}
               />)
           
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
    const {name, value} = event.target;
    setFormState( formState => ({
      ...formState,[name]:value
    }))
    console.log(formState)

    //if(update){updatePostState()}
    if(update){setPostState( formState => ({
      ...formState,[name]:value
    }))}
  }

  return (
    <>
      <Card className="flex-wrap content-center " color="transparent" >
        <Typography className="w-auto text-center"  variant="h4" color="blue-gray">
          {update ? 'Update ' : 'Add '} Post
        </Typography>
        <Typography  color="gray" className="w-auto mt-1 font-normal">
          Enter Post Information
        </Typography>
        <form className="max-w-screen-lg mt-8 mb-2 sm:w-96" onSubmit={addPost}>
          <div className="flex flex-col gap-6 mb-4">
            <Input type="text" size="lg" label="heading" value={formState.heading} name="heading" onChange={updateFormState} />
            <Textarea label="summary" value={formState.summary} name="summary" onChange={updateFormState} />
            <Textarea label="body" name="body" onChange={updateFormState} value={formState.body} />
            {/* <Input size="lg" label="Email" /> */}
            <Input size="lg" label="featureIMG" name="featureIMG" value={formState.featureIMG} onChange={updateFormState} />
            {/* <Input size="md" label="date" type="date"/> */}
            <Button className="mb-4 fullWidth" onClick={addDate}>
              Add Date
            </Button>
            <Button className="mb-4 fullWidth" onClick={() => {console.log(formState)}}>
              Check Dates
            </Button>
            <div className="flex flex-col gap-4" id="datesSection">
              {renderDates()}
            </div>
            <Button className="mb-4 fullWidth" onClick={addSection}>
              Add Section
            </Button>
            <div className="flex flex-col gap-4" id="sectionsSection">
              {renderSections()}
            </div>
            <Button className="mb-4 fullWidth" onClick={addExtra}>
              Add Extras
            </Button>
            <div className="flex flex-col gap-4" id="extrasSection">
              {renderExtras()}
            </div> 
            <h3>Tags</h3>
            {tagInput != '' && <Button onClick={handleAddTag}>Add Tag</Button>}
              <Input size="md" 
              type="text"
              ref={tagInputRef}
              label="Enter Tag Name"
              value={tagInput}
              onChange={(event) => {
                handleTagUpdate(event.target.value)
              }}
              
              />
            <div className="flex flex-row flex-wrap gap-4">
              
             
              {renderTags()}
            </div>
            {/* <Input type="password" size="lg" label="Password" /> */}
          </div>
         
          {!update && <Button onClick={addPost} className="mt-6" fullWidth>
            Add Post
          </Button>}
          
        </form>
      </Card>
    </>
  );
}
export default PostForm;
