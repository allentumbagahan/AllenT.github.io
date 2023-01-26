    loadData = ""
    ConfigOneTime = 0
    ConfigDB()
    async function ConfigDB(){
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
          if (ConfigOneTime == 0){
            const checkfirebase = new Promise((res, err) => {
                if('firebase' in window){
                    res(true)
                }
            })
            if (await checkfirebase){
                        // Initialize Firebase
                firebase.initializeApp(firebaseConfig)
                ConfigOneTime++
            }

        }
        
        const inzApp = new Promise ((res, err) => {
            if('firestore' in firebase){
                res(true)
            }
        })
        if (await inzApp){
            // Initialize Cloud Firestore and get a reference to the service
                db = firebase.firestore();
           DBconnected()
        }
          

    }
    
    function SaveToDb(data){
    
    //Add data
        const { 
            date,
            landId, 
            kitchen, 
            grublist, 
            balance, 
            plotSRC, 
            plotsPlanted,
            trees,
            AutoFarmVersion } = data
        db.collection("Accounts").doc(`${landId}`)
        .set({
            date: date,
            SFlbalance: balance,
            kitchen: kitchen,
            trees: trees,
            grublist: grublist,
            plots: plotSRC,
            plotsPlanted: plotsPlanted,
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
                console.log("Document data:", doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
        
    }

    
    function Register(landId){
        RegisteredLands = { list : [] }
        var docRef = db.collection("Accounts").doc("AccountList")
        docRef.get().then((doc) => {
            if (doc.exists) {
                RegisteredLands = doc.data()
                if (RegisteredLands.list.length > 0) {
                    if (RegisteredLands.list.includes(landId)){
                        console.log('land already registered')
                    }
                    else
                    {
                        RegisteredLands = doc.data()
                        RegisteredLands.list.push(landId)
                        db.collection("Accounts").doc('AccountList')
                        .set({
                
                            list: RegisteredLands.list
                
                        })
                        .then(() => {
                            console.log('registration finished')
                        }) .catch((error) => {
                            console.log("Error registration document:", error);
                        });
                    }
                }else{
    
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });


    }



