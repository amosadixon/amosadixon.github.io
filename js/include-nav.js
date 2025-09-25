// Fetch nav.html and insert it into the page, then set the active class based on location
(function(){
  function setActive(navRoot){
    var links = navRoot.querySelectorAll('a');
    var path = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function(a){
      var href = a.getAttribute('href');
      if(href === path) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  // Fetch date and nav fragments in parallel
  Promise.all([
    fetch('/update_date.html').then(function(r){ if(!r.ok) return ''; return r.text(); }).catch(function(){ return ''; }),
    fetch('/nav.html').then(function(r){ if(!r.ok) return ''; return r.text(); }).catch(function(){ return ''; })
  ]).then(function(results){
    var dateHtml = results[0] || '';
    var navHtml = results[1] || '';
    var container = document.querySelector('nav.nav-section');
    if(!container) return;
    // clear existing contents
    container.innerHTML = '';

    if(dateHtml) {
      var dateEl = document.createElement('div');
      dateEl.innerHTML = dateHtml;
      container.appendChild(dateEl);
    }

    if(navHtml) {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = navHtml;
      container.appendChild(wrapper);
    }

    setActive(container);
  }).catch(function(err){
    console.warn('Could not load nav or date fragments', err);
  });
})();
