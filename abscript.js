const scrollDiv = document.getElementById("scrollable");
const fixedDiv = document.getElementById("dyn");
const topsec = fixedDiv.querySelector("#tight");
const center = fixedDiv.querySelector("#center");
const bottom = fixedDiv.querySelector("#bottom");
let topContent = topsec.innerHTML;
let centerContent = center.innerHTML;
let bottomContent = bottom.innerHTML;
let sectionId = "";
var isKeyPressed = false;
let previousPhoto = null;
let currentImage = null;

document.addEventListener("DOMContentLoaded", function () {
  fetch("abdata.json")
    .then((response) => response.json())
    .then((nowmap) => {
      document.addEventListener("keydown", function (event) {
        if (event.key === "i") {
          isKeyPressed = true;
        }
      });
      document.addEventListener("keyup", function (event) {
        isKeyPressed = false;
      });
      const spans = scrollDiv.querySelectorAll("span");
      spans.forEach((span) => {
        const spanId = span.id;
        span.addEventListener("mouseover", function () {
          if (nowmap[spanId]) {
            topsec.innerHTML = nowmap[spanId].top;
            center.innerHTML = nowmap[spanId].center;
            bottom.innerHTML = nowmap[spanId].bottom;
          }
        });
        span.addEventListener("mouseout", function () {
          if (isKeyPressed) {
            topsec.innerHTML = nowmap[spanId].top;
            center.innerHTML = nowmap[spanId].center;
            bottom.innerHTML = nowmap[spanId].bottom;
          } else {
            topsec.innerHTML = topContent;
            center.innerHTML = centerContent;
            bottom.innerHTML = bottomContent;
          }
        });
      });

      //LAZY LOADING
      const images = document.querySelectorAll('img[data-src]');
      function lazyLoad() {
        images.forEach(img => {
          if (isInViewport(img)) {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
          }
        });
      }

      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      // Initial load
      lazyLoad();

      // Lazy load images on scroll
      window.addEventListener('scroll', lazyLoad);

      scrollDiv.addEventListener("scroll", function () {
        var scrollPosition = scrollDiv.scrollTop;
        const sections = scrollDiv.querySelectorAll(".row");
        var viewportHeight = scrollDiv.clientHeight;
        var totalHeight = scrollDiv.scrollHeight;

        sections.forEach((section) => {
          const offset = section.offsetTop;
          const height = section.offsetHeight;
          sectionId = section.id;
          if (
            scrollPosition >= offset - 12 &&
            scrollPosition < offset + height
          ) {
            if (nowmap[sectionId]) {
              topsec.innerHTML = nowmap[sectionId].top;
              if (sectionId === "now" && currentImage) {
                center.innerHTML = '<div id="random-photo"></div>';
                const container = document.querySelector('#random-photo');
                container.style.display = 'flex';
                container.style.justifyContent = 'center';
                container.style.alignItems = 'center';
                container.style.width = '100%';
                container.style.height = '100%';
                container.appendChild(currentImage);
              } else {
                center.innerHTML = nowmap[sectionId].center;
              }
              bottom.innerHTML = nowmap[sectionId].bottom;
              topContent = topsec.innerHTML;
              centerContent = center.innerHTML;
              bottomContent = bottom.innerHTML;
            }
          } else if (scrollPosition + viewportHeight >= totalHeight) {
            topsec.innerHTML = nowmap["past"].top;
            center.innerHTML = nowmap["past"].center;
            bottom.innerHTML = nowmap["past"].bottom;
          }
        });
      });
    });

  // inspiration from mygirlfriendisanartist.com
  async function fetchRandomPhoto() {
    const channelSlug = 'island-textures';
    const container = document.querySelector('#random-photo');
    
    // Style the container first
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.width = '100%';
    container.style.height = '100%';
    
    // Create a loading div
    const loadingDiv = document.createElement('div');
    loadingDiv.style.color = 'gray';
    loadingDiv.style.textAlign = 'center';
    loadingDiv.style.width = '100%';
    loadingDiv.textContent = 'an image is being transmitted...';
    
    // Clear and append loading state
    container.innerHTML = '';
    container.appendChild(loadingDiv);
    
    try {
      const response = await fetch(`https://api.are.na/v2/channels/${channelSlug}/contents`, {
        headers: {
          'Cache-Control': 'max-age=3600'
        }
      });
      const data = await response.json();
      
      const images = data.contents.filter(block => block.class === 'Image');
      
      if (images.length === 0) {
        container.innerHTML = '<div style="color: red; text-align: center;">No images found</div>';
        return;
      }
      
      let randomImage;
      do {
        randomImage = images[Math.floor(Math.random() * images.length)];
      } while (randomImage === previousPhoto);

      previousPhoto = randomImage;

      if (!randomImage.image?.original?.url) {
        container.innerHTML = '<div style="color: red; text-align: center;">Invalid image</div>';
        return;
      }
      
      // Preload the image
      const img = new Image();
      img.onload = () => {
        container.innerHTML = '';
        // Style the image container
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.width = '100%';
        container.style.height = '100%';
        
        // Style the image
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        container.appendChild(img);
        
        // Store the current image
        currentImage = img;
      };
      img.onerror = () => {
        container.innerHTML = '<div style="color: red; text-align: center;">Failed to load image</div>';
      };
      img.src = randomImage.image.original.url;
      img.alt = randomImage.title || 'a photo from Galiano Island';
      
    } catch (error) {
      console.error('Error fetching from Are.na:', error);
      container.innerHTML = '<div style="color: red; text-align: center;">Failed to load image</div>';
    }
  }

  // Call fetchRandomPhoto when the page loads
  fetchRandomPhoto();
});
