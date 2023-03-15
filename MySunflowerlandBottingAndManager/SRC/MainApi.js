var LoadedData = ""

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
    firebase.initializeApp(firebaseConfig);
    // Initialize Cloud Firestore and get a reference to the service
    const db = firebase.firestore();





var docAccountList = db.collection("Accounts").doc("AccountList")

function loadToDb(id) {
    var docRef = db.collection("Accounts").doc(id);

    docRef.onSnapshot((doc) => {
        if (doc.exists) {
            LoadedData = doc.data()
            console.log("Document data:", LoadedData);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            LoadedData = "No such document!"
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

async function GetSFLPrice(){
    const url = await window.fetch('https://api.coingecko.com/api/v3/simple/price?ids=sunflower-land&vs_currencies=PHP', {
        method: "GET",
        headers: {
            "content-type": "application/json;charset=UTF-8",
            accept: "application/json"
        }
    })
    return await url.json()
}

function ConnectToApi() {
    ConnectHandshake()
}