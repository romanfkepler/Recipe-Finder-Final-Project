// RECIPE RESULTS JAVASCRIPT
document.addEventListener("DOMContentLoaded", () => {
    const recipeContainer = document.getElementById("recipeCards");
    const searchForm = document.getElementById("searchForm");
    const ingredientInput = document.getElementById("ingredientInput");

    // Function to create a recipe card
    function createRecipeCard(recipe) {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <div class="card-front">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <button class="view-recipe">View Recipe</button>
            </div>
            <div class="card-back">
                <h3>${recipe.title}</h3>
                <h4>Ingredients</h4>
                <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                <h4>Instructions</h4>
                <p>${recipe.instructions}</p>
                <h4>Nutrition</h4>
                <p>${recipe.nutrition}</p>
                <button class="back-btn">Back</button>
                <button class="print-btn">Print Recipe</button>
            </div>
        `;

        // Flip card
        const viewBtn = card.querySelector(".view-recipe");
        const backBtn = card.querySelector(".back-btn");
        const printBtn = card.querySelector(".print-btn");

        viewBtn.addEventListener("click", () => card.classList.add("flipped"));
        backBtn.addEventListener("click", () => card.classList.remove("flipped"));
        printBtn.addEventListener("click", () => {
            const printContent = card.querySelector(".card-back").innerHTML;
            const originalContent = document.body.innerHTML;
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            location.reload(); // reload to reattach JS events
        });

        return card;
    }

    // Function to display recipes based on search
    function displayRecipes(filter = "") {
        recipeContainer.innerHTML = "";
        const query = filter.toLowerCase();

        const filteredRecipes = recipes.filter(r =>
            r.title.toLowerCase().includes(query) ||
            r.ingredients.some(i => i.toLowerCase().includes(query)) ||
            r.instructions.toLowerCase().includes(query)
        );

        const toDisplay = filteredRecipes.length ? filteredRecipes : recipes;

        toDisplay.forEach(recipe => {
            const card = createRecipeCard(recipe);
            recipeContainer.appendChild(card);
        });
    }

    // Check query string from URL
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("ingredients") || "";
    ingredientInput.value = queryParam;

    displayRecipes(queryParam);

    // Handle search form
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = ingredientInput.value.trim();
        displayRecipes(query);
    });
});
