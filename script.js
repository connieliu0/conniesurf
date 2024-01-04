// script.js
let texts = {};
const cat = document.getElementById("cat");
const desc = document.getElementById("desc");
let anchorElement;
document.addEventListener("DOMContentLoaded", function () {
  // Fetch JSON data
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Generate UI components
      texts = data.header;
      const gallery = document.getElementById("gallery");
      data.objects.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `<p>${item.year}</p><p>${item.desc}</p>`;
        itemElement.className = "container line highlights";
        gallery.appendChild(itemElement);
        const galleries = item.gallery;
        galleries.forEach((card) => {
          if (card.link.length > 0) {
            anchorElement = document.createElement("a");
            anchorElement.href = card.link;
            anchorElement.target = "_blank";
          } else {
            anchorElement = document.createElement("div");
          }
          // const galElement = document.createElement("div");
          anchorElement.className =
            "container card " + card.type + " " + card.featured;
          if (card.type == "♫" || card.type == "⚘") {
            anchorElement.style.backgroundImage = "url(" + card.cover.src + ")";
            anchorElement.innerHTML = `<p class="type">${card.type}</p><p class="title">${card.title}</p>`;
          } else if (card.type == "comic" || card.type == "illos") {
            anchorElement.innerHTML = `<img src=${card.cover.src} class="zoomable"></img>`;
          } else {
            anchorElement.innerHTML = `<div class="text"><p class="type">${card.type}</p><p class="title">${card.title}</p><p class="desc">${card.cover.src}</p></div>`;
          }
          cat.innerHTML = "everything";
          desc.innerHTML = texts[0]["everything"];
          // anchorElement.appendChild(galElement);
          gallery.appendChild(anchorElement);
        });
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
function filterGallery(category) {
  const items = document.querySelectorAll(".container");
  // var chosen = document.getElementById(category);
  // chosen.classList.add("active");
  // document.body.style.backgroundImage = 'url("./image/bg2.jpg")';
  document.body.style.backgroundImage = 'url("./image/' + category + '.jpg")';
  items.forEach((item) => {
    cat.innerHTML = category;
    desc.innerHTML = texts[0][category];
    console.log(texts[category]);
    if (category === "everything" || item.classList.contains(category)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
