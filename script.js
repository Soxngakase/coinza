(function(){
  var root=document.documentElement;
  // theme toggle (remembered, but works without storage)
  var saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
  if(saved==='light'||saved==='dark')root.setAttribute('data-theme',saved);
  var tbtn=document.getElementById('themeBtn');
  function isDark(){var t=root.getAttribute('data-theme');if(t)return t==='dark';return window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches}
  function paint(){if(tbtn)tbtn.textContent=isDark()?'☀️':'🌙'}
  paint();
  if(tbtn)tbtn.addEventListener('click',function(){var n=isDark()?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}paint()});

  // mobile menu
  var burger=document.getElementById('burger'),menu=document.getElementById('menu');
  if(burger&&menu){
    burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
    menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}});
  }

  // scroll reveal
  var els=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}

  // earnings calculator (ads only; max 5 ads/day, 10 points each)
  var r=document.getElementById('adsRange');
  if(r){
    var f=function(n){return n.toLocaleString('en-US')};
    function calc(){
      var n=+r.value,day=n*10;
      document.getElementById('adsVal').textContent=n+(n===1?' ad':' ads');
      document.getElementById('perDay').textContent=f(day);
      document.getElementById('perWeek').textContent=f(day*7);
      document.getElementById('perMonth').textContent=f(day*30);
      document.getElementById('toMin').textContent=n===0?'–':Math.ceil(1000/day)+' days';
    }
    r.addEventListener('input',calc);calc();
  }
})();
