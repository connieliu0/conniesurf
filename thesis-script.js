// thesis-script.js - Display select cards per thesis section

// Configuration: map thesis sections to card titles
// You can also use data-cards attribute on .thesis-cards containers for more control
const thesisSections = {
  "VALUES BASED SOFTWARE": [
    "software with a point of view - Chinatown.js talk",
    "link dump - a low fidelity archival tool",
    "new interfaces for 'vibe coding'",
    "the organic web"
  ],
  "THE WORLD CAN BECOME A BETTER PLACE IF EVERYONE WAS AN ARTIST": [
    "on trying to be an artist",
    "on change, on practice",
    "poetic comics 101 workshop"
  ],
  "UI AS STORY": [
    "RLG (Random Luck Generator)",
    "Find Your Self",
    "url message",
    "Returning Thoughts"
  ]
};

// Helper function to create cards in a container
function populateCardContainer(container, cardTitles, data) {
  cardTitles.forEach((title) => {
    const card = findCardByTitle(data, title);
    if (card) {
      const cardElement = createCardElement(card);
      container.appendChild(cardElement);
    } else {
      console.warn(`Card not found: ${title}`);
    }
  });
}

// Find a card by title in the data
function findCardByTitle(data, title) {
  for (const item of data.objects) {
    for (const card of item.gallery) {
      if (card.title === title) {
        return card;
      }
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Get all thesis section containers
      const sections = document.querySelectorAll('.thesis-section');
      
      sections.forEach((section) => {
        // Check for explicit card containers with data-cards attribute
        const explicitContainers = section.querySelectorAll('.thesis-cards[data-cards]');
        
        if (explicitContainers.length > 0) {
          // Use explicit containers - each has its own card list
          explicitContainers.forEach((container) => {
            const cardList = container.getAttribute('data-cards');
            // Parse comma-separated list of card titles
            const cardTitles = cardList.split(',').map(title => title.trim()).filter(title => title);
            populateCardContainer(container, cardTitles, data);
          });
        } else {
          // Fall back to section-level configuration
          let sectionKey = section.getAttribute('data-section');
          
          // If no data attribute, try to get it from the <p id="cat"> element
          if (!sectionKey) {
            const sectionTitleElement = section.querySelector('.line p#cat');
            if (sectionTitleElement) {
              sectionKey = sectionTitleElement.textContent.trim();
            }
          }
          
          if (!sectionKey) return;
          
          const cardTitles = thesisSections[sectionKey];
          
          if (!cardTitles) {
            console.warn(`No cards configured for section: ${sectionKey}`);
            return;
          }
          
          // Look for existing cards container, or create one
          let cardsContainer = section.querySelector('.thesis-cards');
          if (!cardsContainer) {
            // Create a container for cards in this section
            cardsContainer = document.createElement("div");
            cardsContainer.className = "line thesis-cards";
            // Append cards container to the section (after any existing content)
            section.appendChild(cardsContainer);
          }
          
          populateCardContainer(cardsContainer, cardTitles, data);
        }
      });
      
      // Initialize lazy loading for images
      initLazyLoading();
    })
    .catch((error) => console.error("Error fetching data:", error));
});

