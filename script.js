const links=[...document.querySelectorAll('.navlinks a')];
const sections=[...document.querySelectorAll('main section[id]')];
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      links.forEach(a=>a.style.textDecoration='none');
      const hit=links.find(a=>a.getAttribute('href')===`#${e.target.id}`);
      if(hit) hit.style.textDecoration='underline';
    }
  })
},{rootMargin:'-35% 0px -55%'});
sections.forEach(s=>obs.observe(s));
