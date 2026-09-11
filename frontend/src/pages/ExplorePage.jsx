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

  // New state for live search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeFilters, setActiveFilters] = useState({ diet: '', maxTime: '', maxCalories: '' });
  const [liveRecipes, setLiveRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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

  // Debounced effect for live searching
  useEffect(() => {
    const hasSearch = searchQuery.trim().length > 0;
    const hasCategory = selectedCategory !== 'All';
    const hasFilters = activeFilters.diet || activeFilters.maxTime || activeFilters.maxCalories;

    // If user clears search, goes back to 'All', and clears filters, reset to default view
    if (!hasSearch && !hasCategory && !hasFilters) {
      setIsSearching(false);
      setLiveRecipes([]);
      return;
    }

    setIsSearching(true);
    
    // The Debounce: Wait 500ms after the last typing event before fetching
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true); // Show some loading state while fetching new data
        const url = new URL("http://localhost:5000/api/recipes/live-explore");
        if (hasSearch) url.searchParams.append("search", searchQuery);
        if (hasCategory) url.searchParams.append("type", selectedCategory);
        if (activeFilters.diet) url.searchParams.append("diet", activeFilters.diet);
        if (activeFilters.maxTime) url.searchParams.append("maxTime", activeFilters.maxTime);
        if (activeFilters.maxCalories) url.searchParams.append("maxCalories", activeFilters.maxCalories);
        
        const res = await fetch(url);
        const data = await res.json();
        
        // Spoonacular live explore doesn't return all our mocked fields natively in root, so we map it here
        const formattedData = data.map(r => {
          const cals = r.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount;
          return {
            title: r.title,
            imageHero: r.image || 'https://images.unsplash.com/photo-1585937421612-70a008356fbe',
            viewCount: Math.floor(Math.random() * 500) + 100, // mock count
            totalTime: r.readyInMinutes || 30, // mock if missing
            category: selectedCategory !== 'All' ? selectedCategory : 'Recipe',
            calories: cals ? Math.round(cals) : (Math.floor(Math.random() * 300) + 200) // Fallback to mock if API omits it to avoid 0
          };
        });

        setLiveRecipes(formattedData);
      } catch (error) {
        console.error("Live explore error:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms delay

    // Cleanup: If the user types again before 500ms, this clears the old timer!
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory, activeFilters]);

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
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />
        
        {/* Categories */}
        <CategoryPills activeCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {loading && !isSearching ? (
            <div className="flex items-center justify-center py-20 text-stone-500 font-medium">
              Loading culinary inspiration...
            </div>
          ) : isSearching ? (
            <RecipeSection 
              title={loading ? "Searching..." : `Results for ${searchQuery ? '"'+searchQuery+'"' : selectedCategory}`} 
              subtitle={!loading && liveRecipes.length === 0 ? "No recipes found. Try another term." : ""}
              recipes={liveRecipes}
              layout="grid"
            />
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
