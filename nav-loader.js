// Ultra-lightweight nav loader with caching and active state detection
// Simple hash function to detect content changes
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString();
}

function loadNav() {
  const container = document.getElementById('nav-container');
  if (!container) return;
  
  // Always fetch to check if content changed (but use cache if unchanged)
  fetch('./nav.html?t=' + Date.now()) // Cache-bust query param
    .then(r => r.text())
    .then(html => {
      const newHash = simpleHash(html);
      const cachedHash = sessionStorage.getItem('nav-hash');
      const cachedNav = sessionStorage.getItem('nav-html');
      
      // If content hasn't changed, use cached version (avoids re-render)
      if (cachedNav && cachedHash === newHash) {
        container.innerHTML = cachedNav;
      } else {
        // Content changed or first load - use fresh HTML
        container.innerHTML = html;
        // Update cache
        sessionStorage.setItem('nav-html', html);
        sessionStorage.setItem('nav-hash', newHash);
      }
      updateNavState();
    })
    .catch(err => {
      console.error('Error loading nav:', err);
      // Fallback: try cached version if available
      const cachedNav = sessionStorage.getItem('nav-html');
      if (cachedNav) {
        container.innerHTML = cachedNav;
        updateNavState();
      } else {
        container.innerHTML = '<div class="sideNav">Navigation failed to load</div>';
      }
    });
}

function updateNavState() {
  const container = document.getElementById('nav-container');
  if (!container) return;
  
  // Detect current page from URL
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop().replace('.html', '') || 'index';
  
  // Update active class on nav links
  const navLinks = container.querySelectorAll('.page-nav a[data-page]');
  let activeFound = false;
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const pageName = link.getAttribute('data-page');
    let shouldBeActive = false;
    
    // Special case: root (index.html) should highlight thesis
    if ((currentPage === 'index' || currentPage === '') && pageName === 'thesis') {
      shouldBeActive = true;
    }
    // Special case: gallery.html should highlight index (data-page="index")
    else if (currentPage === 'gallery' && pageName === 'index') {
      shouldBeActive = true;
    }
    // Normal case: match data-page with currentPage
    else if (pageName === currentPage && currentPage !== 'index' && currentPage !== '') {
      shouldBeActive = true;
    }
    
    if (shouldBeActive && !activeFound) {
      link.classList.add('active');
      activeFound = true;
    }
  });
  
  // Configuration for page-specific nav elements
  // Each page maps to an object with element IDs and their display settings
  const pageConfig = {
    'index': {
      // Root (index.html) is now thesis, so use thesis config
      '#filter-buttons': { display: 'none' },
      '#about-extras': { display: 'none' },
      '#thesis-extras': { display: 'block' }
    },
    'gallery': {
      '#filter-buttons': { display: 'block' },
      '#about-extras': { display: 'none' },
      '#thesis-extras': { display: 'none' }
    },
    'about': {
      '#filter-buttons': { display: 'none' },
      '#about-extras': { 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      },
      '#thesis-extras': { display: 'none' }
    },
    'thesis': {
      '#filter-buttons': { display: 'none' },
      '#about-extras': { display: 'none' },
      '#thesis-extras': { display: 'block' }
    },
    // Default for all other pages
    'default': {
      '#filter-buttons': { display: 'none' },
      '#about-extras': { display: 'none' },
      '#thesis-extras': { display: 'none' }
    }
  };
  
  // Get config for current page or use default
  const config = pageConfig[currentPage] || pageConfig['default'];
  
  // Apply display settings to each element
  Object.keys(config).forEach(selector => {
    const element = container.querySelector(selector);
    if (element) {
      const styles = config[selector];
      Object.keys(styles).forEach(prop => {
        // Set CSS properties (camelCase works for style object)
        element.style[prop] = styles[prop];
      });
    }
  });
  
  // Set sideNav justify-content: only space-between for about page
  const sideNav = container.querySelector('.sideNav');
  if (sideNav) {
    if (currentPage === 'about') {
      sideNav.style.justifyContent = 'space-between';
    } else {
      // Use flex-start for all other pages
      sideNav.style.justifyContent = 'flex-start';
    }
  }
}

// Load nav on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadNav);
} else {
  loadNav();
}

