/**
 * @file server.js
 * @description Express server to serve static files and handle API requests for Recipe Finder application
 * @requires express
 * @requires path
 * @requires ./recipes
 * @module server.js
 * @constant {number} PORT - Port number for the server
 * @default 3000
 */
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const recipes = require('./recipes');

/**
 * @description Middleware to serve static files and parse form data
 * @function use
 * @param {string} path - Path to static files
 * @param {function} express.static - Express static middleware
 */
app.use(express.static(path.join(__dirname)));

/**
 * @description Middleware to parse URL-encoded and JSON form data
 * @function use  
 * @param {object} express.urlencoded - Middleware to parse URL-encoded data
 * @param {object} express.json - Middleware to parse JSON data
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * @description CORS middleware for AJAX requests if needed
 * @function use
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

/**
 * @description Route: Home page
 * @function get
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * @description Route: Recipe Results page
 * @function get
 * @param {string} recipe_results.html - Recipe Results HTML file
 */
app.get('/recipe_results.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'recipe_results.html'));
});

/**
 * @description Route: Contact/About page
 * @function get
 * @param {string} contact_about.html - Contact/About HTML file
 */
app.get('/contact_about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact_about.html'));
});

/**
 * @description API Endpoint: Search recipes by ingredient(s)
 * @function get
 */
app.get('/search', (req, res) => {
  const query = req.query.ingredients?.toLowerCase() || "";
  const results = recipes.filter(recipe =>
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
  );
  res.json(results);
});

/**
 * @description API Endpoint: Contact form submission
 * @function post
 */
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form submission:", { name, email, message });
  // TODO: Store in a database or send email if needed
  res.json({ status: 'success', message: 'Your message has been received!' });
});

/**
 * @description 404 handler
 * @function use
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next middleware function
 */
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html')); // optional 404 page
});

/**
 * @description Start the Express server
 * @function listen
 * @param {number} PORT - Port number
 */
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

/**
 * @description Start the server
 * @function listen
 * @param {number} PORT - Port number
 */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

