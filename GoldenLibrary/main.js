let MobileUser = window.navigator.userAgentData.mobile;
console.log(MobileUser);

if (MobileUser){
    menu = document.getElementById('menu')
    menu.remove()
}