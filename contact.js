/**
 * @file contact.js
 * @description JavaScript for Search and Contact Form functionality
 * @module contact.js
 */

/**
 * @description Search and Contact Form
 * @function addEventListener
 * @listens DOMContentLoaded
 * @param {Event} e
 * @typedef {Object} formData
 * @typedef {HTMLElement} searchForm
 */
document.addEventListener("DOMContentLoaded", () => {
    // --- SEARCH FORM ---
    const searchForm = document.getElementById("searchForm");
    const ingredientInput = document.getElementById("ingredientInput");

    /**
     * @description Listener for search form submission
     * @listens submit
     * @param {Event} e
     * @function addEventListener
     * @example
     * // Input field value: "chicken, garlic"
     * const queryString = encodeURIComponent(ingredients);
     * window.location.href = `recipe_results.html?ingredients=${queryString}`;
     * // Redirects to: recipe_results.html?ingredients=chicken%2C%20garlic
     */
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent normal form submit

        const ingredients = ingredientInput.value.trim();
        /**
         * @description Alert if submitted blank
         * @param {string} ingredients
         * @example
         * // If input is submitted blank
         * alert("Please enter at least one ingredient.");
         */
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

    /**
     * @description Listener for contact form submission
     * @listens submit
     * @param {Event} e
     * @function addEventListener
     * @typedef {Object} formData
     * @property {string} name - User's name from form
     * @property {string} email - User's email from form
     * @property {string} message - User's message from form
     * @example
     * // On form submission
     * const formData = {
     *  name: "John Doe",
     *  email: "john.doe@example.com",
     *  message: "Hello, I have a question about..."
     * };
     */
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Gather form data
            const formData = {
                name: contactForm.name.value.trim(),
                email: contactForm.email.value.trim(),
                message: contactForm.message.value.trim()
            };

            /**
             * @description Validate form fields
             * @param {Object} formData
             * @example
             * // If any field is empty
             * feedback.textContent = "Please fill out all fields.";
             */
            if (!formData.name || !formData.email || !formData.message) {
                feedback.textContent = "Please fill out all fields.";
                feedback.style.color = "red";
                return;
            }

            /**
             * @description Send form data to backend
             * @param {Object} formData
             * @property {string} formData.name
             * @property {string} formData.email
             * @property {string} formData.message
             */
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
