const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Add this if missing
require('dotenv').config();

const app = express(); // <--- This MUST come before app.use

app.use(cors());
app.use(express.json());
// ... rest of your code

// 1. Database Connection
const URI = process.env.MONGO_URI;
mongoose.connect(URI)
    .then(() => console.log("✅ MongoDB Connected!"))
    .catch(err => console.log("❌ Connection Error: ", err));

// 2. User Schema (For Admin/Users)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});
const User = mongoose.model('User', userSchema);

// 3. Routes
app.get('/', (req, res) => res.send("Server is running!"));

// Get all products
app.get('/api/recipes', (req, res) => {
    // For now, using your temp data until we move it to MongoDB
    const tempRecipes = [
        { id: 1, title: "መላኩ ስፔሻል (Melaku Special)", price: 450, category: "Dinner", rating: 5, image: "images/melaku.jpg" },
        { id: 2, title: "ክትፎ (Kitfo)", price: 600, category: "Lunch", rating: 5, image: "images/kitfo.jpg" }
    ];
    res.json(tempRecipes);
});

// Register Route (Use this to create your Admin)
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));