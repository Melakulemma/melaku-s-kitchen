let allRecipes = [];

async function fetchRecipes() {
    const recipeList = document.getElementById('recipe-list');
    
    // Clear the list and show loading
    recipeList.innerHTML = "<li>Loading delicious food...</li>";

    try {
        const response = await fetch("mongodb+srv://melaku:melaku2121@cluster0.orfhtrm.mongodb.net/?appName=Cluster0");
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        allRecipes = await response.json();
        renderRecipes(allRecipes);
    } catch (error) {
        console.error("Fetch error:", error);
        recipeList.innerHTML = `<li style="color:red;">Server is waking up... Please refresh in 1 minute.</li>`;
    }
}

function renderRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = recipes.map(recipe => `
        <li class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
            <div class="card-content">
                <div class="rating-box">${"⭐".repeat(recipe.rating || 5)}</div>
                <strong>${recipe.title}</strong>
                <p>${recipe.price} ETB</p>
                <button onclick="addToCart(${recipe.id})">Add to Cart</button>
            </div>
        </li>
    `).join('');
}


// Initialize the app
document.addEventListener('DOMContentLoaded', fetchRecipes);

function addToCart(id) {
    alert("Added product " + id + " to cart!");
}


    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${title} added to your kitchen cart!`);
    updateCartCount(); // Optional: updates a counter in your navbar

// Run on page load
updateCartCount();
let cart = JSON.parse(localStorage.getItem('melaku_cart')) || [];

function addToCart(id, name, price) {
    const item = { id, name, price, quantity: 1 };
    
    // Check if already in cart
    const exists = cart.find(i => i.id === id);
    if (exists) {
        exists.quantity += 1;
    } else {
        cart.push(item);
    }

    localStorage.setItem('melaku_cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
    updateCartIcon(); // Refresh the number on your cart icon
}