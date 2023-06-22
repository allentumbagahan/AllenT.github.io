class seedForAutoPlant{
    constructor(mainElem, src){
        this.mainParent = mainElem
        this.elem1 = this.elem1
        this.imgElem1 = this.imgElem1
        this.seedNameFilter1 = src.replace("https://sunflower-land.com/game-assets/crops/", "")
        this.seedName = this.seedNameFilter1.replace("/seed.png", "")
        this.src = src
    }
    initializeView() {
        this.elem1 = document.createElement('div')
        this.elem1.setAttribute('class', 'seedItem')
        this.elem1.onclick = ()=>{
            changedSeedFoAuto(this.seedName)
            document.querySelector('#seedSelected').innerHTML = this.seedName
        }
        this.mainParent.append(this.elem1)
        this.imgElem1 = document.createElement('img')
        this.imgElem1.setAttribute('class', 'seedImage')
        this.imgElem1.setAttribute('src', this.src)
        this.elem1.appendChild(this.imgElem1)
    }
}
seedSelections = []
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background:", message);
    console.log(sender)
    if(message.type == "connect land"){
        document.getElementById("connection").innerHTML = message.land
        document.getElementById("tokenId").innerHTML = message.tokenId
        document.getElementById("cacheKey").innerHTML = message.cachedKey
    }
  });


function setup(){
    connectToTabs()
    createSelectionSeedForAutoPlant()
    document.getElementsByClassName("autoChopTree")[0].onclick = ()=>{
        if(document.getElementsByClassName("autoChopTree")[0].checked){
            localStorage.setItem("autoChopTree", true)
        }else{
            localStorage.setItem("autoChopTree", false)
        }
        sendRequest({
            type : "switch_option",
            key : "autoChopTree",
            value : document.getElementsByClassName("autoChopTree")[0].checked
        });
        console.log("changed auto chop trees")
    }
    document.getElementsByClassName("autoHarvest")[0].onclick = ()=>{
        if(document.getElementsByClassName("autoHarvest")[0].checked){
            localStorage.setItem("autoHarvest", true)
        }else{
            localStorage.setItem("autoHarvest", false)
        }
        sendRequest({
            type : "switch_option",
            key : "autoHarvest",
            value : document.getElementsByClassName("autoHarvest")[0].checked
        });
        console.log("changed auto harvest")
    }
    document.getElementsByClassName("autoPlant")[0].onclick = ()=>{
        if(document.getElementsByClassName("autoPlant")[0].checked){
            localStorage.setItem("autoPlant", true)
        }else{
            localStorage.setItem("autoPlant", false)
        }
        sendRequest({
            type : "switch_option",
            key : "autoPlant",
            value : document.getElementsByClassName("autoPlant")[0].checked
        });
        console.log("changed auto plant")
    }
}
function changedSeedFoAuto(seed){
    sendRequest({
        type : "switch_option",
        key : "seedForAuto",
        value : seed
    });
}

function sendRequest(msg){
    console.log(msg)
    let params = {
        active: true,
        currentWindow: true
    }

    chrome.tabs.query(params, gotTabs)
    function gotTabs(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

function connectToTabs(){
    let params = {
        active: true,
        currentWindow: true
    }

    chrome.tabs.query(params, gotTabs)
    function gotTabs(tabs) {
        let msg = {
            type : "connect",
        }
        chrome.tabs.sendMessage(tabs[0].id, msg)
    }
}

function createSelectionSeedForAutoPlant(){
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/sunflower/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/potato/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/pumpkin/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/carrot/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/cabbage/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/beetroot/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/cauliflower/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/parsnip/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/eggplant/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/radish/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/wheat/seed.png'))
    seedSelections.push(new seedForAutoPlant(document.querySelector("#seedContainer"), 'https://sunflower-land.com/game-assets/crops/kale/seed.png'))

    for(let i=0; i < seedSelections.length; i++){
        seedSelections[i].initializeView()
    }
}
setup()

