
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
    
    function SaveToDb (){
    //config


    
    //Add data
        db.collection("users").add({
            first: "Allen",
            last: "Tumbagahan",
            born: 1815
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }



