import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true }, // Base amount for 1x servings
  unit: { type: String, required: true }
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true }, // e.g., 'Dinner', 'Dessert'
  tags: [{ type: String, index: true }], // e.g., 'Vegan', 'Keto', 'Gluten-Free'
  
  // Media
  imageHero: { type: String, required: true },
  imageThumb: { type: String },
  
  // Metrics
  prepTime: { type: Number, required: true }, // in minutes
  cookTime: { type: Number, required: true },
  totalTime: { type: Number, required: true },
  baseServings: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  
  // Engagement
  rating: {
    score: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 }
  },
  viewCount: { type: Number, default: 0 },
  saveCount: { type: Number, default: 0 },
  
  // Content
  ingredients: [ingredientSchema],
  instructions: [{ type: String, required: true }],
  chefNotes: { type: String },
  
  // Nutrition (Per Base Serving)
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  }
}, { timestamps: true });

export default mongoose.model('Recipe', recipeSchema);