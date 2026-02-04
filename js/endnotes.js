// Endnote/Superscript Popup System
(function(){
  var activePopup = null;

  // Close popup when clicking outside
  document.addEventListener('click', function(e) {
    var endnote = e.target.closest('.endnote');
    if(!endnote && activePopup) {
      closePopup();
    }
  });

  // Close popup on escape key
  document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && activePopup) {
      closePopup();
    }
  });

  function closePopup() {
    if(activePopup) {
      activePopup.popup.classList.remove('active');
      activePopup.element.classList.remove('active');
      activePopup = null;
    }
  }

  function positionPopup(element, popup) {
    var rect = element.getBoundingClientRect();
    var top = rect.bottom + window.scrollY + 8;
    var left = rect.left + window.scrollX;
    
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';

    // Adjust if popup goes off-screen to the right
    setTimeout(function() {
      if(popup.offsetLeft + popup.offsetWidth > window.innerWidth) {
        popup.style.left = (window.innerWidth - popup.offsetWidth - 10 + window.scrollX) + 'px';
      }
    }, 0);
  }

  function openPopup(element) {
    // Close any existing popup
    if(activePopup) {
      closePopup();
    }

    var content = element.getAttribute('data-content');
    if(!content) return;

    // Create popup if it doesn't exist
    var popup = document.getElementById('endnote-popup-' + element.getAttribute('data-id'));
    if(!popup) {
      popup = document.createElement('div');
      popup.className = 'endnote-popup';
      popup.id = 'endnote-popup-' + element.getAttribute('data-id');
      popup.innerHTML = content;
      popup.style.position = 'absolute';
      document.body.appendChild(popup);
    }

    // Position popup
    positionPopup(element, popup);

    popup.classList.add('active');
    element.classList.add('active');
    activePopup = { element: element, popup: popup };
  }

  // Attach click handlers to all endnotes and their superscripts
  document.addEventListener('click', function(e) {
    var endnote = e.target.closest('.endnote');
    if(endnote) {
      e.preventDefault();
      openPopup(endnote);
    }
  });

  // Reposition popup on window resize or scroll
  window.addEventListener('resize', function() {
    if(activePopup) {
      positionPopup(activePopup.element, activePopup.popup);
    }
  });

  window.addEventListener('scroll', function() {
    if(activePopup) {
      positionPopup(activePopup.element, activePopup.popup);
    }
  });
})();
