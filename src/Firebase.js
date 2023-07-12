// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFunctions} from "firebase/functions"
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref,push, set, get, onValue, child } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHBrG9zxFJJQK35BcwFFbEiTLJ2ET03g8",
  authDomain: "leisurelifevacations-52ff1.firebaseapp.com",
  projectId: "leisurelifevacations-52ff1",
  storageBucket: "leisurelifevacations-52ff1.appspot.com",
  messagingSenderId: "258216920060",
  appId: "1:258216920060:web:7725d93ac841cc60d9a879",
  measurementId: "G-22LCMS6VT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const functions = getFunctions(app)

const posts = [
    {
      heading: "Celebrity New years Cruise Celebration",
      summary:
        "JOin us on a fabulous cruise to Mexico this new years on Celebrity Fireworx",
      body: "asdkfjkr8i lasdkfjhuiryt rif iikijdjneryutgnv drityhfieosjfh",
      featureIMG:
        "https://images.unsplash.com/photo-1601681673640-930d30cd64ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNydWlzZSUyMHNoaXAlMjBzdW5zZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      sections: [
        {
          type: "Book before September 1 and reeieve in room dining for 2 - FREE",
          details:
            "aadksfj  ieu7eibviu ieujbnasdjj;losi ieruio ashoe iasuioasdjg ",
        },
      ],
      dates: [{ start: "11/09/2023", end: "11/15/2023", type: "sailing" }],
      extras: [
        {
          title: "Dining Promo",
          info: ["In room dining special for all suites 5 nights or more"],
        },
      ],
    },
  ];

export function addPost(post){
    
  const postListRef = ref(db,'posts')
  const newPostRef = push(postListRef)
  set(newPostRef, post).then((result) => {
    console.log(result)
  })

    
}

export function updatePost(post,id){
    set(ref(db, 'posts/' + id), {
        post: post
    })
    .then( ( completion ) => {
        console.log(completion)
    })
}
export async function getPosts(){
  var result = {}
  const arr = []
    const dbRef = ref(getDatabase());
   await get(child(dbRef, 'posts/')).then( (snapshot) => {
        if(snapshot.exists()) {
            //console.log(snapshot.val());
            result = snapshot.val();
        } else {
            console.log("No data available")
        }
    }).catch( (error) => {
        console.error(error)
    })
    const arrayResult = Object.keys(result).map( (post) => {
      return {id:post, post:result[post]}
    })
    //console.log(arrayResult)
    return arrayResult;
}
export async function getPost(id){
  var result = {}
  
    const dbRef = ref(getDatabase());
   await get(child(dbRef, 'posts/' + id)).then( (snapshot) => {
        if(snapshot.exists()) {
            //console.log(snapshot.val());
            result = snapshot.val();
        } else {
            console.log("No data available")
        }
    }).catch( (error) => {
        console.error(error)
    })
   
    //console.log(arrayResult)
    return result;
}
