import React, { useState } from "react";
import SmartSlider from "react-smart-slider";
import {
  Typography,
  Card,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { searchCruises, getCruise } from "./searchv";
import testresult from "./testresult.json";
import ImageFade from "../slideshow/ImageFade";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import { Button, Icon, Image, List, Segment } from "semantic-ui-react";
import { Navigate, useLoaderData, useNavigate, useOutletContext, useParams } from "react-router-dom";

export async function LoadCruiseData({ params }) {
  //const data = useParams()
  console.log(params);
  return await getCruise(params.cruise, params.ship);
}
export default function ShowResult() {
  //const __data = testresult.data;
  const [open, setOpen] = useState(1);
  const __data = useLoaderData().data;
  const setLoading = useOutletContext();
  console.log(__data);
  // return (
  //   <></>)
  const bgImageStyle = {
    backgroundImage: `url("${__data.photos[0].src}")`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
  };
  const priceExcludeLabels = ["You Save", "", "Military Rate", "Our Suite"];
  console.log(__data);
  //const data =  getCruise();

  const photoArr = __data.photos.map((item, index) => {
    return { url: item.src, childrenElem: <h6>{item.caption}</h6> };
  });
  console.log(photoArr);
  const back = useNavigate();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  setLoading(false);
  
  return (
    <div className="flex flex-col items-center justify-center w-full text-center bg-blue-200 justify-self-center">
      <div
      className="sticky z-50 grid grid-cols-3 p-2 top-14"
      >
       
        <div className="sticky top-0 z-50 grid grid-cols-3 col-span-3 p-2 space-x-6 bg-blue-300 rounded-md shadow-md">
          {/* <Typography
            variant="lead"
            className="my-3 font-bold bg-orange-200 shadow-sm rounded-ld font-body"
          >
            Book Now!
          </Typography> */}
           
          <Button 
          onClick={() => {back("/")}}
          className=" w-30" color="blue">
            Back to search
          </Button>
          <Typography variant="h6" className="my-3">
            <i className="p-1 fa fa-phone" />
            <strong>904 438 8121</strong>
          </Typography>
          <Button 
          className="w-30"
          color="green">Book Now!</Button>
          
        </div>
      </div>

      <Segment inverted color="blue" size="huge" className="px-4 mx-4 ">
        <div className="flex flex-col md:grid md:grid-cols-2">
          <div
            style={bgImageStyle}
            className="grid w-full h-full gap-8 rounded-md shadow-md p-28 md:grid-flow-col"
          >
            <div className="z-10 flex flex-col ">
              <Typography variant="h2" className="">
                {__data.mainInfo.shipName}
              </Typography>
            </div>

            <div id="overlayContainer">
              <div className="" id="overlay"></div>
            </div>
          </div>

          <div className="z-10 p-10 border-2 border-black rounded-sm shadow-sm">
            <Icon name="" />
            <div className="z-10 pb-6 mb-5 border-b-2 border-gray-800 ">
              <Typography variant="h3" className="">
                {__data.mainInfo.dealName}
              </Typography>
            </div>
            <div className="flex flex-col flex-wrap gap-6 text-sm md:flex-row">
              {__data.itinerary.dates.map((date, i) => {
                if (
                  date.location != "At Sea" &&
                  i != 0 &&
                  i != __data.itinerary.dates.length - 1
                ) {
                  return (
                    <>
                      <Typography variant="a" className="">
                        - {date.location} -
                      </Typography>
                    </>
                  );
                }
              })}
            </div>
          </div>

          {/* <Image
            className="align-center lg:w-fit"
            spaced="right"
            size="large"
            src={__data.photos[0].src}
          /> */}
        </div>
      </Segment>

      <div className="flex flex-col mx-6">
        {/* ROW-1 */}
        <div className="flex flex-col flex-wrap w-full gap-3 mt-6 md:grid md:grid-cols-3">
          <Typography
            variant="small"
            className="justify-end col-span-2 p-2 text-lg align-middle md:text-left lg:w-full md:border-r-2 lg:border-black "
          >
            {__data.ship.description}
          </Typography>
          <div>
            <Typography variant="h4">Prices:</Typography>
            <hr className="border-b-2" />
            <List celled>
              {__data.mainInfo.prices.map((comparePricesArr, i) => {
                var label = "";
                var trimmedLabel = "";

                return comparePricesArr.map((comparePrice, j) => {
                  //console.log(comparePrice.label);
                  if (comparePrice.label.includes("Our")) {
                    trimmedLabel = comparePrice.label.replace("Our ", "");
                    label = comparePrice.label;
                    console.log(trimmedLabel);
                    return (
                      <div className="grid justify-center grid-cols-8 px-2 mb-2 align-text-bottom bg-gray-300 border-black rounded-sm shadow-sm border-b-3 ">
                        <Icon name="dot circle" />
                        <p className="col-span-4 text-lg font-bold text-left ">
                          {trimmedLabel}
                        </p>
                        <div>|</div>
                        <p className="col-span-1 font-extrabold text-red-800">
                          {comparePrice.amount}
                          {/* {trimmedLabel} */}
                        </p>
                      </div>
                    );
                  }
                });
              })}
            </List>
            <hr className="border-b-2" />
          </div>
        </div>
        <div className="font-bold text-left font-body"></div>
        {/* ROW-2 */}
        <div className="info">
          <div className="bg-gray-200 border-2 border-gray-400 border-spacing-1">
            <Image
              className="p-4 mx-auto "
              src={__data.itinerary.itineraryMap}
            />
          </div>
          <Accordion open={open === 1} className="itinerary">
            <AccordionHeader onClick={() => handleOpen(1)}>
              Itinerary
            </AccordionHeader>
            <AccordionBody>
              {__data.itinerary.dates.map((item, index) => {
                return (
                  <>
                    <div
                      className="flex flex-col w-full gap-4 pt-3 text-black border-2 border-gray-200 rounded-sm shadow-sm md:grid md:grid-cols-8 "
                      key={index}
                    >
                      <i class="fa fa-clock pt-2 col-span-1" />

                      <Typography className="col-span-3" variant="h6">
                        {item.location}
                      </Typography>

                      <Typography
                        className="col-span-3 text-2xl md:text-lg "
                        variant="small"
                      >
                        {item.date}
                      </Typography>

                      <Typography
                        className="col-span-1 text-2xl md:text-lg "
                        variant="small"
                      >
                        {item.time}
                      </Typography>
                    </div>
                  </>
                );
              })}
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              Ship Information
            </AccordionHeader>
            <AccordionBody>
              {__data.ship.info.map((item, index) => {
                return (
                  <>
                    <div
                      className="grid w-full grid-cols-2 gap-4 border-2 border-gray-200 rounded-sm shadow-sm "
                      key={index}
                    >
                      <Typography
                        variant="small"
                        className="text-2xl md:text-lg"
                      >
                        {item.label}
                      </Typography>
                      <Typography className="text-2xl md:text-lg" variant="h6">
                        {item.value}
                      </Typography>
                    </div>
                  </>
                );
              })}
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3}>
            <AccordionHeader onClick={() => handleOpen(3)}>
              Cabins
            </AccordionHeader>
            <AccordionBody>
              {__data.cabin.map((item, index) => {
                return (
                  <>
                    <div
                      className="w-full gap-4 mb-4 border-2 border-gray-200 rounded-sm shadow-sm md:grid md:grid-cols-2"
                      key={index}
                    >
                      <div>
                        <Image src={item.img} />
                      </div>
                      <div>
                        <Typography
                          className="pb-2 text-blue-700 border-b-2"
                          variant="h3"
                        >
                          {item.category}
                        </Typography>
                        <Typography variant="h6">{item.description}</Typography>
                      </div>
                    </div>
                  </>
                );
              })}
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 4}>
            <AccordionHeader onClick={() => handleOpen(4)}>
              Dining
            </AccordionHeader>
            <AccordionBody>
              {__data.dining.map((item, index) => {
                return (
                  <>
                    <div
                      className="w-full gap-4 mb-4 border-2 border-gray-200 rounded-sm shadow-sm md:grid md:grid-cols-2"
                      key={index}
                    >
                      <div>
                        <Image className="mx-auto" src={item.image} />
                      </div>
                      <div
                        className="text-lg"
                        dangerouslySetInnerHTML={{ __html: item.textHTML }}
                      >
                        {/* <Typography 
                        className="pb-2 text-blue-700 border-b-2"
                        variant="h3">{item.category}</Typography> */}
                        {/* <Typography variant="h6">{item.description}</Typography> */}
                      </div>
                    </div>
                  </>
                );
              })}
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 5}>
            <AccordionHeader onClick={() => handleOpen(5)}>
              Ship Photos
            </AccordionHeader>
            <AccordionBody>
              {__data.photos.map((item, index) => {
                return (
                  <>
                    <div
                      className="flex flex-col w-full gap-4 mx-auto mb-4 border-2 border-gray-200 rounded-sm shadow-sm md:max-w-1/2 md:w-2/3"
                      key={index}
                    >
                      <Image className="w-full" src={item.src} />
                      <p className="mb-3 text-xl font-bold align-middle">
                        {item.caption}
                      </p>
                      {/* <Typography variant="small">{item.label}</Typography>
                      <Typography variant="h6">{item.value}</Typography> */}
                    </div>
                  </>
                );
              })}
            </AccordionBody>
          </Accordion>
        </div>
        <div className="mb-6 border-b-4"></div>
        <div className="p-4 font-semibold bg-orange-200 rounded-lg md:grid md:grid-cols-8">
          <i className="fa-solid fa-circle-exclamation fa-3x"></i>
          <p className="col-span-6">{__data.mainInfo.important}</p>
        </div>
        <div className="mt-6 border-b-4"></div>
      </div>
    </div>
  );
}
