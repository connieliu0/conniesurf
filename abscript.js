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
              center.innerHTML = nowmap[sectionId].center;
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
});
