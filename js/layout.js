// Unified layout system: loads navigation, date, and page content
(function(){
  // Get the current page name for content loading
  function getPageId() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return path.replace('.html', '');
  }

  // Set the active nav link based on current page
  function setActive(navRoot) {
    var links = navRoot.querySelectorAll('a');
    var path = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function(a) {
      var href = a.getAttribute('href');
      if(href === path) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  // Load and inject all dynamic content
  Promise.all([
    fetch('/nav.html').then(function(r){ return r.ok ? r.text() : ''; }).catch(function(){ return ''; }),
    fetch('/pages/' + getPageId() + '-content.html').then(function(r){ return r.ok ? r.text() : ''; }).catch(function(){ return ''; }),
    fetch('/update_date.html').then(function(r){ return r.ok ? r.text() : ''; }).catch(function(){ return ''; })
  ]).then(function(results){
    var navHtml = results[0] || '';
    var pageContent = results[1] || '';
    var dateHtml = results[2] || '';

    // Inject nav
    var navContainer = document.querySelector('nav.nav-section');
    if(navContainer && navHtml) {
      var navWrapper = document.createElement('div');
      navWrapper.innerHTML = navHtml;
      navContainer.innerHTML = '';
      navContainer.appendChild(navWrapper);
      setActive(navContainer);
    }

    // Inject date
    if(dateHtml && navContainer) {
      var dateDiv = document.createElement('div');
      dateDiv.className = 'updated-date';
      dateDiv.innerHTML = dateHtml;
      navContainer.insertBefore(dateDiv, navContainer.firstChild);
    }

    // Inject page content
    var bodyContainer = document.querySelector('div.body-section');
    if(bodyContainer && pageContent) {
      bodyContainer.innerHTML = pageContent;
    }
  }).catch(function(err){
    console.warn('Could not load layout components', err);
  });
})();