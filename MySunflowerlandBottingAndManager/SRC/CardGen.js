mainBox = document.getElementsByClassName('box fixheight')[0]
var cards = []
class Card {
    constructor(id){
        this.id = id
        this.chef = this.chef
        this.bal = this.bal
        this.data = this.data
        this.elem1 = this.elem1
        this.elem2 = this.elem2
        this.elem3 = this.elem3
        this.elem4 = this.elem4
        this.elem5 = this.elem5
        this.elem6 = this.elem6
        this.elem7 = this.elem7
        this.elem8 = this.elem8
        this.elem9 = this.elem9
        this.elem10 = this.elem10
        this.elem11= this.elem11
    }
    GetDataToDb() {
        loadToDb(this.id)
        console.log(this.bal)
    }
    CreateCardView(){
        this.elem1 = document.createElement('div')
        this.elem1.setAttribute('class', 'card')
        mainBox.appendChild(this.elem1)
    }
}


function ConnectHandshake(){
    //loadAllLands()
    //const AllLands = RegisteredLands.list
    cards.push(new Card("16527"))
    cards[0].GetDataToDb()
    cards[0].CreateCardView()
}

ConnectToApi()