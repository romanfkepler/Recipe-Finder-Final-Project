// RECIPE RESULTS JAVASCRIPT

document.addEventListener("DOMContentLoaded", () => {

    const searchForm = document.getElementById("searchForm");
    const ingredientInput = document.getElementById("ingredientInput");

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

});