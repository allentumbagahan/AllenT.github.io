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
        this.elem.onclick = function(){
            func()
        }
    }
}

class lenTechBot{
    constructor(){

    }
}

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

function addJavascript(jsname,pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
    return true
};
    jsQueryCode = new Promise ((res)=>{
        setInterval(()=>{              
            let a =  addJavascript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js','head');
            if(a){
                res()
            }
        }, 2000)
    }).then(async()=>{
        var acc = await window.ethereum.enable()
        metamaskBtn = $("button.bg-brown-200.w-full.p-1.text-xs.object-contain.justify-center.items-center")
        if(metamaskBtn.length > 0){
            metamaskBtn[0].click()
        }else{
            // go to sunfloweland
            if(!window.location.href.includes("https://sunflower-land.com")){
                window.location.href = "https://sunflower-land.com/play/#/land"
            }
        }
        if(acc != undefined){
            setup()
        }
    })
    function setup(){
        holeImageSrc = "https://sunflower-land.com/game-assets/crops/soil2.png"
        inventoryImageSrc = "https://sunflower-land.com/game-assets/icons/basket.png"
        closeImg = "https://sunflower-land.com/game-assets/icons/close.png"
        // 
        console.log(plots)
        events()
        findStall()
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
    function findStall(){
        firePitImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAhCAYAAABJLfLcAAAAAXNSR0IArs4c6QAABtNJREFUWIWtmG1MlNkVx38Dw6zOYHbQ6cikq+AgKy5SMHVXNLF8WEQTY7dNmrRsU9OuaGONXTdRcbfV2LW+0sS32E2V3TaaZbtJE+Ma0kW3iUhaaHyBhiEMDEwHtDsynY3jugx0AJ9+eLwPz9u8QPv/dO+555z7P/eec+99HsvW9s0IOOujEirETrgs6PD+mmt60Yzw+o7jmjma3ttvmENgbfV2qbDYC0AoEORvn13Q6FpFw1kflfa+/SOyFrkAeHo/SkP9ZUkfgDrYwK0J6fnFy3AXBhWdtvOj0rqdDo2NkPUe8Ejb3/iehmAoEJSWHw4b7HsPeKTvfv/bvFxRAsCFD/4EbJfUAVjVjrIWuTjxs1MA1P/2LcNKxB56pG03I0rfFhjmUBU8HkZZzfwyG5GQVxIBRUJeKb+sD0FGj8JiL70HkH5s/TsAqwF+9YXUi0dFelq3sFjeuab39ls05J/ejyqkn96PpiQOkChewjufa8nYAv8Ewhyq8kgAh1pvAvBLFtN5z0fnPR+hQBCRDsnw2lQHnfemdUKBIEeP7VP3JcvW9s0466PSptw4nhUujYOwL0rzV3ZCb5UhiNvdnpSTAsQjYU3/3R43+hRQB1DubyLvOW3qP/rPdGlcza7U2AsfVmd9VKqrtAN2ABZs+SkAX1z6HZ4VLuqAxlPdsHJhRsT1AaoDUaeAIC3QF7drxpbZ45oAAG53+Xm5okTxk6UeFMT1bT2hmcDu9nCwNELnPZ9GXjXWDsDjhERkymGwE8Hod0S9ANlrCxYd8sQeM89tZ+wfd7GXrwLklQc5dQKJHEqW5mucxCNhchzzMgogxzGPl8b9lGc/gJ5b5Ee7mZNtIe85CyMmxAVGJRuunAkKJh4gdf+FromFmnGr3kCQToeZ7sS0fhAwrmgmKPc3Uf4NL+crC7hWe8aSFTvhsjR/ZSfsixqURcH273hlxhOpoc77yJRjxsSFfnB8rmbRrCDfpB8CPzw8rKmQDw8slq1CaCtnBhDE45GwMnFf3M4yexyYLkx93ruzRzVBRqYc5ObI7Z0dQ8SOb5CPynQI3JqQfj25JCOSZukkiO9pGeXrhYsAGPn834iLKR1E8a5/duI1eG1cqz1jSbt/mz96U9rZMZQyx/XnupnunpZRaja9StlyLws9HuWsX5PoBuQduLmkVmPj6bkKQLutDLM3jqFgzZD1NXcmailhtc3h+fkLuPrnvyoXVGGxl/YArEl084fJ1RzVvXveeVsu7mRvnIzInyuay95gIum43e1JmTYAB0sj4GvkSsB427YHZIJ6FBZ7CQWCKtJapCXvLgxaIiFv2oJNd3Qq4z1TScmIG1Q9PpkYN1xwB0sjHKneIGW08v9PHCyNcElHRg2zoLbYOjT985UFtNWeSZ82/a0JyVkwC5ZJYHd72BLRkqEU8DVyKVFp0H935ZdJdzWjld81OAaW7BkTTYZkZAxBpdAFSHlUbm3fTPjUS0q+7y//Mqmu+hJKB7Pi1tvXNQU0No2vFyvtBq/NnLx43wP05n+LfXu3KWMnGy4CsPzhrYxIpsL6FE/suqYA23bv1sgunj6tBDAuTXHYOmRMG2d9VFq/ciEVG2t44/dD+AeGufT+Hzl6bB8lK5YB0At88BPzQvC7aqhaVWSQt94ZpCR6HYCuT69zo3OE1zYYyQviF0+f1si37d5N3bMAzhXNpa22xbxgKzbWMPloAJAfE1u2/gD/wDB+X58SgDxuRNXGHUr7N43N7KnbJMtXFfGvjwYU/zc6L5vaC8RfOQbAg0rnM0mfQSdlwToX5NEfCCl9QTwTtN4ZZE/dJk0As8ELHTG5sXZatjeYIHY8yTk/+WiA0SfjBrnfJ0d/6tUnjD5JPWnVqiIlAAHh04H5rglc+fgT3tTduFc+/kRpN3htydPGmrcUBwOcXBdhX9u0/MJ3Jp615qRmznTKtN4ZVGrAMW+O4h/ak9o65+dpyApZVPv+S3/On1wXSadiiv81ZZzz89LqmJLv+vQ6FRtrZjWpeqXVxFvvDFKSt1Txnwxnq3P5+Wd3WVr6TY18oOcuZ6tzAYgN+c3Jx064LDfqRyRIPkEqdK9YbCq/3eVn3Cf7lI/JClM9u9vD2eowhtPFk6t8iLTVtqR+z9/oHJkNd+g8wm1+oflBdLvLz8PLR3iYoYtkl5f4ghL9pORffMFK/4NJzZ/i/taEdGQq9W86ACLNcL1Z6a4G2FDB1ZYuxe9sINJFIO1noP4bV7ztxceJeKecr5Rv3F2DY5wrmov6R6uQqbFrcAzAVJ7MXr3qsyKvDwLkFXmxymYBeXdEW0Av03/cqH+RJ7Nv299i4PpfdnsBHNpu5FcAAAAASUVORK5CYII="
        marketImg = "data:image/png;base64,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"
        let parents = $("div.relative.w-full.h-full.cursor-pointer")
        stalls = []
        for(let c=0; c < parents.length; c++){
            if(parents[c].children[0].src == firePitImg){
                stalls.push(new stall(parents[c], "Fire Pit", onclickFirePit))
            }
            if(parents[c].children[0].src == marketImg){
                stalls.push(new stall(parents[c], "Market"))
            }
        }
    }

    function openMetamask() {
        
    }