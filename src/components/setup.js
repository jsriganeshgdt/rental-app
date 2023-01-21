import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
const firebaseConfig = {

  apiKey: "AIzaSyDLYbkkU1wImldH8Tc9NCxE_yVjROxyKXE",
  authDomain: "rentalapp-5571a.firebaseapp.com",
  databaseURL: "https://rentalapp-5571a-default-rtdb.firebaseio.com",
  projectId: "rentalapp-5571a",
  storageBucket: "rentalapp-5571a.appspot.com",
  messagingSenderId: "846787229893",
  appId: "1:846787229893:web:6f13065b3207bb2b2c58ac",
  measurementId: "G-JYM6VQJD8W"

    // apiKey: "AIzaSyDNfWdOJ-TKIRFP-iQSJ5BIGwqFkqkp5d8",
    // authDomain: "lottery-c00c3.firebaseapp.com",
    // databaseURL: "https://lottery-c00c3-default-rtdb.firebaseio.com",
    // projectId: "lottery-c00c3",
    // storageBucket: "lottery-c00c3.appspot.com",
    // messagingSenderId: "596096256145",
    // appId: "1:596096256145:web:81cf9d2352fa32692fd730",
    // measurementId: "G-81KWGWKDCQ"

    // apiKey: "AIzaSyCoYlpSoHreLoxhf7iYhnFBXMIFsVqGJVQ",
    // authDomain: "assam-lottery.firebaseapp.com",
    // databaseURL: "https://assam-lottery-default-rtdb.firebaseio.com",
    // projectId: "assam-lottery",
    // storageBucket: "assam-lottery.appspot.com",
    // messagingSenderId: "609439525126",
    // appId: "1:609439525126:web:1885c63073dfd3e9119687",
    // measurementId: "G-HE0ETML5F3"
  };


  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export default ()=>{
      return {firebase,auth,database,storage}
  }

//   const firebaseConfig = {
//     apiKey: "AIzaSyDNfWdOJ-TKIRFP-iQSJ5BIGwqFkqkp5d8",
//     authDomain: "lottery-c00c3.firebaseapp.com",
//     databaseURL: "https://lottery-c00c3-default-rtdb.firebaseio.com",
//     projectId: "lottery-c00c3",
//     storageBucket: "lottery-c00c3.appspot.com",
//     messagingSenderId: "596096256145",
//     appId: "1:596096256145:web:81cf9d2352fa32692fd730",
//     measurementId: "G-81KWGWKDCQ"
//   };