const addBtn = document.getElementById("addRecipeBtn");
const formContainer = document.getElementById("formContainer");
const gallery = document.getElementById("recipeGallery");
const details = document.getElementById("recipeDetails");

const imageInput = document.getElementById("imageUpload");
const nameInput = document.getElementById("recipeName");
const ingredientsInput = document.getElementById("ingredients");
const processInput = document.getElementById("process");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

// === Show Add Form ===
addBtn.onclick = () => {
  formContainer.style.display = "flex";
};

// === Hide Form ===
function closeForm() {
  formContainer.style.display = "none";
  imageInput.value = '';
  nameInput.value = '';
  ingredientsInput.value = '';
  processInput.value = '';
}

// === Save Recipe ===
function saveRecipe() {
  const file = imageInput.files[0];
  const name = nameInput.value.trim();
  const ingredients = ingredientsInput.value.trim();
  const process = processInput.value.trim();

  if (!file || !name || !ingredients || !process) {
    alert("Please fill in all fields and upload an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const newRecipe = {
      id: Date.now(),
      name: name,
      image: e.target.result,
      ingredients: ingredients,
      process: process
    };
    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    renderGallery();
    closeForm();
  };
  reader.readAsDataURL(file);
}

// === Display Gallery ===
function renderGallery() {
  gallery.innerHTML = '';
  recipes.forEach(recipe => {
    const div = document.createElement('div');
    div.className = 'recipe-card';
    div.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}" title="${recipe.name}">`;
    div.onclick = () => showDetails(recipe);
    gallery.appendChild(div);
  });
}

// === Show Recipe Details ===
function showDetails(recipe) {
  details.innerHTML = `
    <h3>📌 ${recipe.name}</h3>
    <p><strong>🧂 Ingredients:</strong><br>${recipe.ingredients.replace(/\n/g, '<br>')}</p>
    <p><strong>👨‍🍳 Process:</strong><br>${recipe.process.replace(/\n/g, '<br>')}</p>
  `;
}

// === Load on Page Start ===
renderGallery();
