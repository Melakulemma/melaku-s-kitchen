const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // You might need: npm install jsonwebtoken
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = "melaku_secret_key_123"; // In a real app, put this in .env

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});
const User = mongoose.model('User', userSchema);

// --- ROUTES ---

// 1. Register Route
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ error: "Username taken" });

        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json({ message: "Admin created successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Login Route (NEW)
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Create a token that expires in 1 day
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        
        res.json({ message: "Login successful!", token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Get Products (Your existing route)
app.get('/api/recipes', (req, res) => {
    const tempRecipes = [
        { id: 1, title: "መላኩ ስፔሻል (Melaku Special)", price: 450, category: "Dinner", rating: 5, image: "images/melaku.jpg" },
        { id: 2, title: "ክትፎ (Kitfo)", price: 600, category: "Lunch", rating: 5, image: "images/kitfo.jpg" }
    ];
    res.json(tempRecipes);
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));