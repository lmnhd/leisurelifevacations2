import axios from "axios";

export async function getCruise(deal = 34588, ship = 984) {
  //const url = `http://localhost:4000/cruise?deal=20313&ship=85`
  const url = `https://cruiseapi-ef5d23576a9c.herokuapp.com/cruise`;
  // return new Promise((resolve, reject) => {
  //     var listResponse = axios.get(url, {})
  // });
  var listResponse = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      deal: deal, 
      ship: ship,
    },
  });
  console.log(listResponse);
  return listResponse;
}

export async function searchCruises(query) {
  //const url = `http://localhost:4000/cruise?deal=20313&ship=85`
  //const url = `http://localhost:4000/search`;
  const url = `https://cruiseapi-ef5d23576a9c.herokuapp.com/search`;
  // return new Promise((resolve, reject) => {
  //     var listResponse = axios.get(url, {})
  // });
  var listResponse = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ["incCT"]: query.incCT,
      ["sm"]: query.sm,
      ["sd"]: query.sd,
      ["tm"]: query.tm,
      ["td"]: query.td,
      ["r"]: query.r,
      ["l"]: query.l,
      ["n"]: query.n,
      ["d"]: query.d,
      ["v"]: query.v,
      ["rt"]: query.rt,
      ["s"]: query.s,
    },
  });
  console.log(listResponse);
  return listResponse;
}
