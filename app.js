let allRecipes = [];

async function fetchRecipes() {
    const recipeList = document.getElementById('recipe-list');
    
    // Clear the list and show loading
    recipeList.innerHTML = "<li>Loading delicious food...</li>";

    try {
        const response = await fetch("https://melaku-e-shopping.onrender.com/api/recipes");
        
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