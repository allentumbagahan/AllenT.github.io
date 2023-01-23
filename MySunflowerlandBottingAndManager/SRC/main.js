function ob () {
    const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const intersecting = entry.isIntersecting;
            entry.target.style.backgroundColor = intersecting ? 'blue' : 'black';      }
        },
        // 👇 Threshold is 100%
        { rootMargin: '-50px' }
      );
      
      const box = document.getElementsByClassName('card')
      console.log(box)
      console.log(observer)
      
      observer.observe(box);  

  }