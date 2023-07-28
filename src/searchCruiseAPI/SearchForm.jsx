import {
  Option,
  Typography,
  Select,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-tailwind/react";
import searchParams from "./searchParams.json";
import { useRef, useState } from "react";
import { searchCruises } from "./searchv";
import { Navigate, Link, useOutletContext } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import PropertyRating from "../Components/PropertyRating";

export default function SearchForm() {
  // ["incCT"]: query.incCT,
  //   ["sm"]: query.sm,
  //   ["sd"]: query.sd,
  //   ["tm"]: query.tm,
  //   ["td"]: query.td,
  //   ["r"]: query.r,
  //   ["l"]: query.l,
  //   ["n"]: query.n,
  //   ["d"]: query.d,
  //   ["v"]: query.v,
  //   ["rt"]: query.rt,
  //   ["s"]: query.s,
  const params = searchParams;
  const [search, setSearch] = useState({
    allVals: {
      incCT: "y",
      sm: "0",
      sd: "0",
      tm: "0",
      td: "0",
      r: "0",
      l: 0,
      n: "0",
      d: "0",
      rd: "0",
      v: "0",
      rt: "0",
      s: 0,
    },
    ships: searchParams["sortedShips"],
  });
  const [header, setHeader] = useState("Search Cruises");
  const [buttonVisible, setButtonVisible] = useState(false);
  const [results, setResults] = useState([]);
  const [showingResults, setShowingResults] = useState(false);
  //   let lineIDs = [];
  //   let shipIDs = [];
  const shipSelect = useRef(null);
  const arr = [];
  let shipArr = [];
  let shipLineArr = [];
  let newSearchOBJ = {};
  const allShipsOBJ = {
    shipID: 0,
    lineID: 0,
    shipName: "All Ships",
    lineName: "Cunard Line",
  };
  const setLoading = useOutletContext();
  const formstyle1 = "formgroup shadow-md rounded-md text-white ";
  const resultLableStyle =  "font-serif  text-center text-blue-900 align-center"
  const resultValueStyle = "text-center text-white"
  const headerRef = useRef("Search Cruises");

  //   const formstyle1 = "formgroup flex flex-row gap-6 m-6"

  const showResults = () => {};
  const updateSearch = async (newval, nameOfVal) => {
    //shipSelect.current.value = 0
    console.log(nameOfVal + " : " + newval);

    if (nameOfVal == "l") {
      newSearchOBJ = { ...search.allVals, [nameOfVal]: newval, s: 0 };
    } else {
      newSearchOBJ = { ...search.allVals, [nameOfVal]: newval };
    }

    // setShipIDs(shipArr);
    //console.log(shipArr);
    console.log(newSearchOBJ);

    setSearch({ allVals: newSearchOBJ, ships: shipLineArr });

    console.log(await getShips(newSearchOBJ));
  };

  async function getShips(searchVals) {
    setButtonVisible(false);
    if (searchVals.sm == "0") {
      let textMessage = "Select Month To Search.";
      setHeader(textMessage);
      return textMessage;
    }
    if (searchVals.tm == "0") {
      let textMessage = "Select Last Month To Search.";
      setHeader(textMessage);
      return textMessage;
    }
    if (searchVals.r == "0") {
      let textMessage = "Select Region.";
      setHeader(textMessage);
      return textMessage;
    } else {
      let textMessage = "Try Differeint Options";
      setHeader(textMessage);
      //return textMessage;
    }

    const query = {
      ["incCT"]: "y",
      ["sm"]: searchVals.sm,
      ["sd"]: searchVals.sd,
      ["tm"]: searchVals.tm,
      ["td"]: searchVals.td,
      ["r"]: searchVals.r,
      ["l"]: searchVals.l,
      ["n"]: searchVals.n,
      ["d"]: searchVals.d,
      ["v"]: searchVals.v,
      ["rt"]: searchVals.rt,
      ["s"]: searchVals.s,
    };

    const data = await searchCruises(query);
    if (data.data[0].region) {
      console.log("got something");
      let textMessage =
        data.data[0].length > 0
          ? `See ${data.data[0].deals.length} Cruise Result`
          : `See ${data.data[0].deals.length} Cruise Results`;
      setResults(data.data[0].deals);

      setHeader(textMessage);
      setButtonVisible(true);

      return textMessage;
    } else {
      console.log(data.data);
    }

    console.log(data);
  }
  const renderShips = () => {
    let label = "";
    let finalValName = "s";
    let visible = search.allVals.r !== "0";
    const fieldColorOn = "bg-blue-500 text-white";
    shipLineArr = [allShipsOBJ, ...searchParams["sortedShips"]];

    return (
      <>
        <div className={formstyle1}>
          <div className="m-2 w-72">
            <Select
              label={label}
              onChange={(val) => updateSearch(val, finalValName)}
              value={0}
              ref={shipSelect}
              className={`${Number(search.allVals[finalValName ]) != 0 && fieldColorOn}  w-full`}
            >
              {shipLineArr
                .filter(
                  (ship) =>
                    (ship.lineID == search.allVals.l) |
                    (ship.lineID == 0) |
                    (search.allVals.l == 0)
                )
                .map((key) => {
                  return (
                    <Option key={key.shipID} value={key.shipID}>
                      {key.shipName}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* <Typography variant="h5" component="h2" align="center" className="m-4">
        {header}
      </Typography> */}
      <div>
        <h4 className="p-0 mt-4 font-sans font-thin text-center text-blue-100 bg-blue-200">Search Cruises</h4>
      </div>
      <form className="z-50 items-center w-full pb-4 mx-auto bg-blue-200 border-b-2 border-blue-400"> 
        <div className="flex flex-wrap justify-center max-w-lg gap-6 mx-auto shadow-sm">
          <Button
            className={`w-full mx-6 my-3 text-center ${buttonVisible ? "text-green-100" + " bg-blue-800" : "text-gray-900"} shadow-sm `}
            disabled={!buttonVisible}
            
            onClick={() => setShowingResults(!showingResults)}
          >
            {header}
          </Button>
        </div>
        <div className="">
          <div className="flex flex-wrap items-center justify-center w-full gap-2 px-3 mx-auto text-white align-middle md:mb-0">
            {Object.keys(searchParams).map((key, index) => {
              if (key === "sortedShips") {
              } else if (key === "ShipID") {
                let visible = search.allVals.r !== "0";
                {
                  return visible && <>{renderShips()}</>;
                }
              } else if (key == "LineID") {
                const shipLineArr = searchParams["sortedShips"];
                let finalValName = "l";
                let label = "";
                let testArr = [];
                let visible = search.allVals.r !== "0";
                const fieldColorOn = "bg-blue-500 text-white";
                arr.push({
                  lineID: 0,
                  lineName: "All Cruise Lines",
                  shipID: 0,
                });
                shipLineArr.map((val) => {
                  if (!testArr.includes(val.lineID)) {
                    arr.push({
                      lineID: val.lineID,
                      lineName: val.lineName,
                      shipID: val.shipID,
                    });
                    testArr.push(val.lineID);
                  }
                });
                //console.log(arr)
                // setLineIDs(arr);
                return (
                  <>
                    {visible && (
                      <div className={formstyle1}>
                        <div className="m-2 w-72">
                          <Select
                            label={label}
                            onChange={(val) => updateSearch(val, finalValName)}
                            value={search.allVals[finalValName]}
                            className={`${Number(search.allVals[finalValName ]) != 0 && fieldColorOn}  w-full`}
                          >
                            {arr
                              .sort((a, b) =>
                                a.lineName.localeCompare(b.lineName)
                              )
                              .map((shipLineOB) => {
                                return (
                                  <Option
                                    key={shipLineOB.lineID}
                                    value={shipLineOB.lineID}
                                  >
                                    {shipLineOB.lineName}
                                  </Option>
                                );
                              })}
                          </Select>
                        </div>
                      </div>
                    )}
                  </>
                );
              } else {
                const obj = searchParams[key];
                let label = "";
                let finalValName = "";
                let visible = true;
                const fieldColorOn = "bg-blue-500 text-white";
                const fieldColorOff = "bg-green-500"
                switch (key) {
                  case "SMonth":
                    label = "";
                    finalValName = "sm";
                    break;
                  case "SDay":
                    label = "From Day";
                    finalValName = "sd";
                    visible = search.allVals.sm != 0 && search.allVals.tm != 0;
                    break;
                  case "TMonth":
                    label = "";
                    finalValName = "tm";
                    break;
                  case "TDay":
                    label = "To Day";
                    finalValName = "td";
                    visible = search.allVals.sm != 0 && search.allVals.tm != 0;
                    break;
                  case "RegionID":
                    label = "";
                    finalValName = "r";
                    break;
                  case "LineID":
                    label = "";
                    finalValName = "l";
                    //visible = search.allVals.r !== '0' ;
                    break;
                  case "ShipID":
                    label = "";
                    finalValName = "s";
                    //visible = search.allVals.r !== '0' ;
                    break;
                  case "Length":
                    label = "";
                    finalValName = "n";
                    visible = search.allVals.r !== "0";
                    break;
                  case "DPortID":
                    label = "Port From";
                    finalValName = "d";
                    visible = search.allVals.r != 0;
                    break;
                  case "VPortID":
                    label = "Visiting Port";
                    finalValName = "v";
                    visible = search.allVals.r != 0;
                    break;
                }

                return (
                  <>
                    {visible && (
                      <div className={formstyle1}>
                        <div className="m-2 w-72">
                          <Select
                            label={label}
                            onChange={(val) => updateSearch(val, finalValName)}
                            value={search.allVals[finalValName]}
                            className={`${Number(search.allVals[finalValName ]) != 0 && fieldColorOn}  w-full `}
                          >
                            {Object.keys(obj)
                              .sort((a, b) => {
                                if (key == "SMonth" || key == "TMonth") {
                                  var ayear = Number(a.substring(0, 4));
                                  var amonth = Number(a.substring(4, 6));
                                  var byear = Number(b.substring(0, 4));
                                  var bmonth = Number(b.substring(4, 6));
                                  if (ayear < byear) {
                                    return -1;
                                  }
                                  if (ayear > byear) {
                                    return 1;
                                  }
                                  if (ayear == byear) {
                                    return amonth > bmonth ? 1 : -1;
                                  }
                                } else {
                                  return 1;
                                }
                              })
                              .map((key) => {
                                //console.log(key + " :  " + obj[key]);
                                return (
                                  <Option key={key} value={key}>
                                    {obj[key]}
                                  </Option>
                                );
                              })}
                          </Select>
                        </div>
                      </div>
                    )}
                  </>
                );
              }
            })}

            {/* <div className="flex flex-row gap-6 m-6 formgroup">
              <div className="w-72">
                <Select
                  label="From Month\Year"
                  onChange={(val) => updateSearch(val, "sm")}
                  value={search.sm}
                  // onChange={(val) => setSearch({...search, sm: val.target.value })}
                >
                  {Object.keys(params.SMonth).map((key) => {
                    return (
                      <Option key={key} value={key}>
                        {params.SMonth[key]}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="w-72">
                <Select
                  label="To Month\Year"
                  onChange={(val) => updateSearch(val, "tm")}
                  value={search.tm}
                >
                  {Object.keys(params.TMonth).map((key) => {
                    return (
                      <Option key={key} value={key}>
                        {params.TMonth[key]}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>

            
            <div className="flex flex-row items-stretch gap-6 formgroup">
              <div className="w-72">
                <Select
                  label="From Day"
                  onChange={(val) => updateSearch(val, "sd")}
                  value={search.sd}
                  // onChange={(val) => setSearch({...search, sm: val.target.value })}
                >
                  {Object.keys(params.SDay).map((key) => {
                    return (
                      <Option key={key} value={key}>
                        {params.SDay[key]}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div className="w-72">
                <Select
                  label="To Day"
                  onChange={(val) => updateSearch(val, "td")}
                  value={search.td}
                >
                  {Object.keys(params.TDay).map((key) => {
                    return (
                      <Option key={key} value={key}>
                        {params.TDay[key]}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div> */}
          </div>
        </div>
      </form>
      <div className="flex items-stretch gap-6">
        <ul className="items-center w-screen h-auto max-h-screen overflow-y-scroll bg-blue-200 ">
          {showingResults &&
            results
              .sort((a, b) => {
                a.line.localeCompare(b.line);
              })
              .map((result, i) => {
                return (
                  <li className="rounded-md shadow-md" onClick={() => setLoading(true)}>
                    <Link to={`/searchresult/${String(result.fdeal).replace("#","")}/${result.shipId}`}>
                      {false && <div className="grid w-full grid-flow-row grid-rows-1 gap-5 p-2 mb-3 text-white bg-gray-100 border-black rounded-sm shadow-sm flex-nowrap md:grid-cols-12 border-b-3 md:grid hover:pointer">
                        <Typography
                          className="h-full col-span-3 p-3 bg-gray-500 border-b-2 rounded-md shadow-lg border-b-gray-600"
                          variant="small"
                          color="blue-gray"
                        >
                          <h2>{i + 1}</h2>({result.fdeal})
                        </Typography>
                        <div className="grid col-span-2 grid-rows-2 text-center ">
                          {/* <img src={`https://www.vacationstogo.com/${result.veiwport}`}/> */}
                          <Typography
                            className="mx-auto font-bold text-left "
                            variant="h6"
                            color="white"
                          >
                            {result.date}
                          </Typography>
                          {/* <div>|</div> */}
                          <Typography
                            variant="p"
                            color="darkGray"
                            className="w-full pt-1 mx-auto text-lg font-bold text-center align-middle bg-gray-400 rounded-sm shadow-lg md:w-32"
                          >
                            {result.ship}
                          </Typography>
                        </div>
                        <div className="col-span-3 pt-6 mx-auto align-bottom ">
                          <PropertyRating className="my-auto align-middle" rating={result.rating}/>
                        </div>
                        {/* // <Typography
                        //   variant="small"
                        //   color="black"
                        //   className="w-full col-span-2 px-3 font-normal text-center text-red-900 md:w-2/3 md:border-l-2 "
                        // >
                        //   Rating - {result.rating}
                        // </Typography> */}
                        <Typography
                          variant="p"
                          color="darkred"
                          className="col-span-2 px-3 mx-auto font-bold text-center "
                        >
                          {result.fromPort}
                        </Typography>
                        <div className="grid w-1/2 grid-cols-2 col-span-1 columns-12">
                          {/* <Icon name="dollar"/> */}
                          <Typography
                            variant="p"
                            color="white"
                            className="px-3 mx-auto text-lg font-bold text-center md:border-l-2 md:bg-none"
                          >
                            {result.ourPrice}
                          </Typography>
                        </div>
                      </div>}

                      {true && <div>
                        <div className="grid grid-cols-3">
                          <p
                          className="text-lg font-bold text-blue-900 font-body"
                          >{result.line}</p>
                          <p
                          className="text-xl font-bold text-center"
                          >{i+1}</p>
                          <p
                          className="h-full text-lg text-center text-blue-900"
                          >{result.date} | {result.ship}</p>
                        </div>
                        <div
                        className="grid grid-cols-3 gap-4 p-6 my-6 align-middle bg-blue-300 md:flex-row md:grid-cols-6 md:gap-1"
                        >
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              CRUISE
                              </p>
                            <p
                            className={resultValueStyle}
                            >{result.fdeal}</p>
                          </div>
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              NIGHTS
                              </p>
                            <p
                            className={resultValueStyle}
                            >{result.nights}</p>
                          </div>
                         
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              DEPART
                              </p>
                            <p
                            className={resultValueStyle}
                            >{result.fromPort}</p>
                          </div>
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              RETURN
                              </p>
                            <p
                            className={resultValueStyle}
                            >{result.toPort}</p>
                          </div>
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              LINE
                              </p>
                            <p
                            className={resultValueStyle}
                            >{result.line}</p>
                          </div>
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              SHIP
                              </p>
                            <p
                            className={resultValueStyle}
                            >{result.ship}</p>
                          </div>
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              DATE
                              </p>
                            <p
                            className={resultValueStyle}
                            >{result.date}</p>
                          </div>
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              RATING
                              </p>
                            <PropertyRating rating={result.rating}/>
                          </div>
                          <div
                          className="grid-rows-2 md:grid"
                          >
                            <p 
                            className={resultLableStyle}>
                              PRICE
                              </p>
                            <p
                            className={resultValueStyle}
                            >{result.ourPrice}</p>
                          </div>
                          
                        
                        </div>
                      </div>}

                      {/* <Link to={`/searchresult/${String(result.fdeal).replace("#","")}/${result.shipId}`}>
                      click
                    </Link> */}
                      {/* <div className="flex flex-row">
                    <h4>Cruise</h4> : <p>{result.fdeal}</p>
                </div>
                <div>
                <div className="flex flex-row">
                    <h4>Port</h4> : <p>{result.fromPort}</p>
                </div>
                </div>
                <div>
                <div className="flex flex-row">
                    <h4>Ship</h4> : <p>{result.ship}</p>
                </div>
                </div>
                <div>
                <div className="flex flex-row">
                    <h4>Deal Price</h4> : <p>{result.ourPrice}</p>
                </div>
                </div> */}
                    </Link>
                  </li>
                );
              })}
        </ul>
      </div>
    </>
  );
}
