

function addJavascript(jsname,pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
    };

    addJavascript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js','head');


//make sure jquery was added



AllPlotCropsImage = $("[style='top: -31.5px; width: 42px;']")
AllPlotsPointerToClick = $("img.absolute.z-40.cursor-pointer.opacity-0")
currentURl = window.location.href
var Expansion, Expansion1, Expansion2;
    function LandExpansion(plotsCount){
        switch(plotsCount){
            case 13: 
                Expansion = 0
                break;
            case 15:
                Expansion = 1
                break;
            case 17:
                Expansion = 1
                break;
            default: 
                Expansion = 0
        }
    }
    function ClickAllPlot(){
        AllPlotsPointerToClick = $("img.absolute.z-40.cursor-pointer.opacity-0")
        //get data from sfl
        getData = GetSFLData(currentURl.replace('https://sunflower-land.com/play/#/land/', '')).then(function(val){
            data = val.state
            Expansion1 = {
                field1 : val.state.expansions[0].plots,
                field2 : val.state.expansions[2].plots
            }
            Expansion2 = val.state.expansions[1].plots})
        //end
        //set all plot needed to click

        var clickElement = (AllPlotsPointerToClick.length) - 1
        console.log(AllPlotsPointerToClick.length)
        setInterval(()=>{
            if(clickElement == -1){
                clickElement = (AllPlotsPointerToClick.length) - 1
            }
            console.log(clickElement)
            AllPlotsPointerToClick[clickElement].click()
            clickElement--
        }, 500)
    }
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
    LandExpansion(AllPlotsPointerToClick)

    getData = GetSFLData(currentURl.replace('https://sunflower-land.com/play/#/land/', '')).then(function(val){
        data = val.state
        Expansion1 = {
            field1 : val.state.expansions[0].plots,
            field2 : val.state.expansions[2].plots
        }})
    
    function GetPlotDataInDb(plotsNum){
        let result;
            switch(plotsNum){
                case 12:
                    result = Expansion1.field1[2]
                    break;
                case 11:
                    result = Expansion1.field1[1]
                    break;
                case 10:
                    result = Expansion1.field1[0]
                    break;
                case 9:
                    result = Expansion1.field1[5]
                    break;
                case 8:
                    result = Expansion1.field1[4]
                    break;
                case 7:
                    result = Expansion1.field1[3]
                    break;
                case 6:
                    result = Expansion1.field1[8]
                    break;
                case 5:
                    result = Expansion1.field1[7]
                    break;
                case 4:
                    result = Expansion1.field1[6]
                    break;
                case 3:
                    result = Expansion1.field2[3]
                    break;
                case 2:
                    result = Expansion1.field2[2]
                    break;        
                case 1:
                    result = Expansion1.field2[1]
                    break;
                case 0:
                    result = Expansion1.field2[0]
                    break;             
            }
            return result
        }
    