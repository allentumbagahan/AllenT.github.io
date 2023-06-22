localStorage.setItem("autoChopTree", 'false')

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
    console.log("message received")
    console.log(message)
    if(message.type == "switch_option"){
        localStorage.setItem(message.key, message.value)
    }
    // set connection content to
    if(message.type == "connect"){
        connectExtension()

    }
   
}

function connectExtension(){
    var land; 
    //establish connection 
    try {
        //get token id in local storage
        var tokenId;
        var cachedKey = JSON.parse(localStorage['sb_wiz.xtc.t.sunflower-land.com-/play/'])[Object.keys(JSON.parse(localStorage['sb_wiz.xtc.t.sunflower-land.com-/play/']))]
        var accountToken = JSON.parse(localStorage.getItem("sb_wiz.zpc.v.sunflower-land.com-/play/"))
        for(const x in accountToken){
            tokenId = accountToken[x].token
        }
        // send data to extension
        var landElem = document.getElementsByClassName("text-white mb-1 text-sm")
        if(landElem.length > 0){
            land = landElem[0].innerHTML
            let msg = {
                type: "connect land", land: land, tokenId : tokenId, cachedKey : cachedKey
            }
            chrome.runtime.sendMessage(msg); 
        }
    }catch{
    }
}

