import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  time: { 
    type: Number, 
    required: true 
  },
  servings: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  isTrending: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt dates
});

// Create and export the model
export default mongoose.model('Recipe', recipeSchema);