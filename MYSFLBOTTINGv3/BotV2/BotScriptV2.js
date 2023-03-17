// script version
const version = 0.08
var seedAuto = 0
isSetupDone = false
currentURl = window.location.href

function addJavascript(jsname,pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
    return true
};
    jsQueryCode = new Promise ((res)=>{
        let a =  addJavascript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js','head');
        if(a){
            res()
        }
    })

    jsCode1 = new Promise ((res)=>{
        let a = addJavascript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js','body'); 
        if(a){
            res()
        }
    })
    jsCode2 = new Promise ((res)=>{
        let a = addJavascript('https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js','body');
        if(a){
            res()
        }
    })


    landFirebaseLoc = ""
    loadData = ""
    ConfigOneTime = 0

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
          const checkfirebase = new Promise((res) => {
            console.log("firebase in window")
              if('firebase' in window){
                  res(true)
              }
          })
          const inzApp = new Promise ((res) => {
            try{
                console.log("firestore in firebase")
                if('firestore' in firebase){
                    res(true)
                }
            }
            catch{

            }
          })
          if (ConfigOneTime == 0){
              console.log(checkfirebase)
              checkfirebase.then(()=>{
                  console.log("initializing firebase")
                  // Initialize Firebase
                  if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig)
                }
                  ConfigOneTime++
                })
                setTimeout(ConfigDB, 5000)  
        }
        inzApp.then(()=>{
            // Initialize Cloud Firestore and get a reference to the service
            console.log("initializing Cloud Firestore")
            db = firebase.firestore();
            //start the script if the firebase is ready
            if (!isSetupDone){
                setup()
            }
        })

    }

//make sure jquery was added

//variables
const cropListName = [
    "Sunflower Seed",
    "Potato Seed",
    "Pumpkin Seed",
    "Carrot Seed",
    "Cabbage Seed",
    "Beetroot Seed",
    "Cauliflower Seed",
    "Parsnip Seed",
    "Radish Seed",
    "Wheat Seed",
    "Kale Seed"]



//classes
class plot{
    constructor(parentElem, pointer){
        this.parentElem = parentElem 
        this.button = pointer //this.parentElem.children[this.parentElem.children.length - 1]
        this.span = this.parentElem.getElementsByTagName('span') // find if there is plant cooldown
        this.readyP = (this.span.length == 0)? true : false
        this.plantCD = (!this.readyP)? this.span[this.span.length - 1].innerHTML : false
    }

