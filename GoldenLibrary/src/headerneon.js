var HeaderText = "< MyCodeRoom >"
var MagIndex = 2
header1 = document.getElementsByClassName('headerText first')[0]
header2 = document.getElementsByClassName('headerText second')[0]
headerMag = document.getElementsByClassName('headerMag')[0]
animate()
function animate(){
    main = document.getElementById('container')
    p = document.getElementById('header')
    p.remove()
    z = document.createElement('div')
    z.setAttribute('class', 'header')
    z.setAttribute('id', 'header')
    p = main.appendChild(z)
        for (x=0; x < HeaderText.length; x++) {
            if (!(MagIndex == x)){
            e = document.createElement('h3')
            e.innerHTML = HeaderText[x]
            e.setAttribute('class', 'headerText')
            e.setAttribute('id', 'head')
            p.appendChild(e)}
            else{
            e = document.createElement('h2')
            e.innerHTML = HeaderText[x]
            e.setAttribute('class', 'headerText')
            e.setAttribute('id', 'head')
            e.setAttribute('class', 'HeaderNeon')
            p.appendChild(e)
        }}
        MagIndex++
    setTimeout(() => {
        /*text2 = HeaderText.substring((MagIndex + 1), HeaderText.length)
        text1 = HeaderText.substring(0, (MagIndex))
        headerMag.innerHTML = HeaderText[MagIndex]
        header1.innerHTML = text1
        header2.innerHTML = text2
        console.log(text1)*/
        console.log(MagIndex)
        if (MagIndex == (HeaderText.length)){
            MagIndex = 0
        }
        animate()
    }, 300 )
}