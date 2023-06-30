const url =
  "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9a8ae15c5bmshf98d01efc34253bp1ae145jsn62409f75c5d1",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

async function fetchRecipes() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    const recipes = result.results; // Assuming the recipes are stored in the 'results' property
    const recipeContainer = document.getElementById("recipeContainer");

    recipes.forEach((recipe) => {
      const card = createRecipeCard(recipe);
      recipeContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

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
    showRecipeModal(recipe);
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

function showRecipeModal(recipe) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const closeModal = document.getElementsByClassName("close")[0];

  modalTitle.textContent = recipe.name;
  modalDescription.textContent = recipe.description;

  modal.style.display = "block";

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

fetchRecipes();
