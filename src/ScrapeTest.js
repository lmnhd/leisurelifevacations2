
 import { load } from "cheerio";

//import puppeteer from "puppeteer";

 import axios from "axios";

export  async function vtg() {

    // const browser = await puppeteer.launch({ headless: "new" });
    // const page = await browser.newPage();
    // page.setJavaScriptEnabled(true);
    // const cookies = getCookies();
    // await page.setCookie(...cookies);
   
   const url = "/ticker.cfm?incCT=y&sm=20241&sd=5&tm=20241&td=12&r=13&l=0&s=0&n=0&d=0&v=0&rt=1";
   const response = await axios.get(url);
   const html = response.data;
   const $ = load(html);
   console.log(html);
    //  
    //  let $ = load(html);
    //  let deals = $("tbody");
    //  let data = $("tr")
    //  console.log(deals.text());

}


 


    // function getCookies(cookiefile = __dirname + "/cookies.json") {
    //     // cookiestring = fs.readFileSync(cookiefile);
      
    //     const cookies = JSON.parse(cookiestring);
      
    //     return cookies;
    //   }
      