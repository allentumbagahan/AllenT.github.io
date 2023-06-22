
try{
    if(localStorage.getItem("autoChopTree") == undefined ){
        document.getElementsByClassName("autoChopTree")[0].checked = false
    }else{
        if(localStorage.getItem("autoChopTree")  == 'false'){
            document.getElementsByClassName("autoChopTree")[0].checked = false
        }else{
            document.getElementsByClassName("autoChopTree")[0].checked = true
        }
    }
}catch{
    document.getElementsByClassName("autoChopTree")[0].checked = false
}

try{
    if(localStorage.getItem("autoHarvest") == undefined ){
        document.getElementsByClassName("autoHarvest")[0].checked = false
    }else{
        if(localStorage.getItem("autoHarvest")  == 'false'){
            document.getElementsByClassName("autoHarvest")[0].checked = false
        }else{
            document.getElementsByClassName("autoHarvest")[0].checked = true
        }
    }
}catch{
    document.getElementsByClassName("autoHarvest")[0].checked = false
}

try{
    if(localStorage.getItem("autoPlant") == undefined ){
        document.getElementsByClassName("autoPlant")[0].checked = false
    }else{
        if(localStorage.getItem("autoPlant")  == 'false'){
            document.getElementsByClassName("autoPlant")[0].checked = false
        }else{
            document.getElementsByClassName("autoPlant")[0].checked = true
        }
    }
}catch{
    document.getElementsByClassName("autoPlant")[0].checked = false
}
document.getElementById('copy1').onclick = function(){
    // Get the text field
    var copyText = document.getElementById("tokenId").innerHTML;
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
}
document.getElementById('copy2').onclick = function(){
    // Get the text field
    var copyText = document.getElementById("cacheKey").innerHTML;
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
}


