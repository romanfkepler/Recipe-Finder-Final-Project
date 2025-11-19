// HOMEPAGE JAVASCRIPT
// home.js
// Handles the search form submission and featured recipe cards on Home page

document.addEventListener("DOMContentLoaded", () => {

    const searchForm = document.getElementById("searchForm");
    const ingredientInput = document.getElementById("ingredientInput");
    const featuredContainer = document.getElementById("featuredCards");

    // --- SEARCH FORM HANDLING ---
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form from submitting normally

        const ingredients = ingredientInput.value.trim();

        if (ingredients === "") {
            alert("Please enter at least one ingredient.");
            return;
        }

        // Redirect to recipe_results.html with query parameter
        const queryString = encodeURIComponent(ingredients);
        window.location.href = `recipe_results.html?ingredients=${queryString}`;
    });

    // --- FEATURED RECIPES POPULATION ---
    // Take the first 3 recipes as featured
    const featuredRecipes = recipes.slice(0, 3);

    featuredRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <div class="card-front">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
                <button class="view-recipe">View Recipe</button>
            </div>
            <div class="card-back">
                <h4>Ingredients</h4>
                <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
                <h4>Instructions</h4>
                <p>${recipe.instructions}</p>
                <h4>Nutrition</h4>
                <p>${recipe.nutrition}</p>
                <button class="print-btn">Print Recipe</button>
                <button class="back-btn">Back</button>
            </div>
        `;

        featuredContainer.appendChild(card);

        // --- CARD FLIP FUNCTIONALITY ---
        const viewBtn = card.querySelector(".view-recipe");
        const backBtn = card.querySelector(".back-btn");
        const printBtn = card.querySelector(".print-btn");

        viewBtn.addEventListener("click", () => {
            card.classList.add("flipped");
        });

        backBtn.addEventListener("click", () => {
            card.classList.remove("flipped");
        });

        // --- PRINT FUNCTIONALITY ---
        printBtn.addEventListener("click", () => {
            // Open new window for printing only this recipe
            const printWindow = window.open("", "", "width=600,height=600");
            printWindow.document.write(`
                <html>
                    <head>
                        <title>${recipe.title}</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h1 { color: #ff7043; }
                            h2 { margin-top: 20px; }
                            ul { padding-left: 1.2rem; }
                        </style>
                    </head>
                    <body>
                        <h1>${recipe.title}</h1>
                        <h2>Ingredients</h2>
                        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
                        <h2>Instructions</h2>
                        <p>${recipe.instructions}</p>
                        <h2>Nutrition</h2>
                        <p>${recipe.nutrition}</p>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        });
    });

});