    clickPlot(){
        this.button.click()
    }
}
class food{
    constructor(Name, RecipeList, RecipeNeeded){
        this.Name = Name
        this.RecipeList = RecipeList
        this.RecipeNeeded = RecipeNeeded
        this.Fullfilled = 'not'
    }
    // use in food object in grub
    GetCropSeedsInInventory(totalStock, x){
        let a = data.inventory[this.RecipeList[x] + " Seed"]
        if (a != undefined){
            if(a >= totalStock){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    check(){
        let aa = 0 // increase if one recipe is not fullfill
        for(let x = 0; x < this.RecipeList.length; x++){
            let a, b; // a is the total number of crops needed - crops in inventory and b is the total seeds needed to buy in market
            // check if food mission kale meet the player the req.
            if(this.Name == "Kale Stew" && bumpkinLevel <= 6){
                break;
            }
            if(crops[`${this.RecipeList[x]}`] == undefined){
                // if we dont have stock on inventory then buy seeds 
                a = this.RecipeNeeded[this.RecipeList[x]]
            }
            else{
                // if we have stock on inventory then
                
                a = Math.ceil(this.RecipeNeeded[this.RecipeList[x]] - crops[`${this.RecipeList[x]}`])// inventory crops stock - recipe needed
                
            }

            if (a > 0){
                aa++ // increase because crops from inventory is insufficient
                console.log(this.RecipeList[x] + " needed :" + a)

                if(data.inventory[`${this.RecipeList[x]} Seed`] != undefined){
                    // calculate the needed seeds to buy in market using equation seeds form invertory - seeds needed
                    if ( data.inventory[`${this.RecipeList[x]} Seed`] > a){
                        b = data.inventory[`${this.RecipeList[x]} Seed`] - a
                    }
                    else {
                        b = a - data.inventory[`${this.RecipeList[x]} Seed`]
                    }
                    console.log(this.RecipeList[x] + " : the needed seeds to buy " + b)
                       

                    
                    
                }
            }else{
                console.log(`${this.RecipeList[x]} is fullfil`)
            }

            // lets buy in market
            if (b > 0) {
                // check if the market have enought stock
                if (data.stock[`${this.RecipeList[x]} Seed`] > b){
                    console.log("buying seeds")
                    setTimeout(()=>{
                        buySeeds(`${this.RecipeList[x]} Seed`, b)
                    }, 20000)
                }
                else {
                    console.log("market needs to restock")
                }
            }
        }
        if (aa == 0){
            this.Fullfilled = "yes"
        }

        
    }
}
//functions
function GenerateFoodsRecipe(){
    foods = []
    foods.push(new food('Mashed Potato', ['Potato'], 
    {
         'Potato' : 10 
}))
    foods.push(new food('Pumpkin Soup', ['Pumpkin'], 
    {
         'Pumpkin': 10 
}))
    foods.push(new food('Bumpkin Broth', ['Carrot', 'Cabbage'], 
    { 
         'Carrot': 10,
         'Cabbage': 5 
}))
    foods.push(new food('Boiled Eggs', ['Egg'], 
    {
         'Egg': 5
    }))
    foods.push(new food('Kale Stew', ['Kale'], 
    {
         'Kale': 5
    }))
    foods.push(new food('Roast Veggies', ['Cauliflower', 'Carrot'], 
    {
         'Cauliflower': 15,
         'Carrot': 10
    }))
    foods.push(new food('Bumpkin Salad', ['Beetroot', 'Parsnip'], 
    {
         'Beetroot': 20,
         'Parsnip': 10
    }))
    foods.push(new food('Goblin\'s Treat', ['Pumpkin', 'Radish', 'Cabbage'], 
    {
         'Pumpkin': 10,
         'Radish': 20,
         'Cabbage': 10
    }))
    foods.push(new food('Cauliflower Burger', ['Cauliflower', 'Wheat'], 
    {
         'Cauliflower': 15,
         'Wheat': 5
    }))
    foods.push(new food('Club Sandwich', ['Sunflower', 'Carrot', 'Wheat'], 
    {
         'Sunflower': 100,
         'Carrot': 25,
         'Wheat': 5
    }))
    foods.push(new food('Sunflower Crunch', ['Sunflower'], 
    {
         'Sunflower': 300
    }))
}


function GetFirstHandle(){
    // get first handle balance
    let span = document.querySelector("#root > div > div > div.absolute.w-full.h-full.z-10 > div.absolute.z-40 > div:nth-child(8) > div > div.flex.flex-col.items-center > div:nth-child(1) > div > div.absolute.z-10 > div > span")
    FirstHandleBalance = parseInt(span.innerText)
    //get first handle name
    let Items = localStorage['inventory.selectedItems'].split(",")
    let aa = Items[0].replace('\"', '')
    aa = aa.replace('"', '')
    aa = aa.replace('[', '')
    aa = aa.replace(']', '')
    FirstHandleName = aa
}

function FindPlots(){
    // identify plots
AllDivRelative = $('div.w-full.h-full.relative')
allPointer = $('img.absolute.z-40.cursor-pointer.opacity-0')
plots = []
parents = []
for(let e=0; AllDivRelative.length > e; e++){
    if(AllDivRelative[e].getAttribute('class') == 'w-full h-full relative'){
        parents.push(AllDivRelative[e])
    }   
}
for(let f=0; f < parents.length; f++){
    plots.push(new plot(parents[f], allPointer[f]))
}
}

async function UpdateInGameData(id){
    ID = id
    async function GetSFLData(){
        try {
            console.log("updating data from sfl")
        const url = await window.fetch(`https://api.sunflower-land.com/visit/${ID}`, {
            method: "GET",
            headers: {
                "content-type": "application/json;charset=UTF-8",
                accept: "application/json"
            }
        })
        return await url.json()
        }
        catch{
            console.log("error")
            return "error"
        }
    }
    setTimeout(async()=>{
        getData = await GetSFLData(currentURl.replace('https://sunflower-land.com/play/#/land/', '')).then(function(val){
            if(val){
                try{
                    data = val.state
                    inventory = data.inventory
                    crops = {
                        Sunflower : data.inventory.Sunflower,
                        Potato : data.inventory.Potato,
                        Pumpkin : data.inventory.Pumpkin,
                        Carrots : data.inventory.Carrots,
                        Cabbage : data.inventory.Cabbage,
                        Beetroot : data.inventory.Beetroot,
                        Cauliflower : data.inventory.Cauliflower,
                        Parsnip : data.inventory.Parsnip, 
                        Radish : data.inventory.Radish,
                        Wheat : data.inventory.Wheat,
                        Kale : data.inventory.Kale
                     }
                     return true
                }
                catch{
                    return "error"
                }
            }
            else {
                return "error"
            }
       })
    }, 60000)
}



    /* Buttons and others container for botting */
function createBottingButton(){


    mydiv = $("div[class='buttonsDiv']")
    if(mydiv.length != 0){
        mydiv[0].remove()
    }

    mainBTN = document.getElementsByClassName('flex flex-col items-center fixed z-50')[0]
    element1BTN = document.createElement('div')
    element1BTN.setAttribute("class", "mybottingdiv")
    mainBTN.appendChild(element1BTN)

    elementForButtons = document.createElement('div')
    elementForButtons.setAttribute("class", "buttonsDiv")
    elementForButtons.setAttribute("style", "display: grid; justify-items: center;")

    mainBTN.appendChild(elementForButtons)

    elem3BTN = document.createElement('button')
    elem3BTN.innerHTML = "More Menu"
    elem3BTN.setAttribute("onclick", "settings()")
    elementForButtons.appendChild(elem3BTN)


    
    elem4BTN = document.createElement('button')
    elem4BTN.innerHTML = `Starting Seed : ${cropListName[seedAuto]}`
    elem4BTN.setAttribute("onclick", "changeSeedAuto()")
    elementForButtons.appendChild(elem4BTN)

    elem5BTN = document.createElement('button')
    elem5BTN.innerHTML = `Stock : ${data.inventory[cropListName[seedAuto]]}`
    elem5BTN.setAttribute("onclick", "changeSeedAuto()")
    elementForButtons.appendChild(elem5BTN)

    elem1_3BTN = document.createElement('button')
    elem1_3BTN.innerHTML = "Start Bot"
    elem1_3BTN.setAttribute("onclick", `Autofarm("${cropListName[seedAuto]}")`)
    elementForButtons.appendChild(elem1_3BTN)
    
    elem5TEXT = document.createElement('h3')
    elem5TEXT.innerHTML = version
    elementForButtons.appendChild(elem5TEXT)
    

    
}
function changeSeedAuto(){
    if(seedAuto == 10){
        seedAuto = 0
    }
    else{
        seedAuto++ 
    }

    // update view
    createBottingButton()
}

function settings(){
            
    parentmain = document.getElementsByTagName('body')[0]

    element1aDialog = document.createElement('div')
        element1aDialog.setAttribute("class", "fade modal-backdrop show")

    element1bDialog = document.createElement('div')
        element1bDialog.setAttribute("role", "dialog")
        element1bDialog.setAttribute("aria-modal", "true")
        element1bDialog.setAttribute("class", "fade modal show")
        element1bDialog.setAttribute("tabindex", "-1")
        element1bDialog.setAttribute("style", "display: block;")

    element2bDialog = document.createElement('div')
    element2bDialog.setAttribute("class", "modal-dialog modal-dialog-centered")

    element3bDialog = document.createElement('div')
    element3bDialog.setAttribute("class", "modal-content")

    element4bDialog = document.createElement('div')
    element4bDialog.setAttribute("class", "bg-brown-600 text-white relative")
    element4bDialog.setAttribute("style", 'border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAgMAAACd/+6DAAAABGdBTUEAALGPC/xhBQAAAAlQTFRFAAAA7qRoGBQlo4eEUgAAAAF0Uk5TAEDm2GYAAAAZSURBVAjXY+BawcCgGsbAMIGxAQODxIHyAIsgB7CF1qipAAAAAElFTkSuQmCC") 22.2222% / 1 / 0 repeat; border-style: solid; border-width: 5.25px; image-rendering: pixelated; border-radius: 13.125px; padding: 39.375px 2.625px 2.625px;')

    element5bDialog = document.createElement('div')
    element5bDialog.setAttribute("class", "bg-brown-300 box")
    element5bDialog.setAttribute("style", ' display: flex; flex-wrap: wrap; overflow: hidden; border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAgMAAACd/+6DAAAABGdBTUEAALGPC/xhBQAAAAlQTFRFAAAA6tSqGBQlHYAABgAAAAF0Uk5TAEDm2GYAAAAZSURBVAjXY+BawcCgGsbAMIGxAQODxIHyAIsgB7CF1qipAAAAAElFTkSuQmCC") 22.2222% / 1 / 0 repeat; border-style: solid; border-width: 5.25px; image-rendering: pixelated; border-radius: 13.125px; padding: 2.625px;')   

    element6bDialog = document.createElement('div')
    element6bDialog.setAttribute("class", "absolute flex")
    element6bDialog.setAttribute("style", "top: 2.625px; left: 2.625px; right: 2.625px;")

    element6bDialog = document.createElement('div')
    element6bDialog.setAttribute("class", "absolute flex")
    element6bDialog.setAttribute("style", "top: 2.625px; left: 2.625px; right: 2.625px;")

    element7bDialog = document.createElement('img')
    element7bDialog.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALAgMAAADUwp+1AAAABGdBTUEAALGPC/xhBQAAAAxQTFRFAAAAi5u0GBQl////mo6iugAAAAF0Uk5TAEDm2GYAAAA1SURBVAjXY9BiWsCwv/sHw/z3Nxim/49gUPuXwMD9v4FB//4Dhv3hPxjmpt5gmNoZwQBUBwCl3RKJRykUxQAAAABJRU5ErkJggg==")
    element7bDialog.setAttribute("class", "absolute cursor-pointer z-20")    
    element7bDialog.setAttribute("style", "top: 2.625px; right: 2.625px; width: 28.875px;")
    element7bDialog.setAttribute("onclick", "closeDialog()")


    element5b_bDialog = document.createElement('div')
    element5b_bDialog.setAttribute("class", "flex flex-col-reverse sm:flex-row")    
    
    parentmain.appendChild(element1aDialog)
    parentmain.appendChild(element1bDialog)
    element1bDialog.appendChild(element2bDialog)
    element2bDialog.appendChild(element3bDialog)
    element3bDialog.appendChild(element4bDialog)
    element4bDialog.appendChild(element5bDialog)
    element5bDialog.appendChild(element6bDialog)
    element6bDialog.appendChild(element7bDialog)
    element5bDialog.appendChild(element5b_bDialog)|

    grubshopValue()
    for (let x =0; x < grubList.length; x++){
        let Elem1 = document.createElement('div')
        Elem1.setAttribute("class", "relative")
        let Elem2 = document.createElement('div')
        Elem2.setAttribute("class", "bg-brown-600 cursor-pointer relative cursor-pointer")
        Elem2.setAttribute("style", 'width: 47.25px; height: 47.25px; margin: 7.875px 7.875px 5.25px 5.25px; border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAgMAAACd/+6DAAAABGdBTUEAALGPC/xhBQAAAAlQTFRFAAAA7qRoGBQlo4eEUgAAAAF0Uk5TAEDm2GYAAAAZSURBVAjXY+BawcCgGsbAMIGxAQODxIHyAIsgB7CF1qipAAAAAElFTkSuQmCC") 22.2222% / 1 / 0 repeat; border-style: solid; border-width: 5.25px; image-rendering: pixelated; border-radius: 13.125px;')
        let Elem3 = document.createElement('div')
        Elem3.setAttribute("class", "absolute flex justify-center items-center w-full h-full")
        let Elem4 = document.createElement('div')
        Elem4.setAttribute("class", "flex justify-center items-center")
        Elem4.setAttribute("style", "width: 36.75px; height: 36.75px;")
        let Elem5 = document.createElement('img')
        Elem5.setAttribute("class", "relative")
        Elem5.setAttribute("src", `${grubList[x]}`)
        Elem5.setAttribute("alt", "item")
        Elem5.setAttribute("style", "opacity: 1; transform: scale(2.625);")
        Elem4.appendChild(Elem5)
        Elem3.appendChild(Elem4)
        Elem2.appendChild(Elem3)
        Elem1.appendChild(Elem2)
        element5bDialog.appendChild(Elem1)
        }
}
function closeDialog(){
    element1bDialog.setAttribute("class", "fade modal")
    element1aDialog.setAttribute("class", "fade modal-backdrop")
    element1bDialog.remove()
    element1aDialog.remove()
}
function UpdateReadyPlots(){
    readyPlots = []
    // get ready plots
    for(let x = 0; x < plots.length; x++){
        if(plots[x].readyP){
            readyPlots.push(plots[x])
        }
    }
}
function buySeeds(seedName, count, buyNextIfEmpty){
    console.log("buying seed " + cropListName[cropListName.indexOf(seedName)])

    const marketButton = $("img[src='data:image/png;base64,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']")[0]
    marketButton.click()
    itemBox = $("div[class='w-full max-h-48 sm:max-h-96 sm:w-3/5 h-fit overflow-y-auto scrollable overflow-x-hidden p-1 mt-1 sm:mt-0 sm:mr-1 flex flex-wrap']")[0]
    if (count == 0 || count === undefined || count === null){
        n = 13 // needed seed to buy
    }
    else{
        n = count
    }
    stopBuying = false
    for(let x = 0; x < itemBox.children.length; x++){
        if(stopBuying){
            break;
        }
        clicOnShop = setTimeout(async () => {
            if (!stopBuying){
                itemBox.children[x].children[0].click()
                seedNameInShop = await $("span[class='text-center mb-1']")[0].innerText
                closebtn = $("img[src='https://sunflower-land.com/game-assets/icons/close.png']")[0]
                console.log(itemBox.children[x])
                if(seedNameInShop == seedName){
                    for(let c = 0; c < count; c++){
                        if (!stopBuying){
                            buyOneBtn = $("button[class='bg-brown-200 w-full p-1 text-xs object-contain justify-center items-center hover:bg-brown-300 cursor-pointer flex disabled:opacity-50  text-xxs sm:text-xs']")[0]

                            try {
                                if(buyOneBtn === undefined || buyOneBtn === null){
                                    closebtn.click()                       
                                    clearTimeout(clicOnShop)     
                                    stopBuying = true                         
                                }
                                else{
                                    if(n != 0){
                                        buyOneBtn.click()
                                        n--
                                    }
                                    else{
                                        clearTimeout(clicOnShop)     
                                        stopBuying = true    
                                    }
                                }
                            }
                            catch{
                                closebtn.click()                       
                                clearTimeout(clicOnShop)     
                                stopBuying = true                         
                                console.log("buying seed " + cropListName[cropListName.indexOf(seedName) - 1])
                            }
                        }

                    }
                    
                }
                if (x == (itemBox.children.length - 1)){
                    closebtn.click()
                    // then update data 
                    UpdateInGameData(LandId)
                    if(buyNextIfEmpty){
                        if(n > 0 ){
                            if (cropListName.indexOf(seedName) == 10){    
                                buySeeds(cropListName[0], n)
                            }
                            else{  
                                buySeeds(cropListName[cropListName.indexOf(seedName) + 1], n)
                            }
                        }
                    }else{
                        pickSeed(cropListName[0], true)
                    }
                }
            }


        }, (1500*x))
    }
    return n
}
async function pickSeed(name, buyNextIfEmpty){
    try {
        console.log("picking seed")
        var bagBtn = $("img[src='https://sunflower-land.com/game-assets/ui/round_button.png']")[0].click()
            console.log("getting seeds container")
            stop = false
            var bagContainer = $("div[class='flex mb-2 flex-wrap -ml-1.5']")[0]
            console.log(bagContainer.children.length)
            closebtn = await $("img[src='https://sunflower-land.com/game-assets/icons/close.png']")[0]
            for (let elem = 0; elem < bagContainer.children.length; elem++){
                console.log("finding")
                botclicker = setTimeout(()=>{
                    if(!stop){
                        console.log(elem)
                        console.log(bagContainer.children[elem].children[0])
                        bagContainer.children[elem].children[0].click()
                        let seedname = $("span[class='sm:text-center']")[0].innerText
                        console.log(seedname)
                        console.log(name)
                        if(seedname == name){
                           stop = true
                           clearTimeout(botclicker)
                           closebtn.click()
                        }
                        else{
                            console.log("pick another seed")
                            console.log(bagContainer.children.length - 1)
                            if (elem == bagContainer.children.length - 1){
                                //pick another
                                console.log(cropListName.indexOf(name))
                                if (buyNextIfEmpty){
                                    if (cropListName.indexOf(name) == 10){
                                        pickSeed(cropListName[0])
                                    }
                                    else{
                                        pickSeed(cropListName[cropListName.indexOf(name) + 1])
                                        console.log("picking seed " + cropListName[cropListName.indexOf(name) - 1])
                                    }
                                }else{
                                    closebtn.click()
                                    setTimeout(buySeeds(cropListName[cropListName.indexOf(name)], 13, false), 3000)
                                    
                                }
                            }
                        }
                    }

                }, 1000*elem)
        
            }
            
    
    }
    catch(err){
        console.log(err)
    }
}

function GetLandId(){
    if (window.location.hash.includes("land")){
        LandId = window.location.hash
        LandId = LandId.replace("#/land/", "")
        return true
    }
    else{
        return false
    }
}

async function Autofarm(seed, repeat){
    elem1_3BTN.innerHTML = "Stop Bot"
    let aa = 0 // count the repeat
    let a = repeat
    let e = 0
    setTimeout(pickSeed(seed, true), 10000) 
    IsPicking = false
    const timer = setInterval(()=> {   
        if(a == undefined || a == 0){
            a = 1000000
        }
        if (a == aa){
            clearInterval(timer)
        }
        if(e == 0){
            FindPlots()
            UpdateReadyPlots()
        }
        handleQuantity = $("div[class='bg-brown-600 cursor-pointer relative cursor-pointer']")[0].children
        if (handleQuantity.length == 2){
            handleQuantity = parseInt(handleQuantity[1].innerText)
            console.log(handleQuantity)
            if(handleQuantity == 0){
                pickSeed(seed, false)
            }
            else{
                if (handleQuantity != 0 && readyPlots.length != 0 && IsPicking == false){
                    try{
                        aa++
                        readyPlots[e].clickPlot()
                        if(e == readyPlots.length - 1){
                            e = 0
                        }
                        else {
                            e++
                        }  
                    }
                    catch (err) {
                        console.log(" click spot cant found " + err)
                    }
                }
            }
        }
        else{
            IsPicking = true
            clearInterval(timer)
            Autofarm(seed)
        }
    }, 2000)
}

async function checkCaptcha(){
    var modalCaptcha = $("div[class='fade modal show']")
    const getModal = new Promise((res)=>{
        if(modalCaptcha.length > 0){
            res(true)
        }
    })
    
    getModal.then((res)=>{
        console.log(res + "hello")
        console.log(" verifying ")
    setTimeout(() => {
        try{
            captchaModal = $("div[class='fade modal show']")
            console.log(" captcha detected ")
            if (captchaModal.length > 0){
                var chestIsReady = false
                chest = $("img[class='absolute w-16']")
                if(chest.length > 0){
                    chest.ready(function(){
                        chestIsReady = true
                    })
                    setTimeout(()=>{
                        if (chestIsReady){
                            chest[0].click()
                            setTimeout(()=> {
                                closeCaptcha = $("button[class='bg-brown-200 w-full p-1 text-xs object-contain justify-center items-center hover:bg-brown-300 cursor-pointer flex disabled:opacity-50  w-full mt-1']")[0]
                                closeCaptcha.click()
                            }, 1500)
                        }
                        else{
                            home = window.location.href
                            window.location.href = window.location.href + "/helios"
                            window.location.href = home
                        }
                    }, 1500)
                }
                else {
                    console.log("chest not found")
                    let home = window.location.href
                    window.location.href = window.location.href + "/helios"
                    window.location.href = home
                }
            }
        }
        catch (err) {
                console.log("no captcha" + err)
                let home = window.location.href
                window.location.href = window.location.href + "/helios"
                window.location.href = home
        }
        
    }, 1500)


    })
    

    
}

function kitchenData(){
    const kitchenB64 = "data:image/png;base64,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"
    closeB64 = "data:image/png;base64,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"
    let AllImage = document.getElementsByTagName("img")
    var kitchenBTN;
    // find kitchen buiding
    for (let x=0; x<AllImage.length; x++){
        if (AllImage[x].src == kitchenB64){
           AllImage[x].click()
           kitchenBTN = AllImage[x]
           console.log('found and click kitchen')
           break;
        }
    }
    if (kitchenBTN == ""){
        return "no kitchen built"
    }
    else 
    {

        // find close btn
        whatAreYouDoingChef = ""
        var closeBTN
        findClose()
        function findClose() {

            for (let x=0; x<AllImage.length; x++){
                if (AllImage[x].getAttribute("class") == "absolute cursor-pointer z-20"){
                    closeBTN = AllImage[x]
                    break;
                }
            }
            chefWhereAreYou =  document.getElementsByClassName('text-xxs sm:text-xs text-center my-1')
            whatAreYouDoingChef = (chefWhereAreYou.length != 0 )? chefWhereAreYou[0].innerHTML : "Chef is Waiting"
            try {
                closeBTN.click()
            }
            catch{
                whatAreYouDoingChef = "no kitchen"
            }
        }

        return whatAreYouDoingChef
    }
}   
// firebase
function snapData(id){
    RegisteredLands = { list : [] }
    var docRef = db.collection("Accounts").doc("AccountList")
    docRef.get().then((doc) => {
        if (doc.exists) {
            // check if land already registered
            RegisteredLands = doc.data()
            if(RegisteredLands.list.includes(id)){
                // already registered
                landFirebaseLoc = db.collection("Accounts").doc(`${id}`)
                landFirebaseLoc.onSnapshot((doc) => {
                    if(doc.exists){
                        // load land data
                        loadData = doc.data()

                        console.log(loadData)
                    }
                })
            }
            else{
                // land registration
                RegisteredLands = doc.data()
                RegisteredLands.list.push(id)
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
        }
    })


}
function save2DB(list){
    const { 
        date,
        kitchen, 
        grublist, 
        balance, 
        plotsPlanted,
        trees,
        AutoFarmVersion,
        bot } = list
        
    if(landFirebaseLoc != ""){
        landFirebaseLoc.set({
            date: date,
            SFlbalance: balance,
            kitchen: kitchen,
            trees: trees,
            grublist: grublist,
            plotsPlanted: plotsPlanted,
            AutoFarmVersion: AutoFarmVersion,
            bot: bot
        }).then()
    }
}
/* ---- */

setup = async () => {
    // define seed in auto farm   
    var grubListItemName = []
    readyPlots = []
    const bumpkinLevel = document.querySelector("#root > div > div > div.absolute.w-full.h-full.z-10 > div.absolute.z-40 > div.grid.fixed.-left-4.z-50.top-0.cursor-pointer.hover\\:img-highlight > div.col-start-1.row-start-1.flex.justify-center.text-white.text-xxs.z-20").innerText
    const bagBtn = $("img[src='https://sunflower-land.com/game-assets/ui/round_button.png']")[0]
    isSetupDone = true
function grubshopValue(){
    grubListItemName = []
    if (!window.location.href.includes('https://sunflower-land.com/play/#/retreat')){
        homeLand = window.location.href
        grubList = []
        checkIMAGEBASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALBAMAAAC5XnFsAAAABGdBTUEAALGPC/xhBQAAAA9QTFRFAAAA////Y8dNJitEJlxCc7QKQgAAAAF0Uk5TAEDm2GYAAAA9SURBVAjXJYvBDQAgDAJJuoEjoAMY2wls95/JEnkc3AOg41u0MVWHCXPjyp6HlQhy1UZcCaIksJJI/9kbDyamCA9kAzYMAAAAAElFTkSuQmCC"

        //Go to helios
        window.location.href += "/helios"

        //Get GrubshopLocation
        grubshopBtn = document.getElementsByClassName("relative w-full h-full cursor-pointer hover:img-highlight")[1]
        grubshopBtn.click()
        
        //Get GrubShopItemContainer in which contains all sellable item
        GrubShopItemContainer = document.getElementsByClassName("flex flex-wrap")[1]
        GrubShopItemContainerItemsList = GrubShopItemContainer.children

        //Get item that doesnt fulfill
        for (let x=0; x<GrubShopItemContainerItemsList.length; x++){
            confusedImage = 'https://sunflower-land.com/game-assets/icons/expression_confused.png'
            thisItem = GrubShopItemContainerItemsList[x].children[0]
            //GrubShopItemContainerItemsList[x].children[0]
            //Get img that contain check image
            AllImage = thisItem.getElementsByTagName('img')
            Lastimage = AllImage[AllImage.length - 1]
            if (Lastimage.getAttribute('id') != 'confirm' && Lastimage.getAttribute('src') != confusedImage){
                // click item
                thisItem.click()
                // Get name
                itemName = $('span.text-center')[0].innerText
                console.log(itemName)
                grubListItemName.push(itemName)
            }

            grubList.push(Lastimage.src)
        }
        //Back to home land
        window.location.href = homeLand
    }
}


// fetch data 

// wait then proceed
/*
a = await UpdateInGameData(LandId)


const UpdateData = new Promise((res) => {
        let tt = setInterval(()=>{
            if(a == "error"){
                a =  UpdateInGameData(LandId)
            }
            if (a){
                clearInterval(tt)
                res()
            }
        }, 5000)
        // if data is json type then
    
})*/


    // after fetching data
    FindPlots()
    UpdateReadyPlots() 
    GenerateFoodsRecipe()
    grubshopValue()
    setInterval(async()=>{
        plotsCooldown = []
        await UpdateInGameData(LandId)
        plots.forEach((plot) => {
            if (plot.plantCD != false){
                plotsCooldown.push(plot.plantCD.replace("&nbsp;", " ") )
            }
        });
        snapData(LandId)
        const { bot } = loadData
        if(bot == "Stop Bot"){
            elem1_3BTN.click()
        }
        try {
            if ( data != undefined || data != null){
                createBottingButton()
                d = new Date()
                sec = d.getTime()
                const DATE =  new Date(sec).toLocaleString("en-GB")
                SFLDatabaseToMyFirebaseData = { 
                    date: DATE,
                    landId: LandId, 
                    kitchen: kitchenData(), 
                    grublist: grubList, 
                    balance: data.balance, 
                    plotsPlanted: plotsCooldown,
                    trees: "Trees Under Construction",
                    AutoFarmVersion: version,
                    bot: elem1_3BTN.innerHTML
                 } 
                if(SFLDatabaseToMyFirebaseData != loadData){
                    save2DB(SFLDatabaseToMyFirebaseData)
                }
            }
        }
        catch{
            console.log('undefined data')
        }
    }, 120000)
    foodsMission = []

    // set mission
    for (let x=0; grubListItemName.length > x; x++){
        for(let y=0; foods.length > y; y++){
            if (grubListItemName[x] == foods[y].Name){
                console.log(grubListItemName[x])
                console.log(foods[y].RecipeNeeded)
                foodsMission.push(new food(foods[y].Name, foods[y].RecipeList, foods[y].RecipeNeeded))
            }
        }

    // 
    }
    /*
    foodsMission.forEach((food) => {
        setInterval(() => {
            food.check()
        }, 20000)
    });*/

   




}
Promise.all([jsQueryCode, jsCode1, jsCode2]).then(()=>{
    console.log("configuring firebase")
    try{ 
        findLvl = new Promise((res) =>{
            f = setInterval(() => {
                lvl = $("div[class='col-start-1 row-start-1 flex justify-center text-white text-xxs z-20']")
                if(lvl.length != 0){
                    clearInterval(f)
                    res()
                }
            }, 1000)
        }).then(()=>{
            console.log("found bumpkin")
            
            getLandBeforeConfig = new Promise((res)=>{
                const t = setInterval(()=>{
                    let a = GetLandId()
                    if(a){
                        clearInterval(t)
                        console.log("land id : " + LandId)
                        res()
                    }
                }, 1000)
            }).then(()=>{
                ConfigDB()
            })
        })
    }
    catch(err){
        console.log("Error " + err)
        
    }
})
