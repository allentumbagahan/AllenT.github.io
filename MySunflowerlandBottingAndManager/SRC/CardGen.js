mainBox = document.getElementsByClassName('box fixheight')[0]
sflICON = "https://assets.coingecko.com/coins/images/25514/small/download.png?1652164203"
kICON = "data:image/png;base64,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"
var cards = []
LastGenCount = 0
class Card {
    constructor(id){
        this.id = id
        this.chef = this.chef
        this.bal = this.bal
        this.data = this.data
        this.elem1 = this.elem1
        this.elem1_1 = this.elem1_1
        this.elem1_1_1 = this.elem1_1_1
        this.elem1_1_1_1 = this.elem1_1_1_1
        this.elem1_1_2 = this.elem1_1_2
        this.elem1_1_2_1 = this.elem1_1_2_1
        this.elem1_1_2_2 = this.elem1_1_2_2
        this.elem1_1_2_1_1 = this.elem1_1_2_1_1
        this.elem1_1_2_1_2 = this.elem1_1_2_1_2
        this.elem1_1_2_2_1 = this.elem1_1_2_2_1
        this.elem1_1_2_2_2 = this.elem1_1_2_2_2
        this.elem11 = this.elem11
    }
    GetDataToDb() { 
        var docRef = db.collection("Accounts").doc(this.id);
        docRef.get().then((doc) => {
            if (doc.exists) {
                this.data = doc.data()
                this.UpdateProperty()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    CreateCardView(){
        console.log(this.id)
        this.elem1 = document.createElement('div')
        this.elem1.setAttribute('class', 'card')
        mainBox.appendChild(this.elem1)
        this.elem1_1 = document.createElement('div')
        this.elem1_1.setAttribute('class', 'container1')
        this.elem1.appendChild(this.elem1_1)
        this.elem1_1_1 = document.createElement('div')
        this.elem1_1_1.setAttribute('class', 'profile')
        this.elem1_1.appendChild(this.elem1_1_1)
        this.elem1_1_1_1 = document.createElement('h2')
        this.elem1_1_1_1.setAttribute('id', 'landId')
        this.elem1_1_1_1.innerHTML = this.id
        this.elem1_1_1.appendChild(this.elem1_1_1_1)
        this.elem1_1_2 = document.createElement('div')
        this.elem1_1_2.setAttribute('class', 'container2')
        this.elem1_1.appendChild(this.elem1_1_2)
        this.elem1_1_2_1 = document.createElement('div')
        this.elem1_1_2_1.setAttribute('class', 'textbox1')
        this.elem1_1_2.appendChild(this.elem1_1_2_1)
        this.elem1_1_2_2 = document.createElement('div')
        this.elem1_1_2_2.setAttribute('class', 'textbox1')
        this.elem1_1_2_2.setAttribute('id', 'chef')
        this.elem1_1_2.appendChild(this.elem1_1_2_2)
        this.elem1_1_2_1_1 = document.createElement('img')
        this.elem1_1_2_1_1.setAttribute('class', 'icon')
        this.elem1_1_2_1_1.setAttribute("src", `${sflICON}`)
        this.elem1_1_2_1.appendChild(this.elem1_1_2_1_1)
        this.elem1_1_2_1_2 = document.createElement('h3')
        this.elem1_1_2_1_2.setAttribute('id', 'sflBalance')
        this.elem1_1_2_1.appendChild(this.elem1_1_2_1_2)
        this.elem1_1_2_2_1 = document.createElement('img')
        this.elem1_1_2_2_1.setAttribute('class', 'icon')
        this.elem1_1_2_2_1.setAttribute("src", `${kICON}`)
        this.elem1_1_2_2.appendChild(this.elem1_1_2_2_1)
        this.elem1_1_2_2_2 = document.createElement('h3')
        this.elem1_1_2_2.appendChild(this.elem1_1_2_2_2)

    }
    UpdateProperty(){
        this.chef = this.data.kitchen
        this.bal = this.data.SFlbalance
        this.elem1_1_2_1_2.innerHTML = this.bal
        this.elem1_1_2_2_2.innerHTML = this.chef
    }
}


function ConnectHandshake(){

    setInterval(
        function() {
            loadAllLands()
            if (RegisteredLands.list.length != LastGenCount){
                GenCards()
            }
        }, 
        5000)

}
function GenCards(){
    clear(mainBox)
    AllLands = RegisteredLands.list
    for (x = 0; x < AllLands.length; x++){
        cards.push(new Card(AllLands[x]))
        console.log(AllLands[x])
        cards[x].GetDataToDb()
        cards[x].CreateCardView()
    }
    LastGenCount = AllLands.length
}

function clear(elem) {
    elem.innerHTML = '';
  }
ConnectToApi()

