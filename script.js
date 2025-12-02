// script.js
let texts = {};
const cat = document.getElementById("cat");
const desc = document.getElementById("desc");

document.addEventListener("DOMContentLoaded", function () {
  // Fetch JSON data
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Generate UI components
      texts = data.header;
      const gallery = document.getElementById("gallery");
      const fragment = document.createDocumentFragment(); // Create a fragment
      data.objects.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `${item.year} ~ ${item.desc}`;
        itemElement.className = "container line highlights";
        fragment.appendChild(itemElement); // Append to fragment
        const galleries = item.gallery;
        galleries.forEach((card) => {
          const cardElement = createCardElement(card);
          cat.textContent = "everything";
          desc.textContent = texts[0]["everything"];
          fragment.appendChild(cardElement); // Append to fragment
        });
      });
      gallery.appendChild(fragment); // Append fragment to the DOM once
    })
    .catch((error) => console.error("Error fetching data:", error));
});

// LAZY LOADING
initLazyLoading();

function filterGallery(category) {
  const items = document.querySelectorAll(".container");
  document.body.style.backgroundImage = 'url("./image/' + category + '.webp")';
  items.forEach((item) => {
    cat.textContent = category;
    desc.textContent = texts[0][category];
    console.log(texts[category]);
    if (category === "everything" || item.classList.contains(category)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
