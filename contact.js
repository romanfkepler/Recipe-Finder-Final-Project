// contact.js

document.addEventListener("DOMContentLoaded", () => {
    // --- SEARCH FORM ---
    const searchForm = document.getElementById("searchForm");
    const ingredientInput = document.getElementById("ingredientInput");

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent normal form submit

        const ingredients = ingredientInput.value.trim();
        if (!ingredients) {
            alert("Please enter at least one ingredient.");
            return;
        }

        // Redirect to recipe_results.html with query parameter
        const queryString = encodeURIComponent(ingredients);
        window.location.href = `recipe_results.html?ingredients=${queryString}`;
    });

    // --- CONTACT FORM ---
    const contactForm = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Gather form data
            const formData = {
                name: contactForm.name.value.trim(),
                email: contactForm.email.value.trim(),
                message: contactForm.message.value.trim()
            };

            if (!formData.name || !formData.email || !formData.message) {
                feedback.textContent = "Please fill out all fields.";
                feedback.style.color = "red";
                return;
            }

            try {
                // Send data to backend
                const response = await fetch("/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                feedback.textContent = result.message;
                feedback.style.color = "green";
                contactForm.reset();
            } catch (err) {
                feedback.textContent = "Error sending message. Please try again.";
                feedback.style.color = "red";
                console.error(err);
            }
        });
    }
});
