import Navbar from '../components/layout/Navbar';
import SearchBar from '../components/explore/SearchBar';
import CategoryPills from '../components/explore/CategoryPills';
import RecipeSection from '../components/explore/RecipeSection';
import { useState, useEffect } from 'react';

export default function ExplorePage() {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [quickRecipes, setQuickRecipes] = useState([]);
  
  const [featuredPage, setFeaturedPage] = useState(1);
  const [trendingPage, setTrendingPage] = useState(1);
  const [quickPage, setQuickPage] = useState(1);
  
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      try {
        setLoading(true);
        // Fetch Trending
        const trendingRes = await fetch("http://localhost:5000/api/recipes/trending?page=1&limit=6");
        const trendingData = await trendingRes.json();
        setTrendingRecipes(trendingData);

        // Fetch Featured 
        const featuredRes = await fetch("http://localhost:5000/api/recipes/featured?page=1&limit=6");
        const featuredData = await featuredRes.json();
        setFeaturedRecipes(featuredData);
        
        // Fetch Quick
        const quickRes = await fetch("http://localhost:5000/api/recipes/quick?page=1&limit=6");
        const quickData = await quickRes.json();
        setQuickRecipes(quickData);

      } catch (error) {
        console.error("Error fetching initial recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialRecipes();
  }, []);

  const handleLoadMore = async (category) => {
    try {
      setLoadingMore(true);
      if (category === 'trending') {
        const nextPage = trendingPage + 1;
        const res = await fetch(`http://localhost:5000/api/recipes/trending?page=${nextPage}&limit=6`);
        const newData = await res.json();
        setTrendingRecipes(prev => [...prev, ...newData]);
        setTrendingPage(nextPage);
      } else if (category === 'featured') {
        const nextPage = featuredPage + 1;
        const res = await fetch(`http://localhost:5000/api/recipes/featured?page=${nextPage}&limit=6`);
        const newData = await res.json();
        setFeaturedRecipes(prev => [...prev, ...newData]);
        setFeaturedPage(nextPage);
      } else if (category === 'quick') {
        const nextPage = quickPage + 1;
        const res = await fetch(`http://localhost:5000/api/recipes/quick?page=${nextPage}&limit=6`);
        const newData = await res.json();
        setQuickRecipes(prev => [...prev, ...newData]);
        setQuickPage(nextPage);
      }
    } catch (error) {
      console.error(`Error loading more ${category}:`, error);
    } finally {
      setLoadingMore(false);
    }
  };

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
                onLoadMore={() => handleLoadMore('featured')}
                isLoadingMore={loadingMore} 
              />
              
              <RecipeSection 
                title="Trending Recipes" 
                subtitle="Most popular picks this week"
                recipes={trendingRecipes}
                onLoadMore={() => handleLoadMore('trending')}
                isLoadingMore={loadingMore} 
              />
              
              <RecipeSection 
                title="Quick Recipes" 
                subtitle="Ready in 20 mins or less"
                recipes={quickRecipes}
                onLoadMore={() => handleLoadMore('quick')}
                isLoadingMore={loadingMore} 
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
