const mongoose = require('mongoose');

// Your direct link with password
const uri = "mongodb+srv://melaku:melaku2121@cluster0.orfhtrm.mongodb.net/ethioRecipeDB?retryWrites=true&w=majority";

console.log("🔄 Starting direct connection test...");

mongoose.connect(uri)
  .then(() => {
    console.log("------------------------------------------");
    console.log("✅ SUCCESS! Your internet can reach MongoDB.");
    console.log("✅ Password 'melaku2121' is CORRECT.");
    console.log("------------------------------------------");
    process.exit(); // Closes the test
  })
  .catch(err => {
    console.log("❌ CONNECTION FAILED.");
    console.error("Error Message:", err.message);
    console.log("------------------------------------------");
    process.exit();
  });