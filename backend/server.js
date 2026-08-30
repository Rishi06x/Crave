import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware
app.use(cors()); // Allows your React frontend to communicate with this backend
app.use(express.json()); // Allows the server to accept JSON data in request bodies

// Mount the API routes
app.use('/api/recipes', recipeRoutes);

// Basic Health Check Route
app.get('/', (req, res) => {
  res.json({ message: 'CRAVE API is running successfully.' });
});

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });