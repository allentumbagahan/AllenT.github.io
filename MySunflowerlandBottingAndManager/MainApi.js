import { initializeApp } from "/firebase/app"; 
import { getFirestore } from "/firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBC6W49ilLK5mWHsP2MXKyiIjmLyRGkFiQ",
    authDomain: "allentumbagahan-9610f.firebaseapp.com",
    databaseURL: "https://allentumbagahan-9610f-default-rtdb.firebaseio.com",
    projectId: "allentumbagahan-9610f",
    storageBucket: "allentumbagahan-9610f.appspot.com",
    messagingSenderId: "702145349166",
    appId: "1:702145349166:web:5ca10176bf764ad6cd41bf",
    measurementId: "G-NRS398L5KQ"
  };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);


var docAccountList = db.collection("Accounts").doc("AccountList")

function loadToDb(id) {
    var docRef = db.collection("Accounts").doc(id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            loadData = doc.data()
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function loadAllLands() {
    docAccountList.get().then((doc) => {
        if (doc.exists) {
            RegisteredLands = doc.data()
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

loadAllLands()