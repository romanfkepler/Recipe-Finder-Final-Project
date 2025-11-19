// home.js

// Function to print only the selected recipe with title
function printRecipe(card) {
  const printWindow = window.open('', '', 'width=800,height=600');

  // Get the recipe title from the front of the card
  const recipeTitle = card.querySelector('.card-front h3').textContent;

  // Get the back content (ingredients, instructions, nutrition)
  const cardContent = card.querySelector('.card-back').innerHTML;

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Recipe - ${recipeTitle}</title>
        <link rel="stylesheet" href="home_styles.css">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #fff; color: #000; }
          h1 { text-align: center; margin-bottom: 1rem; }
          h4 { margin-bottom: 0.3rem; }
          ul { margin-top: 0; padding-left: 1.2rem; }
          button { display: none; }
        </style>
      </head>
      <body>
        <h1>${recipeTitle}</h1>
        ${cardContent}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

// Populate Featured Recipes (first 3 from recipes.js)
const featuredContainer = document.getElementById('featuredCards');
const featuredRecipes = recipes.slice(0, 3);

featuredRecipes.forEach(recipe => {
  const card = document.createElement('div');
  card.className = 'recipe-card';
  card.innerHTML = `
    <div class="card-front">
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <button class="view-recipe">View Recipe</button>
    </div>
    <div class="card-back">
      <h4>Ingredients</h4>
      <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      <h4>Instructions</h4>
      <p>${recipe.instructions}</p>
      <h4>Nutrition</h4>
      <p>${recipe.nutrition}</p>
      <button class="print-btn">Print Recipe</button>
      <button class="back-btn">Back</button>
    </div>
  `;
  featuredContainer.appendChild(card);

  // Flip to back on "View Recipe"
  const viewBtn = card.querySelector('.view-recipe');
  viewBtn.addEventListener('click', () => {
    card.classList.add('flipped');
  });

  // Flip back on "Back" button
  const backBtn = card.querySelector('.back-btn');
  backBtn.addEventListener('click', () => {
    card.classList.remove('flipped');
  });

  // Print only this card
  const printBtn = card.querySelector('.print-btn');
  printBtn.addEventListener('click', () => printRecipe(card));
});

// Search Form
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('ingredientInput').value.trim();
  if (!query) {
    alert('Please enter at least one ingredient.');
    return;
  }
  // Redirect to Recipe Results page with query parameter
  window.location.href = `recipe_results.html?ingredients=${encodeURIComponent(query)}`;
});
