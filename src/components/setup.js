import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
const firebaseConfig = {

    apiKey: "AIzaSyA3y7xVDMILXuVNOkDLLxeAt4DNpXBEebU",
    authDomain: "rentalapp-ce880.firebaseapp.com",
    databaseURL: "https://rentalapp-ce880-default-rtdb.firebaseio.com",
    projectId: "rentalapp-ce880",
    storageBucket: "rentalapp-ce880.appspot.com",
    messagingSenderId: "829337695328",
    appId: "1:829337695328:web:db1706d70f3fcf1bc7bf05",
    measurementId: "G-HFW1KH4PK8"
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