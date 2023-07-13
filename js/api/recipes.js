const recipesUrl =
  "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes";
const recipeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9a8ae15c5bmshf98d01efc34253bp1ae145jsn62409f75c5d1",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

async function fetchRecipes() {
  try {
    // ---- Loader ----
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    const response = await fetch(recipesUrl, recipeOptions);
    const result = await response.json();
    console.log(result);

    const recipes = result.results;
    const recipeContainer = document.getElementById("recipeContainer");

    recipeContainer.innerHTML = "";

    recipes.forEach((recipe) => {
      const card = createRecipeCard(recipe);
      recipeContainer.appendChild(card);
    });

    loader.style.display = "none";
  } catch (error) {
    console.error(error);
  }
}

// ---- Recipe cards -----
function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  const image = createImage(recipe.thumbnail_url);
  card.appendChild(image);

  const title = createTitle(recipe.name);
  card.appendChild(title);

  const details = createDetails(recipe.description);
  card.appendChild(details);

  card.addEventListener("click", () => {
    openModal(recipe);
  });

  return card;
}

function createImage(src) {
  const image = document.createElement("img");
  image.classList.add("recipe-image");
  image.src = src;
  return image;
}

function createTitle(name) {
  const title = document.createElement("h3");
  title.classList.add("recipe-title");
  title.textContent = name;
  return title;
}

function createDetails(description) {
  const details = document.createElement("div");
  details.classList.add("recipe-details");

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("recipe-description");
  descriptionElement.textContent = description;
  details.appendChild(descriptionElement);

  return details;
}

// --- MODAL ---
function openModal(recipe) {
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");

  modalImage.src = recipe.thumbnail_url;
  modalTitle.textContent = recipe.name;
  modalDescription.textContent = recipe.description;

  modal.style.display = "block";

  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", closeModal);
}

function closeModal() {
  const modal = document.getElementById("modal");

  modal.style.display = "none";
}

fetchRecipes();
