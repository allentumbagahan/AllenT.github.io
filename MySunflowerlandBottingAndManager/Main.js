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