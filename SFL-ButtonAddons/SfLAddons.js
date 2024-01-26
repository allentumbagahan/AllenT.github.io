var sessionId = ""

var jquearAdded = false
var autoTrees = 'false';
var autoHarvestOn = 'false';
var autoPlantOn = 'false';
var balance = 0
var axePrice = 0.0625
var axeMarketStock = -1
var myAxeCount = -1;
var actionIsIdle = true
var seedForAuto = "sunflower"
var seedStockOnInvetory = -1
var seedMarketStock = -1
// code for sfl
var inventorybtn,
    inventoryImageSrc,
    holeBtn,
    holeImageSrc,
    closeImg,
    closeBtn,
    plots,
    parents,
    plotsReady2Harvest,
    countClickHarvest,
    stalls

async function addJavascript(jsname) {
    var th = document.getElementsByTagName("head")[0];
    console.log(th)
    var scrpt =  document.createElement('script');
    scrpt.setAttribute('type','text/javascript');
    scrpt.setAttribute('src', jsname);
    console.log(scrpt)
    th.appendChild(scrpt);
};

setTimeout(()=>{
    addJavascript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js');
}, 2000)

var timer = setInterval(()=>{
    try{
        var jqueryLength = 0;
        for(let a = 0; a < document.getElementsByTagName("script").length; a++){
            if(document.getElementsByTagName("script")[a].src == "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"){
                jqueryLength++
            }
        }
        if(jqueryLength == 1 && window.location.href.includes("https://sunflower-land.com/play") && !(typeof jQuery == 'undefined')){
            spyNetworkCalls()
            addJavascript('https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js');
            console.log("found jquery")
            start()
            clearInterval(timer)
        }else if(jqueryLength > 1){
            for(let a = 0; a < document.getElementsByTagName("script").length; a++){
                if(document.getElementsByTagName("script")[a].src == "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"){
                    document.getElementsByTagName("script")[a].remove()
                    break;
                }
            }
        }
    }
    catch{
    }
}, 2000)



async function start(){
    try{
        if (!(typeof jQuery == 'undefined')) {
            console.log("jQuery Exist")
        }else{
            console.log("jQuery Doesn't Exist")
        }
        metamaskBtn = $("button.bg-brown-200.w-full.p-1.text-xs.object-contain.justify-center.items-center")
        if(metamaskBtn.length > 0){
            metamaskBtn[0].click()
        }else{
            // go to sunfloweland
            if(!window.location.href.includes("https://sunflower-land.com")){
                window.location.href = "https://sunflower-land.com/play/#/land";
            }
        }
        setup()
    }catch{
        setup()
    }
}


class plot{
    constructor(parentElem, pointer, index){
        this.index = index
        this.parentElem = parentElem 
        this.image = parentElem.children[0].children[0].src
        this.image = (this.image == undefined || this.image == null)? parentElem.children[0].children[0].children[0].src : this.image
        this.button = this.parentElem.children[this.parentElem.children.length - 1] //this.parentElem.children[this.parentElem.children.length - 1]
        this.span = this.parentElem.getElementsByTagName('span') // find if there is plant cooldown
        this.readyP = (this.span.length == 0)? true : false
        this.plantCD = (!this.readyP)? this.span[this.span.length - 1].innerHTML : false
    }
    isPlot() {
        if(this.image == undefined || this.image == null){
            plots.pop(this.index)
        }
    }
    clickPlot(){
        this.button.click()
    }
}
class stall{
    constructor(element, name, func){
        this.elem = element
        this.name = name
        this.func = func
    }
}
class action{
    constructor(func){
        this.func = func
    }
}
    var actions = []
    var treesIsCooldown = false

