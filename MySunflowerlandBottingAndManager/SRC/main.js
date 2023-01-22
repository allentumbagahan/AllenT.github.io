const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const intersecting = entry.isIntersecting;
        entry.target.style.backgroundColor = intersecting ? 'blue' : 'black';      }
    },
    // 👇 Threshold is 100%
    { rootMargin: '-50px' }
  );
  
  const box = document.getElementsByClassName('card');
  
  observer.observe(box);