import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

router.get('/trending', async (req, res) => {
  try {
    let recipes = await Recipe.find({}).limit(6);

    // If database is empty, auto-fetch Indian recipes from Spoonacular once
    if (recipes.length === 0) {
      console.log('Fetching Indian recipes from Spoonacular...');
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=6&tags=indian&apiKey=${process.env.SPOONACULAR_API_KEY}`
      );
      const data = await response.json();

      if (data.recipes) {
        const formatted = data.recipes.map(r => ({
          title: r.title,
          description: r.summary ? r.summary.replace(/<[^>]*>?/gm, '').slice(0, 120) + '...' : 'An authentic Indian delicacy.',
          category: r.dishTypes?.[0] || 'Dinner',
          imageHero: r.image || 'https://images.unsplash.com/photo-1585937421612-70a008356fbe', // Fallback image
          prepTime: r.readyInMinutes || 20,
          cookTime: 15,
          totalTime: r.readyInMinutes || 35,
          baseServings: r.servings || 2,
          viewCount: 100,
          ingredients: r.extendedIngredients?.map(i => ({
            name: i.nameClean || i.name,
            amount: i.amount || 1,
            unit: i.unit || 'unit'
          })) || [],
          instructions: r.analyzedInstructions?.[0]?.steps?.map(s => s.step) || ['Cook and serve hot.']
        }));

        recipes = await Recipe.insertMany(formatted);
      }
    }

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// GET /api/recipes/explore
// Handles complex filtering, sorting, and searching
// GET /api/recipes/live-explore
router.get('/live-explore', async (req, res) => {
  try {
    const { search, diet, maxTime, offset = 0 } = req.query;

    // Build the Spoonacular URL dynamically based on user filters
    let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&number=12&offset=${offset}&addRecipeInformation=true`;

    if (search) apiUrl += `&query=${search}`;
    if (diet && diet !== 'All') apiUrl += `&diet=${diet}`;
    if (maxTime) apiUrl += `&maxReadyTime=${maxTime}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Send the live massive catalog data directly back to React
    res.status(200).json(data.results);
  } catch (error) {
    console.error('Live fetch error:', error);
    res.status(500).json({ message: 'Error fetching live catalog' });
  }
});

export default router;