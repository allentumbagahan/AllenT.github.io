function addJavascript(jsname,pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
    };

    addJavascript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js','head');


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

// define seed in auto farm   
var seedAuto = 0

currentURl = window.location.href
const version = 0.01
var grubListItemName = []
readyPlots = []
const bumpkinLevel = document.querySelector("#root > div > div > div.absolute.w-full.h-full.z-10 > div.absolute.z-40 > div.grid.fixed.-left-4.z-50.top-0.cursor-pointer.hover\\:img-highlight > div.col-start-1.row-start-1.flex.justify-center.text-white.text-xxs.z-20").innerText
const bagBtn = $("img[src='https://sunflower-land.com/game-assets/ui/round_button.png']")[0]


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
    async function GetSFLData(id){
        const url = await window.fetch(`https://api.sunflower-land.com/visit/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json;charset=UTF-8",
                accept: "application/json"
            }
        })
        return await url.json()
    }

     getData = await GetSFLData(currentURl.replace('https://sunflower-land.com/play/#/land/', '')).then(function(val){
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
    })
    console.log(data)
    return true
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
function buySeeds(seedName, count){
    const marketButton = $("img[src='data:image/png;base64,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']")[0]
    marketButton.click()
    itemBox = $("div[class='w-full max-h-48 sm:max-h-96 sm:w-3/5 h-fit overflow-y-auto scrollable overflow-x-hidden p-1 mt-1 sm:mt-0 sm:mr-1 flex flex-wrap']")[0]
    for(let x = 0; x < itemBox.children.length; x++){
        setTimeout(() => {
            itemBox.children[x].children[0].click()
            seedNameInShop = $("span[class='text-center mb-1']")[0].innerText
            closebtn = $("img[src='https://sunflower-land.com/game-assets/icons/close.png']")[0]
            buyOneBtn = $("button[class='bg-brown-200 w-full p-1 text-xs object-contain justify-center items-center hover:bg-brown-300 cursor-pointer flex disabled:opacity-50  text-xxs sm:text-xs']")[0]
            console.log(itemBox.children[x])
            if(seedNameInShop == seedName){
                for(let c = 0; c < count; c++){
                    buyOneBtn.click()
                }
            }
            if (x == (itemBox.children.length - 1)){
                closebtn.click()
                // then update data 
                UpdateInGameData(LandId)
            }
        }, (1500*x))
    }
}
function pickSeed(name){
    try {
        console.log("picking seed")
        var bagBtn = $("img[src='https://sunflower-land.com/game-assets/ui/round_button.png']")[0].click()
            console.log("getting seeds container")
            stop = false
            var bagContainer = $("div[class='flex mb-2 flex-wrap -ml-1.5']")[0]
            console.log(bagContainer.children.length)
            closebtn = $("img[src='https://sunflower-land.com/game-assets/icons/close.png']")[0]
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
                                if (cropListName.indexOf(name) == 10){
                                    pickSeed(cropListName[0])
                                }
                                else{
                                    pickSeed(cropListName[cropListName.indexOf(name) + 1])
                                    console.log("picking seed " + cropListName[cropListName.indexOf(name) - 1])
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
    LandId = window.location.hash
    LandId = LandId.replace("#/land/", "")

}

function Autofarm(seed, repeat){
    let aa = 0 // count the repeat
    let a = repeat
    let e = 0
    pickSeed(seed)
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
                pickSeed(seed)
            }
            else{
                if (handleQuantity != 0 && readyPlots.length != 0){
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
            clearInterval(timer)
            Autofarm(seed)
        }
    }, 2000)
}

async function checkCaptcha(){
        const getModal = new Promise((res)=>{
            let a = $("div[class='fade modal show']")
            if(a.length > 0){
                res(true)
            }
            
        }).then((res)=>{
            console.log(res + "hello")
        })
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

    
}
/* ---- */

setup = async () => {
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
GetLandId()

// fetch data 

// wait then proceed
a = await UpdateInGameData(LandId)

const UpdateData = new Promise((res, err) => {
    
        // if data is json type then
        if (a){
            res()
        }
    
})

UpdateData.then((val) => {
    // after fetching data
    console.log(data)
    FindPlots()
    UpdateReadyPlots()
    GenerateFoodsRecipe()
    grubshopValue()
    createBottingButton()

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

    })




}

setup()