mainBox = document.getElementsByClassName('box fixheight')[0]
sflICON = "https://assets.coingecko.com/coins/images/25514/small/download.png?1652164203"
kICON = "data:image/png;base64,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"
var cards = []
var TotalBalance = 0
LastGenListCount = 0
UpdatedElement = 0



class card {
    constructor(id){
        this.bot = this.bot
        this.countClick = 0
        this.date = this.date
        this.trees = this.trees
        this.id = id
        this.chef = this.chef
        this.bal = 0
        this.data = this.data
        this.elem1_4 = this.elem1_4
        this.elem1_4_1 = this.elem1_4_1 // date
        this.elem1_3 = this.elem1_3
        this.elem1_3_1 = this.elem1_3_1
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
        this.elem1_2 = this.elem1_2
        this.elem1_5 = this.elem1_5
        this.elem1_5_1 = this.elem1_5_1
        this.grublist = { 
            grubElem : [],
            grubImg : []
        }
    }
    
    GetDataToDb() {
            var docRef = db.collection("Accounts").doc(this.id)
            var btndocRef = db.collection("BotButton").doc(this.id)
            docRef.onSnapshot((doc) => {
                
                if (doc.exists) {
                    this.data = doc.data()
                    this.UpdateProperty()
                } else {
                    // doc.data() will be undefined in this case
                    console.log(this.id + "No such document!");
                }
            })
            btndocRef.onSnapshot((doc) => {
                if (doc.exists) {
                    const { bot }  = doc.data()
                    this.bot = bot
                    console.log(this.bot)
                    this.UpdateProperty()
                } else {
                    // doc.data() will be undefined in this case
                    console.log(this.id + "No such document!");
                }
            })
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

        this.elem1_2 = document.createElement('div')
        this.elem1_2.setAttribute('id', 'container2')
        this.elem1.appendChild(this.elem1_2)

        this.elem1_3 = document.createElement('div')
        this.elem1_3.setAttribute('class', 'fh mxf ')
        this.elem1.appendChild(this.elem1_3)
        this.elem1_3_1 = document.createElement('h3')
        this.elem1_3_1.setAttribute('id', 'trees')
        this.elem1_3.appendChild(this.elem1_3_1)
        
        this.elem1_4 = document.createElement('div')
        this.elem1_4.setAttribute('class', 'fh mxf ')
        this.elem1.appendChild(this.elem1_4)
        this.elem1_4_1 = document.createElement('h3')
        this.elem1_4_1.setAttribute('id', 'date')
        this.elem1_4.appendChild(this.elem1_4_1)

        this.elem1_5 = document.createElement('button')
        this.elem1_5.setAttribute('id', 'bot')
        this.elem1_5.setAttribute("style", "display: block; margin-left: auto; margin-right: auto; border: #5d3e02 solid 2px; border-radius: 20px; --tw-bg-opacity: 1; background-color: rgb(185 111 80 / var(--tw-bg-opacity));")
        this.elem1.appendChild(this.elem1_5)
        this.elem1_5_1 = document.createElement('h3')
        this.elem1_5_1.innerText = "NOT CONNECTED"
        this.elem1_5.appendChild(this.elem1_5_1)


        for (let x =0; x < 12; x++){
            let Elem1 = document.createElement('div')
            Elem1.setAttribute("class", "relative")
            Elem1.setAttribute("style", "position: relative;     height: fit-content; max-height: fit-content;")
            let Elem2 = document.createElement('div')
            Elem2.setAttribute("class", "bg-brown-600 cursor-pointer relative cursor-pointer")
            Elem2.setAttribute("style", 'width: 47.25px; height: 47.25px; margin: 7.875px 7.875px 5.25px 5.25px; border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAgMAAACd/+6DAAAABGdBTUEAALGPC/xhBQAAAAlQTFRFAAAA7qRoGBQlo4eEUgAAAAF0Uk5TAEDm2GYAAAAZSURBVAjXY+BawcCgGsbAMIGxAQODxIHyAIsgB7CF1qipAAAAAElFTkSuQmCC") 22.2222% / 1 / 0 repeat; border-style: solid; border-width: 5.25px; image-rendering: pixelated; border-radius: 13.125px;  --tw-bg-opacity: 1;background-color: rgb(185 111 80 / var(--tw-bg-opacity)); position: relative;')
            let Elem3 = document.createElement('div')
            Elem3.setAttribute("class", "absolute flex justify-center items-center w-full h-full")
            Elem3.setAttribute("style", "justify-content: center; align-items: center; width: 100%; display: flex; position: absolute;")
            let Elem4 = document.createElement('div')
            Elem4.setAttribute("class", "flex justify-center items-center")
            Elem4.setAttribute("style", "width: 36.75px; height: 36.75px; justify-content: center; align-items: center; display: flex; ")
            let Elem5 = document.createElement('img')
            this.grublist.grubElem.push(Elem5)
            Elem5.setAttribute("class", "relative")
            Elem5.setAttribute("style", "position: relative")
            Elem5.setAttribute("alt", "item")
            //Elem5.setAttribute("src", `${grubList[x]}`)
            Elem5.setAttribute("style", "opacity: 1; transform: scale(2.625);   position: relative;  display: block; vertical-align: middle;")
            Elem4.appendChild(Elem5)
            Elem3.appendChild(Elem4)
            Elem2.appendChild(Elem3)
            Elem1.appendChild(Elem2)
            this.elem1_2.appendChild(Elem1)
            }
    
        }

