// card-utils.js - Shared utility functions for card creation

// Reusable function to create a card element from card data
function createCardElement(card) {
  let anchorElement;
  if (card.link && card.link.length > 0) {
    anchorElement = document.createElement("a");
    anchorElement.href = card.link;
    anchorElement.onclick = (e) => {
      e.preventDefault();
      window.open(card.link, '_blank', 'width=1200,height=700,left=200,top=200,noopener,noreferrer');
    };
  } else {
    anchorElement = document.createElement("div");
  }
  
  anchorElement.className = "container card " + card.type + " " + card.featured;
  
  if (card.type == "✧" || card.type == "⚘" || card.type == "❥") {
    anchorElement.style.backgroundImage = "url(" + card.cover.src + ")";
    anchorElement.innerHTML = `<p class="type">${card.type}</p><p class="title">${card.title}</p>`;
  } else if (card.type == "comic" || card.type == "illos") {
    const imgAlt = (card.cover && card.cover.alt) || card.title || "";
    const imgSrc = (card.cover && card.cover.src) || "";
    anchorElement.innerHTML = `<img src="${imgSrc}" class="zoomable" data-src="${imgSrc}" alt="${imgAlt}"></img>`;
  } else {
    anchorElement.innerHTML = `<div class="text"><p class="type">${card.type}</p><p class="title">${card.title}</p><p class="desc">${card.cover.src}</p></div>`;
  }
  
  return anchorElement;
}

// Lazy loading utility function
function lazyLoadImage(img) {
  const url = img.getAttribute('data-src');
  if (url) {
    img.src = url;
    img.removeAttribute('data-src');
  }
}

// Initialize lazy loading for images (optional container = only observe imgs inside it)
function initLazyLoading(container) {
  const root = container && container.nodeType === 1 ? container : document;
  const lazyImages = root.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lazyLoadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01 });
  
  lazyImages.forEach((img) => {
    observer.observe(img);
  });
}

