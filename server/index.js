require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connection with a 5-second timeout so it doesn't stay stuck
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000 
})
.then(() => console.log("🚀 DATABASE CONNECTED!"))
.catch(err => console.log("❌ CONNECTION ERROR:", err.message));

const Food = mongoose.model('Food', new mongoose.Schema({
    title: String, price: Number, category: String, image: String
}));

app.get('/api/recipes', async (req, res) => {
    const items = await Food.find();
    res.json(items);
});

app.post('/api/recipes', async (req, res) => {
    try {
        const item = new Food(req.body);
        await item.save();
        res.json({ message: "Food Added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("📡 Server on Port 5000"));