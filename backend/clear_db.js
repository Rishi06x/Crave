import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function clearDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Recipe = (await import('./models/Recipe.js')).default;
    await Recipe.deleteMany({});
    console.log("Deleted all recipes from database.");
  } catch (e) {
    console.error(e);
  } finally {
    process.exit();
  }
}

clearDb();
