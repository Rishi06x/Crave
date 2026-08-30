import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

// GET /api/recipes/trending
// Fetches recipes marked as trending for your Hero carousel
router.get('/trending', async (req, res) => {
  try {
    // Find recipes where isTrending is true, limit to 6 for performance
    const trendingRecipes = await Recipe.find({ isTrending: true }).limit(6);
    
    res.status(200).json(trendingRecipes);
  } catch (error) {
    console.error('Error fetching trending recipes:', error);
    res.status(500).json({ message: 'Server error while fetching recipes.' });
  }
});

export default router;