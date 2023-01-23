if ('IntersectionObserver' in window) {
  // supported 
  console.log('supported')
} else {
  // not supported 
}


let r = document.getElementById('background')
const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const intersecting = entry.isIntersecting;
        s = parseFloat(entry.intersectionRatio * 50)
        //entry.target.style.backgroundColor = intersecting ? 'blue' : 'red';
        //entry.target.style = intersecting ? 'visibility: visible' : 'opacity: 0; visibility: collapse'
        entry.target.style = intersecting? `height: fit-content;` : `height: 150px;`
        entry.target.children[1].style = intersecting? `visibility: 1;` : `visibility: collapse`
        /*if (intersecting){
          entry.target.setAttribute("class", "card")
          entry.target.children[1].setAttribute("id", "container2")
        }else{
          entry.target.setAttribute("class", "goneCard")
          entry.target.children[1].setAttribute("id", "gonecontainer2")
        }*/
        console.log(entry) 
        console.log(parseFloat(entry.intersectionRatio))      
      }
    },
    // 👇 Threshold is 100%
    { rootMargin: '-500px 0px 0px 0px',
      root: null,
      }
  );