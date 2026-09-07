import Navbar from '../components/layout/Navbar';
import SearchBar from '../components/explore/SearchBar';
import CategoryPills from '../components/explore/CategoryPills';
import RecipeSection from '../components/explore/RecipeSection';
import { useState, useEffect } from 'react';

export default function ExplorePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        // Fetch Trending from DB
        const trendingRes = await fetch("http://localhost:5000/api/recipes/trending");
        const trendingData = await trendingRes.json();
        setTrendingRecipes(trendingData);

        // Fetch Featured from live Spoonacular (using live-explore)
        const featuredRes = await fetch("http://localhost:5000/api/recipes/live-explore?diet=vegetarian");
        const featuredData = await featuredRes.json();
        
        // Map Spoonacular data to match our RecipeCard props
        const mappedFeatured = featuredData.map(r => ({
          title: r.title,
          imageHero: r.image,
          totalTime: r.readyInMinutes || 30,
          calories: r.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || Math.floor(Math.random() * 300) + 200 // Mock calories if API doesn't provide
        }));

        setFeaturedRecipes(mappedFeatured);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-900 pb-20">
      <Navbar />
      
      <main className="flex-1 flex flex-col w-full">
        {/* Header Search Area */}
        <SearchBar />
        
        {/* Categories */}
        <CategoryPills />

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-stone-500 font-medium">
              Loading culinary inspiration...
            </div>
          ) : (
            <>
              <RecipeSection 
                title="Featured Recipes" 
                recipes={featuredRecipes} 
              />
              
              <RecipeSection 
                title="Trending Recipes" 
                subtitle="Most popular picks this week"
                recipes={trendingRecipes} 
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
