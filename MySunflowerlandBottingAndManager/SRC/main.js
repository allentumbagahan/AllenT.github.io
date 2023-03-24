

//document.body.style = `height: ${visualViewport.height}; width: ${visualViewport.width};`
//document.getElementById('head1').setAttribute `height: ${visualViewport.height}; width: ${visualViewport.width};`
if ('IntersectionObserver' in window) {
  // supported 
  console.log('supported')
} else {
  // not supported 
}


let r = document.getElementById('background')
// observerForEachCard
const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const intersecting = entry.isIntersecting;
        s = parseFloat(entry.intersectionRatio * 50)
        //entry.target.style.backgroundColor = intersecting ? 'blue' : 'red';
        //entry.target.style = intersecting ? 'visibility: visible' : 'opacity: 0; visibility: collapse'
        entry.target.style = intersecting? `height: fit-content;` : `height: 150px;`
        entry.target.children[1].style = intersecting? `visibility: 1;` : `visibility: collapse`
        entry.target.children[2].style = intersecting? `visibility: 1;` : `visibility: collapse`
        entry.target.children[3].style = intersecting? `visibility: 1;` : `visibility: collapse`
        entry.target.children[4].style = intersecting? `display: flex; align-items: center; margin-left: auto;margin-right: auto; background-color: initial;` : `visibility: collapse`
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
    { rootMargin: '-500px 0px -700px 0px',
      root: null,
      }
  );