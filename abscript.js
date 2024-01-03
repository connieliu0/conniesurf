const scrollDiv = document.getElementById("scrollable");
const fixedDiv = document.getElementById("dyn");
const topsec = fixedDiv.querySelector("#tight");
const center = fixedDiv.querySelector("#center");
const bottom = fixedDiv.querySelector("#bottom");
let topContent = "";
let centerContent = "";
let bottomContent = "";
document.addEventListener("DOMContentLoaded", function () {
  fetch("abdata.json")
    .then((response) => response.json())
    .then((nowmap) => {
      const spans = scrollDiv.querySelectorAll("span");
      spans.forEach((span) => {
        const spanId = span.id;
        span.addEventListener("mouseover", function () {
          if (nowmap[spanId]) {
            topContent = topsec.innerHTML;
            centerContent = center.innerHTML;
            bottomContent = bottom.innerHTML;
            topsec.innerHTML = nowmap[spanId].top;
            center.innerHTML = nowmap[spanId].center;
            bottom.innerHTML = nowmap[spanId].bottom;
          }
        });
        span.addEventListener("mouseout", function () {
          topsec.innerHTML = topContent;
          center.innerHTML = centerContent;
          bottom.innerHTML = bottomContent;
        });
      });
      scrollDiv.addEventListener("scroll", function () {
        const scrollPosition = scrollDiv.scrollTop;
        const sections = scrollDiv.querySelectorAll(".row");
        sections.forEach((section) => {
          const offset = section.offsetTop;
          const height = section.offsetHeight;
          const sectionId = section.id;

          if (
            scrollPosition >= offset - 12 &&
            scrollPosition < offset + height
          ) {
            if (nowmap[sectionId]) {
              topsec.innerHTML = nowmap[sectionId].top;
              center.innerHTML = nowmap[sectionId].center;
              bottom.innerHTML = nowmap[sectionId].bottom;
            }
          }
        });
      });
    });
});
