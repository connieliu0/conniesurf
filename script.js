// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Fetch JSON data

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Generate UI components
      const gallery = document.getElementById("gallery");
      data.objects.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `<p>${item.year}</p><p>${item.desc}</p>`;
        itemElement.className = "container line yes";
        gallery.appendChild(itemElement);
        const galleries = item.gallery;
        galleries.forEach((card) => {
          const anchorElement = document.createElement("a");
          anchorElement.href = card.link;
          anchorElement.target = "_blank";
          // const galElement = document.createElement("div");
          anchorElement.className =
            "container card " + card.type + " " + card.featured;
          if (card.type == "♫" || card.type == "⚘") {
            anchorElement.style.backgroundImage = "url(" + card.cover.src + ")";
            anchorElement.innerHTML = `<p class="type">${card.type}</p><p class="title">${card.title}</p>`;
          } else if (card.type == "comic" || card.type == "art") {
            anchorElement.innerHTML = `<img src=${card.cover.src} class="zoomable"></img>`;
          } else {
            anchorElement.innerHTML = `<div class="text"><p class="type">${card.type}</p><p class="title">${card.title}</p><p class="desc">${card.cover.src}</p></div>`;
          }
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
  items.forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "flex";
      // bodyElement.style.backgroundImage = "none"; // Change background color
    } else {
      item.style.display = "none";
    }
  });
}
