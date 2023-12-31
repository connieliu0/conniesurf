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
      const fixedContentMap = {
        now: {
          top: "<h1>NOW</h1><p>last updated december 23 2023 it’s 47 degrees and windy</p>",
          center:
            "<img src='./image/about/now.png' alt='a photo I took that I enjoy'/>",
          bottom:
            "<p>this is something I found lovely recently, it has nothing to do with the right, but if you hover on <span>text</span> it could be more relevant</p>",
        },
        influences: {
          top: "<h1>INFLUENCES</h1><p>the lists that no one asked for</p>",
          center:
            "<p>sometimes I think we are made of what our interests are and they embed themselves into our lives</p>",
          bottom: "<p>hover on images to learn more</p>",
        },
        dreams: {
          top: "<h1>DREAMS</h1>",
          center: "<p></p>",
          bottom: "<p>believe it!</p>",
        },
        values: {
          top: "<h1>VALUES</h1><p>This generally what I live by. </p>",
          center: "",
          bottom: "<p>subject to change</p>",
        },
        past: {
          top: "",
          center: "<h1>PAST</h1>",
          bottom: "",
        },
      };
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
            if (fixedContentMap[sectionId]) {
              topsec.innerHTML = fixedContentMap[sectionId].top;
              center.innerHTML = fixedContentMap[sectionId].center;
              bottom.innerHTML = fixedContentMap[sectionId].bottom;
            }
          }
        });
      });
    });
});
