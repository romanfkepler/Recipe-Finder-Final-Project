const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const recipes = require('./recipes');

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Optional: Enable CORS (for AJAX fetch requests if needed)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Route: Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Route: Recipe Results page
app.get('/recipe_results.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'recipe_results.html'));
});

// Route: Contact/About page
app.get('/contact_about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact_about.html'));
});

// API Endpoint: Search recipes by ingredient(s)
app.get('/search', (req, res) => {
  const query = req.query.ingredients?.toLowerCase() || "";
  const results = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
  );
  res.json(results);
});

// API Endpoint: Contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submission:", { name, email, message });
  // TODO: Store in a database or send email if needed
  res.json({ status: 'success', message: 'Your message has been received!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html')); // optional 404 page
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

