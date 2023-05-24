const waiiFb = new Promise((res) => {
    if(window.location.href.includes('facebook')){
        alert('fb')
        res(true)
    }
}).then((val)=>{
    if(val){
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