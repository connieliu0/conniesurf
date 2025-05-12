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
      const fragment = document.createDocumentFragment(); // Create a fragment
      data.objects.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.innerHTML = `${item.year} ~ ${item.desc}`;
        itemElement.className = "container line highlights";
        fragment.appendChild(itemElement); // Append to fragment
        const galleries = item.gallery;
        galleries.forEach((card) => {
          if (card.link.length > 0) {
            anchorElement = document.createElement("a");
            anchorElement.href = card.link;
            anchorElement.onclick = (e) => {
              e.preventDefault();
              window.open(card.link, '_blank', 'width=950,height=700,left=200,top=200,noopener,noreferrer');
            };
          } else {
            anchorElement = document.createElement("div");
          }
          anchorElement.className =
            "container card " + card.type + " " + card.featured;
          if (card.type == "✧" || card.type == "⚘" || card.type == "❥") {
            anchorElement.style.backgroundImage = "url(" + card.cover.src + ")";
            anchorElement.innerHTML = `<p class="type">${card.type}</p><p class="title">${card.title}</p>`;
          } else if (card.type == "comic" || card.type == "illos") {
            anchorElement.innerHTML = `<img src=${card.cover.src} class="zoomable" data-src="${card.cover.src}" alt="${card.title}"></img>`;
          } else {
            anchorElement.innerHTML = `<div class="text"><p class="type">${card.type}</p><p class="title">${card.title}</p><p class="desc">${card.cover.src}</p></div>`;
          }
          cat.textContent = "everything";
          desc.textContent = texts[0]["everything"];
          fragment.appendChild(anchorElement); // Append to fragment
        });
      });
      gallery.appendChild(fragment); // Append fragment to the DOM once
    })
    .catch((error) => console.error("Error fetching data:", error));
});

// LAZY LOADING
const lazyImages = document.querySelectorAll('img[data-src]');
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

function lazyLoadImage(img) {
  img.src = img.getAttribute('data-src');
  img.removeAttribute('data-src');
}

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
