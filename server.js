// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const recipes = require('./recipes'); // your recipes.js

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Routes

// Homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Recipe Results page
app.get('/recipe_results.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'recipe_results.html'));
});

// Contact/About page
app.get('/contact_about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact_about.html'));
});

// API endpoint to get all recipes
app.get('/api/recipes', (req, res) => {
    res.json(recipes);
});

// API endpoint for searching recipes
app.get('/api/search', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    if (!query) return res.json(recipes);

    const results = recipes.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.ingredients.some(i => i.toLowerCase().includes(query)) ||
        r.instructions.toLowerCase().includes(query)
    );
    res.json(results);
});

// API endpoint to receive contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    console.log('Contact Form Submission:', req.body);
    // In real app, save to DB or send email
    res.json({ success: true, message: 'Form submitted successfully!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