function coolingDownTrees(){
    treesIsCooldown = true
    timer1 = setTimeout(()=>{
        treesIsCooldown = false
    }, 7200000)
    trees = $("img[src='https://sunflower-land.com/game-assets/resources/tree.png']")
    console.log(trees.length + "trees length")
    if(treesDiv.length > 0){
        treesIsCooldown = false
        clearTimeout(timer1)
    }
}
var isBotTimeOutToReset = true
function startBot(){
    setInterval(() => {
        if(actionIsIdle){
            //update balance
            let balanceElem = $("span[class='text-sm ml-1.5 mb-0.5']")[0]
            balance = parseFloat(balanceElem.innerHTML)
    
            if(actions.length > 0){
                console.log("processing some action")
                let firstAction = actions.shift()
                console.log(firstAction)
                actionIsIdle = false
                firstAction()
            }
    
            findStall()
            //add cutting trees on action
            autoChopTrees()
            autoHarvest()
            autoPlant()
        }else{
            if(isBotTimeOutToReset){
                isBotTimeOutToReset = false
                setTimeout(()=>{
                    console.log("Reset Bot")
                    actionIsIdle = true
                    isBotTimeOutToReset = true
                }, 15000)
            }
        }
    }, 1000);
}



    function setup(){
        holeImageSrc = "https://sunflower-land.com/game-assets/crops/soil2.png"
        inventoryImageSrc = "https://sunflower-land.com/game-assets/icons/basket.png"
        closeImg = "https://sunflower-land.com/game-assets/icons/close.png"
        // 
        var findBalanceBeforeSetup = setInterval(()=>{
            let balanceElem = $("span[class='text-sm ml-1.5 mb-0.5']").length
            if(balanceElem > 0){
                events()
                startBot()
                clearInterval(findBalanceBeforeSetup)
            }
        }, 2000)

    }
    function events () {
        countClickHarvest = 0
        window.onkeypress = function (event) {
            console.log(event.key)
            if(event.key == "1"){
                holeBtn = $(`img.absolute.pointer-events-none[src="${holeImageSrc}"`)
                if(holeBtn.length > 0){
                    holeBtn[0].click()
                }
            }
            if(event.key == "2"){
                FindPlots()
                console.log(countClickHarvest)
                if(plotsReady2Harvest.length > 0) {
                    if(countClickHarvest >= plotsReady2Harvest.length){
                        countClickHarvest = 0;
                    }
                    plotsReady2Harvest[countClickHarvest].parentElem.click()
                    countClickHarvest++
                }
            }
            if(event.key == "q"){
                inventorybtn = $(`img.absolute[src="${inventoryImageSrc}"]`)[0]
                inventorybtn.click()
            }
            if(event.key == "e"){
                closeBtn = $(`img.flex-none.cursor-pointer.float-right[src="${closeImg}"]`)
                closeBtn.click()
            }
        }
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
        plots.push(new plot(parents[f], allPointer[f], plots.length - 1))
        plots[plots.length - 1].isPlot()
    }
    plotsReady2Harvest = []
    for(let i = 0; i < plots.length; i++){
        if(plots[i].image.includes("plant")){
            plotsReady2Harvest.push(plots[i])
        }
    }
    }
    async function onclickFirePit(){
        const waitDialog = new Promise(async (res)=>{
            setInterval(()=>{
                let a = $("div.fade.modal.show") // wait for dialog
                if(a.length > 0){
                    res("success")
                }
            }, 1000)
        })
        if(await waitDialog == "success"){
            console.log("A")
            elem1ForButtonAndSeedName = $("div.flex.flex-col.justify-center")
            console.log(elem1ForButtonAndSeedName)
            p1 = document.createElement("div")
            p1.innerHTML = '<button class="bg-brown-200 w-full p-1 text-xs object-contain justify-center items-center hover:bg-brown-300 cursor-pointer flex disabled:opacity-50  text-xxs sm:text-sm mt-1 whitespace-nowrap" style="border-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKAgMAAADwXCcuAAAACVBMVEUAAAAYFCXq1KoZSBjjAAAAAXRSTlMAQObYZgAAABpJREFUCNdjYA1lYJBa5cCQwDABGwbJgdQAAKX2CF37xkC2AAAAAElFTkSuQmCC&quot;) 20% / 1 / 0 stretch; border-style: solid; border-width: 5.25px; image-rendering: pixelated; border-radius: 13.125px;"><div class="mb-1" style="font-size: x-small;">Auto Cook by LentTech</div></button>'
            elem1ForButtonAndSeedName[0].appendChild(p1)
            firePitAlert = 'https://sunflower-land.com/game-assets/icons/expression_alerted.png'
            p1.onclick = function(){
                let count = 0
                
                elem1ForButtonAndSeedName[0].children[1].click()
                setInterval(()=>{
                    if(count < 10){
                        a1 = $(`img.ready[src="${firePitAlert}"`) // wait for dialog
                        if(a1.length > 0){
                            stalls[0].elem.click()
                        }
                    }
                }, 10000)
                
            }
        }
        
            
    }
    function onclickMarket(){
        console.log("market clicked")
    }
    function onclickBlacksmith(){
        console.log("blacksmith clicked")
    }
    function findStall(){
        firePitImg = "data:image/png;base64,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"
        marketImg = "data:image/png;base64,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"
        blacksmith = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAkCAYAAAAZ4GNvAAAAAXNSR0IArs4c6QAABQBJREFUWIW9mH9IW1cUxz/PhtRaoWx0Vceoq+LsaByjM1BhSWGrRBAnhbLh2Ma2ZsVRnB1bO2fL5h+r1fWP1pWCdG1XSlEK/WtBqOhkJn9Yp23H6qBtSOwPma1rx4RiJIpvfzzf7XvP95K8GPeF4P1xzr3fc+65x3OfRAaxe6iGkD8mJ5PznF4jqe1U5M30z1QEcNhVTISQPybfGutjcDRiKXPq7CVC/n5B+NS5Tlt7bC8vptRVKQOSIL97qEYIhD+cEIuXnHtBwoAzFQHLxQdHIzR//X1CAusLikQ7mawRrUcOiLal59152Yw8nLW1sIqJlxvT0rMLHXk1/vJBEFdP4YH7GTx714pT8LZXyQ9uxLl9YWDJyQDcczkzTnbjWJxTZy+JfpZRoLPwb1qKF2gpXgCUEwDIL3MSDs7J4eCc7G2vkt090+SXOanpbrR94ZaDPR/vEm2d5/M/cFB//rmnfR6LE3hwfh5QjAMgF+gB+A1ve5Wslfm/IMiHg3Oyu2eaAGv1JBdR4JKp7ZGIl2wSY5WAMzxO9eAMAPUohr8+H2DP1l0kgzYEQO9VU2xdretKnjafLEkS7p5pPq+v4I3Df1Du3cFosF+XFR5NRhk4+ArHOoeo9b1qura/K0y5dwd3wlFeLCkyldHiTjiq66eiAzAa7Cfv/VVkhZp6pXUbS8VE/vxj3WKtRw6w8523dOMrgWTE74Sj4gcQaupV8nygrkP6wlshLt5osD8jRIyeTUYu1bUfTSqyS/J8S/ECLRHFyxMDF/lm4KIYtwOVjLrRcqCGr/F0HAA13Y3y0JkYlcNR+p7k0PVtBQC3L/zCS++9CcCxziHiw1GGnGXUAjNTkwDkbChIuvkPO3LTJv5Z/xPLOYenzSc3RGK0aAbHhhVv9T3JIT6cuucUkleUzpbFwS25OgPtGK2sOQlMLfaUvxNvS+St9smOUFOvdKK7UebXGDdcfqrDB4kvilbnzujaV11++PNny81TIZQq6UTy64qcBOo6nhZmjvsjXL9WBDsPP5VyoWtfvzaG4/4IsM0WgZWC7sJOLF5OKySbN8PM1KRtb6cKh7Y2cedlM5KAYDqVZjrEUzG4prtRzgJoiMRorioUxNx52aIg07ZHHs7SXFWo20S9gOkQtNJNRrwhEgM0VWXOhgIdMTM0VxWKhbUbp2vAciGpYbM/GrckkijXWuH0uyWinem4P1qkvBUkUOJHJW/czN8V5tZYn+0NSl2VOgMyiaPGVKmF0UuJHtRm2F5eDCiGWyFVwxL9U8vo1wMtPtm3jy/91aZzpa7KjOwhygOkVRlZ0A5SKRXM5hoiMf5t05QH2pjPBK5fG2NwdLPoj/x+UzdvzFZ2LvSJ4jWE6jT1/P7Dn2b8IW0k/OPx44AS78tJr4G6DglWMOa10JJWkbOhwHaFaYRpqtRCfZfahfY1lumUKVLlSl7Y5TxCEt0D9cIm9TwszddmJ2F892qJ2w0L7X0w01U9nwUwfe+WpbKK9QVF4mckqn4mUX9apBPPqo6VrspX9+3xu/lNSwRnpib56Oo/bMrevGTOCuOzN/nptWdXpI4/5Bgn+NVlCTTkIbEBdpGMeDqZ5pBjHMCcPCgGNP+VzclthSKf1nQ3ynuv3OXkNn3JvPfKXQDT8VT1E40F6jokVbf1+VkdcVPyAJ42nxxq6pUSjRm/DqtEl6vvafPJoHwR0+oaxwD+Ay3FTaCIHua5AAAAAElFTkSuQmCC"
        let parents = $("div.relative.w-full.h-full.cursor-pointer")
        stalls = []
        for(let c=0; c < parents.length; c++){
            if(parents[c].children[0].src == firePitImg){
                stalls.push(new stall(parents[c], "Fire Pit", onclickFirePit))
            }
            if(parents[c].children[0].src == marketImg){
                stalls.push(new stall(parents[c], "Market", onclickMarket))
            }
            if(parents[c].children[0].src == blacksmith){
                stalls.push(new stall(parents[c], "Blacksmith", onclickBlacksmith))
            }
        }
    }

    function autoChopTrees() {
        autoTrees = localStorage.getItem("autoChopTree")
        if(autoTrees == 'true'){
            trees = $("img[src='https://sunflower-land.com/game-assets/resources/tree.png']")
            treesDiv = $("div.absolute.w-full.h-full.cursor-pointer")
            if(treesDiv.length > 0){
                // add actio click blacksmith
                //add action for chopping trees
                if(!treesIsCooldown && (balance > axePrice && axeMarketStock != 0 ) || myAxeCount != 0  ){
                    for(let f = 0; stalls.length > f; f++){
                        if(stalls[f].name == "Blacksmith"){
                            actions.push(function(){
                                if(autoTrees == 'true'){
                                    /*stalls[f].elem.click()
                                    console.log("found blacksmith " + stalls[f].name)
                                    axe =  $("div[class='w-full sm:w-3/5 h-fit sm:max-h-96 p-1 mt-1 sm:mt-0 flex max-h-56 flex-wrap overflow-y-auto scrollable overflow-x-hidden sm:mr-1']").find("div[class='relative ']").find("img[src='https://sunflower-land.com/game-assets/tools/axe.png']")
                                    myAxe = $("div[class='w-full sm:w-3/5 h-fit sm:max-h-96 p-1 mt-1 sm:mt-0 flex max-h-56 flex-wrap overflow-y-auto scrollable overflow-x-hidden sm:mr-1']").find("div[class='relative ']")[0].getElementsByTagName("span")
                                    modalDialog = $(".modal-content")[0]
                                    if(axe.length > 0){
                                        axe[0].click()
                                    }
                                    buy1 = modalDialog.getElementsByTagName("button")[0]
                                    buy10 =  modalDialog.getElementsByTagName("button")[1]
                                    axeMarketStock = parseInt($("span[class='text-xxs px-1.5 pb-1 pt-0.5 rounded-md inline-flex items-center bg-blue-600 border']")[0].innerHTML)
                                    console.log("axe length = " + axe.length)
                                    if(myAxe.length == 0 && axeMarketStock > 0 ){
                                        myAxeCount = -1
                                        buy1.click()
                                    }else{
                                        myAxeCount = parseInt(myAxe)
                                    }
                                    closeBtnStall = $(`img.flex-none.cursor-pointer.float-right[src="${closeImg}"]`)
                                    closeBtnStall.click()*/
                                    if(trees.length > 0){
                                        treesDiv[0].click()
                                        treesDiv[0].click()
                                        treesDiv[0].click()
                                        coolingDownTrees()
                                    }else{
                                        console.log("trees cooling down");
                                    }
                                }
                                actionIsIdle = true
                            })
                            console.log(actions.length)
                        }
                    }
                }
            }
        }
    }
    function autoPlant(){
        autoPlantOn = localStorage.getItem("autoPlant")
        holeBtn = $(`img.absolute.pointer-events-none[src="${holeImageSrc}"`)
        if(autoPlantOn == 'true' && holeBtn.length > 0 && (seedStockOnInvetory != 0 || seedMarketStock != 0)){
            for(let f = 0; stalls.length > f; f++){
                if(stalls[f].name == "Market" && holeBtn.length != 0){
                        actions.push(function(){
                            if(autoPlantOn == 'true'){
                                seedForAuto = localStorage.getItem("seedForAuto")
                                stalls[f].elem.click()
                                seedImg = $('div[class="w-full sm:w-3/5 h-fit sm:max-h-96 p-1 mt-1 sm:mt-0 flex max-h-56 flex-wrap overflow-y-auto scrollable overflow-x-hidden sm:mr-1"]').find(`img[src="https://sunflower-land.com/game-assets/crops/${seedForAuto}/seed.png"]`)
                                if(seedImg.length > 0){
                                    seedImg[0].click()
                                }
                                var outOfstock = $("span[class='text-xxs px-1.5 pb-1 pt-0.5 rounded-md inline-flex items-center bg-error border']")
                                if(outOfstock == 0){
                                    seedMarketStock = parseInt($("span[class='text-xxs px-1.5 pb-1 pt-0.5 rounded-md inline-flex items-center bg-blue-600 border']")[0].innerHTML)
                                }else{
                                    seedMarketStock = 0
                                }
                                modalDialog = $(".modal-content")[0]
                                seedStockOnInvetory = $('div[class="w-full sm:w-3/5 h-fit sm:max-h-96 p-1 mt-1 sm:mt-0 flex max-h-56 flex-wrap overflow-y-auto scrollable overflow-x-hidden sm:mr-1"]').find(`img[src="https://sunflower-land.com/game-assets/crops/${seedForAuto}/seed.png"]`).parent().parent().parent().find('span')
                                if(seedStockOnInvetory.length > 0){
                                    seedStockOnInvetory = parseInt($('div[class="w-full sm:w-3/5 h-fit sm:max-h-96 p-1 mt-1 sm:mt-0 flex max-h-56 flex-wrap overflow-y-auto scrollable overflow-x-hidden sm:mr-1"]').find(`img[src="https://sunflower-land.com/game-assets/crops/${seedForAuto}/seed.png"]`).parent().parent().parent().find('span')[0].innerHTML)
                                }else{
                                    seedStockOnInvetory = 0;
                                }
                                buy1 = modalDialog.getElementsByTagName("button")[0]
                                buy10 =  modalDialog.getElementsByTagName("button")[1]
                                if(seedStockOnInvetory == 0 ){
                                    buy1.click()
                                    seedStockOnInvetory++
                                }
                                closeBtnStall = $(`img.flex-none.cursor-pointer.float-right[src="${closeImg}"]`)
                                closeBtnStall.click()
                                holeBtn = $(`img.absolute.pointer-events-none[src="${holeImageSrc}"`)
                                if(holeBtn.length > 0 && seedStockOnInvetory > 0){
                                    holeBtn[0].click()
                                }
                                actionIsIdle = true
                            }

                    })
                }
            }
        }
    }
    function autoHarvest(){
        FindPlots()
        autoHarvestOn = localStorage.getItem("autoHarvest")
        if(autoHarvestOn == 'true' && plotsReady2Harvest.length > 0){
            actions.push(function(){ 
                FindPlots()
                if(plotsReady2Harvest.length > 0 && autoHarvestOn == 'true') {
                    if(countClickHarvest >= plotsReady2Harvest.length){
                        countClickHarvest = 0;
                    }
                    plotsReady2Harvest[countClickHarvest].parentElem.click()
                    countClickHarvest++
                }
                actionIsIdle = true
            })
        }
    }
    function spyNetworkCalls(){
        try{
            // Create an array to store the captured requests and responses
            var a = 0;
            capturedData = [];

            // Override the fetch function
            const originalFetch = window.fetch;
            window.fetch = function (url, options) {
              const fetchPromise = originalFetch.call(this, url, options); // Invoke the original fetch function
            
              const request = {
                url,
                options,
                timestamp: Date.now()
              };

              // Intercept the response and add it to the captured data
              fetchPromise.then(response => {
                const capturedResponse = {
                  request,
                  response,
                  timestamp: Date.now()
                };

                capturedData.push(capturedResponse);

                // You can also log or process the response here
                console.log(capturedResponse);
                if(capturedData[a].request.url.includes("https://api.sunflower-land.com/session/")){
                    console.log(JSON.parse(capturedData[a].request.options.body).sessionId)
                }
                a++
              });
              
              return fetchPromise; // Return the fetch promise
            };
            p = fetch('https://api.example.com/data')
              .then(response => {
                // Handle the response for data
                console.log(response)
              })
              .catch(error => {
                  console.log(error)
              });
            console.log(p)
        }catch{
        
        }
    }







