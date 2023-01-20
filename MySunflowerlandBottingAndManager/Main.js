const addj = new Promise(function(res, err) {
    addJavascript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js', 'head')
    addJavascript('https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js', 'head')
    if (res){
        res()
    }else{
        console.log(err)
    }
}).then(function(val){
    addJavascript('https://allentumbagahan.github.io/MySunflowerlandBottingAndManager/MainApi.js', 'body')
})