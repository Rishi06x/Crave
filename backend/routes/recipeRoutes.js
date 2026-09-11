import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// Helper function to fetch and format recipes from Spoonacular
async function fetchAndSeedRecipes(tag, spoonacularUrl) {
  console.log(`Fetching ${tag} recipes from Spoonacular...`);
  try {
    const response = await fetch(`${spoonacularUrl}&apiKey=${process.env.SPOONACULAR_API_KEY}&addRecipeInformation=true`);
    const data = await response.json();
    
    // Some endpoints return 'recipes' (like random), some return 'results' (like complexSearch)
    const rawRecipes = data.recipes || data.results;

    if (rawRecipes && rawRecipes.length > 0) {
      const formatted = rawRecipes.map(r => ({
        title: r.title,
        description: r.summary ? r.summary.replace(/<[^>]*>?/gm, '').slice(0, 120) + '...' : 'A delicious recipe.',
        category: r.dishTypes?.[0] || 'Dinner',
        tags: [tag], // Add the tag so we can query them later!
        imageHero: r.image || 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
        prepTime: r.readyInMinutes || 20,
        cookTime: 15, // Default/Mock since Spoonacular doesn't always split prep vs cook
        totalTime: r.readyInMinutes || 35,
        baseServings: r.servings || 2,
        viewCount: Math.floor(Math.random() * 500) + 100, // Mock view count
        nutrition: {
          // Add real calories from API if available
          calories: r.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || Math.floor(Math.random() * 300) + 200,
        },
        ingredients: r.extendedIngredients?.map(i => ({
          name: i.nameClean || i.name,
          amount: i.amount || 1,
          unit: i.unit || 'unit'
        })) || [],
        instructions: r.analyzedInstructions?.[0]?.steps?.map(s => s.step) || ['Cook and serve hot.']
      }));

      await Recipe.insertMany(formatted);
      return formatted;
    }
  } catch (error) {
    console.error(`Error seeding ${tag}:`, error);
  }
  return [];
}

router.get('/trending', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const count = await Recipe.countDocuments({ tags: 'trending' });
    if (count === 0) {
      await fetchAndSeedRecipes('trending', 'https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=30');
    }

    const recipes = await Recipe.find({ tags: 'trending' }).skip(skip).limit(limit);
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const count = await Recipe.countDocuments({ tags: 'featured' });
    if (count === 0) {
      await fetchAndSeedRecipes('featured', 'https://api.spoonacular.com/recipes/complexSearch?sort=random&number=30');
    }

    const recipes = await Recipe.find({ tags: 'featured' }).skip(skip).limit(limit);
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

router.get('/quick', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const count = await Recipe.countDocuments({ tags: 'quick' });
    if (count === 0) {
      await fetchAndSeedRecipes('quick', 'https://api.spoonacular.com/recipes/complexSearch?maxReadyTime=20&sort=popularity&number=30');
    }

    const recipes = await Recipe.find({ tags: 'quick' }).skip(skip).limit(limit);
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// GET /api/recipes/live-explore
// Handles live dynamic searching and filtering by meal type
router.get('/live-explore', async (req, res) => {
  try {
    const { search, type, maxTime, diet, maxCalories, offset = 0 } = req.query;

    let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&number=12&offset=${offset}&addRecipeInformation=true&addRecipeNutrition=true`;

    if (search) apiUrl += `&query=${search}`;
    if (type && type !== 'All') apiUrl += `&type=${type}`;
    if (maxTime) apiUrl += `&maxReadyTime=${maxTime}`;
    if (diet) apiUrl += `&diet=${diet}`;
    if (maxCalories) apiUrl += `&maxCalories=${maxCalories}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.status(200).json(data.results || []);
  } catch (error) {
    console.error('Live fetch error:', error);
    res.status(500).json({ message: 'Error fetching live catalog' });
  }
});

export default router;