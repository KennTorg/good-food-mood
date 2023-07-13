const foodUrl = "https://themealdb.p.rapidapi.com/filter.php?i=chicken_breast";
const foodOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9a8ae15c5bmshf98d01efc34253bp1ae145jsn62409f75c5d1",
    "X-RapidAPI-Host": "themealdb.p.rapidapi.com",
  },
};

async function fetchFood() {
  try {
    const response = await fetch(foodUrl, foodOptions);
    const result = await response.json();
    const imageSlider = document.querySelector(".img-slider");

    result.meals.forEach((meal, index) => {
      const image = document.createElement("img");
      image.src = meal.strMealThumb;
      image.alt = meal.strMeal;
      image.style.display = index === 0 ? "block" : "none";
      imageSlider.appendChild(image);
    });

    let currentIndex = 0;
    const images = imageSlider.querySelectorAll("img");
    const totalImages = images.length;

    setInterval(() => {
      images[currentIndex].style.display = "none";
      currentIndex = (currentIndex + 1) % totalImages;
      images[currentIndex].style.display = "block";
    }, 3000); // image change timer
  } catch (error) {
    console.error(error);
  }
}

fetchFood();
