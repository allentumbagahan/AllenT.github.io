    loadData = ""
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
            firebase.initializeApp(firebaseConfig)
                        // Initialize Cloud Firestore and get a reference to the service
            const db = firebase.firestore();
    
    function SaveToDb(data){
    
    //Add data
        const { 
            landId, 
            kitchen, 
            grublist, 
            balance, 
            AutoFarming, 
            plotSRC, 
            plotsPlanted,
            trees,
            AutoFarmVersion } = data
        db.collection("Accounts").doc(`${landId}`)
        .set({

            SFlbalance: balance,
            kitchen: kitchen,
            trees: trees,
            grublist: grublist,
            plots: plotSRC,
            plotsPlanted: plotsPlanted,
            AutoFarming: AutoFarming,
            AutoFarmVersion: AutoFarmVersion


        })
        .then(() => {
            console.log(`Document written with custom ID: ${landId}`);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
    }

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

    RegisteredLands = []
    function Register(landId){
        var docRef = db.collection("Accounts").doc("AccountList")
        docRef.get().then((doc) => {
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
            if (RegisteredLands.includes(landId)){
                console.log('land not yet registered')
            }
            else{
                var LandList = RegisteredLands.push(landId)
                db.collection("Accounts").doc('AccountList')
                .set({
        
                    list: LandList,
        
                })
                .then(() => {
                    console.log(`Document written with custom ID: ${landId}`);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
            }
    }
    DBconnected()

