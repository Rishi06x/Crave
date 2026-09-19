import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Recipe = (await import('./models/Recipe.js')).default;
  const recipe = await Recipe.findOne();
  if (recipe) {
    console.log("Found recipe ID:", recipe._id);
    const res = await fetch(`http://localhost:5000/api/recipes/${recipe._id}/details`);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  }
  process.exit();
}

check();
