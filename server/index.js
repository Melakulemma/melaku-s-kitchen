const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = "melaku_secret_key_123";

// 1. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ Connection Error: ", err));

// 2. Schemas
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' }
});
const User = mongoose.model('User', userSchema);

const recipeSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String,
    image: String,
    rating: { type: Number, default: 5 }
});
const Recipe = mongoose.model('Recipe', recipeSchema);

// 3. Routes

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
});

// Get All Recipes (Now pulls from MongoDB!)
app.get('/api/recipes', async (req, res) => {
    const recipes = await Recipe.find();
    res.json(recipes);
});

// Add New Recipe (Admin Only)
app.post('/api/recipes', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).json({ message: "Product added successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add product" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
// Add this route to server/index.js if it's missing!
app.post('/api/recipes', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).json({ message: "Recipe saved to MongoDB!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save recipe" });
    }
});