    UpdateProperty(){
        this.chef = this.data.kitchen
        this.bal = this.data.SFlbalance
        this.elem1_1_2_1_2.innerHTML = this.bal
        this.elem1_1_2_2_2.innerHTML = this.chef
        this.grublist.grubImg = this.data.grublist 
        this.date = this.data.date
        this.trees = this.data.trees
        this.elem1_4_1.innerHTML = this.date
        this.elem1_3_1.innerHTML = this.trees
        if(this.bot != undefined || this.bot != null){
            this.elem1_5_1.innerText = this.bot
        }
        this.UpdateView()
        observer.observe(this.elem1)
        UpdatedElement++
    }
    UpdateView(){
        this.elem1_5.setAttribute('onclick', `clickStartBot(${this.id, this.elem1_5_1})`)
        for(let x =0; x < this.grublist.grubElem.length; x++){
            console.log(this.grublist.grubImg[x])
            let a = ItemnameToImageData(this.grublist.grubImg[x])
            console.log(a)
            let ImageD = new Promise (async (res) => {
                try {      
                    if (a != undefined || a != null){
                        res()
                    }
                }
                catch {

                }
            })
            ImageD.then(() => {
                this.grublist.grubElem[x].setAttribute("src", `${a}`)
            })

        }
    }

}

function Calculate(){
    TotalBalance = 0
    cards.forEach((card) => {
        TotalBalance = TotalBalance + parseFloat(card.bal)
    });
    document.getElementById('TotalSFL').innerHTML = " " + TotalBalance
}

function ConnectHandshake(){
    loadAllLands()
    setTimeout(() => {
        if (RegisteredLands.list.length != LastGenListCount){
            GenCards()
        }


    }, 5000)

}
async function GenCards(){
    UpdatedElement = 0
    TotalBalance = 0
    clear(mainBox)
    AllLands = RegisteredLands.list
    for (x = 0; x < AllLands.length; x++){
        console.log(AllLands[x])
        cards.push(new card(AllLands[x]))
        console.log(AllLands[x])
        cards[x].CreateCardView()
        cards[x].GetDataToDb()
        if (x == ( AllLands.length -1 )){
            console.log('true loop')
        }

    }
    LastGenListCount = RegisteredLands.list.length
    let build = new Promise((res) => {
        cards.forEach((element) => {
            console.log(UpdatedElement)
            if (UpdatedElement == LastGenListCount){
                res(true)
            }
        });
    })
    if (await build){
        Calculate()
        console.log(Calculate() + 'calculate')
    }
}

function clear(elem) { 
    elem.innerHTML = '';
  }

function ComputeTotalbal(val) {
    bal = parseFloat(val)
    TotalBalance += bal
    
}

ConnectToApi()

function clickStartBot(id, botElem){
    console.log(botElem)
    switch(botElem){
        case "Start Bot":
            BotSaveToDb(id, "Stop Bot")
            console.log(id + " saving " + "Stop Bot")
            break;
        case "Stop Bot":
            BotSaveToDb(id, "Start Bot")
            console.log(id + " saving " + "Start Bot")
            break;
    }
}

