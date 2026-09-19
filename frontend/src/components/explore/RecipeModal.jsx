import { useState, useEffect } from "react";
import { X, Clock, Flame, Users, Heart, Share2, Play, CheckCircle2, Star } from "lucide-react";

export default function RecipeModal({ recipeId, onClose }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(2);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    async function fetchDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:5000/api/recipes/${recipeId}/details`);
        if (!res.ok) throw new Error("Failed to fetch recipe details");
        const data = await res.json();
        setRecipeDetails(data);
        setServings(data.servings || data.baseServings || 2);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (recipeId) fetchDetails();
  }, [recipeId]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6" onClick={onClose}>
      <div 
        className="bg-white rounded-[1.5rem] w-full max-w-[1000px] max-h-[95vh] overflow-y-auto shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-stone-500 font-medium">Loading recipe details...</p>
          </div>
        ) : error || !recipeDetails ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8">
            <h3 className="text-xl font-bold text-red-500 mb-2">Oops!</h3>
            <p className="text-stone-600 mb-6">{error || "Recipe not found"}</p>
            <button onClick={onClose} className="px-6 py-2 bg-stone-200 rounded-full font-medium text-stone-800 hover:bg-stone-300">Close</button>
          </div>
        ) : (
          <div className="p-8 sm:p-10">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row gap-10 mb-12">
              {/* Left content */}
              <div className="flex-1 flex flex-col justify-start">
                <div className="text-[13px] text-stone-400 font-medium mb-6 flex items-center gap-2">
                  <span className="hover:text-stone-600 cursor-pointer">Home</span>
                  <span>/</span>
                  <span className="hover:text-stone-600 cursor-pointer">Recipes</span>
                  <span>/</span>
                  <span className="text-stone-600 truncate max-w-[200px]">{recipeDetails.title}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight mb-3">
                  {recipeDetails.title}
                </h2>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-orange-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-sm font-bold text-stone-800">4.8</span>
                  <span className="text-sm text-stone-500">(120 Reviews)</span>
                </div>

                <p className="text-stone-500 text-[15px] mb-8 leading-relaxed line-clamp-3 pr-4">
                  {recipeDetails.summary ? recipeDetails.summary.replace(/<[^>]*>?/gm, '') : 'A delicious recipe perfect for any occasion.'}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Clock className="w-5 h-5 text-stone-600 mb-1.5" />
                    <span className="font-bold text-stone-900">{recipeDetails.readyInMinutes || 30} mins</span>
                    <span className="text-[11px] text-stone-400 font-medium mt-0.5">Total Time</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <Flame className="w-5 h-5 text-stone-600 mb-1.5" />
                    <span className="font-bold text-stone-900">Easy</span>
                    <span className="text-[11px] text-stone-400 font-medium mt-0.5">Difficulty</span>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <Users className="w-5 h-5 text-stone-600 mb-1.5" />
                    <span className="font-bold text-stone-900">{servings}</span>
                    <span className="text-[11px] text-stone-400 font-medium mt-0.5">Servings</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 mt-auto">
                  <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm">
                    <Heart className="w-4 h-4" />
                    <span>Save Recipe</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-stone-600 hover:text-stone-900 text-sm font-semibold transition-all">
                    <Share2 className="w-4 h-4" />
                    <span>Share Recipe</span>
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:w-[400px] xl:w-[450px] shrink-0">
                <div className="aspect-square w-full rounded-2xl overflow-hidden bg-stone-100">
                  <img 
                    src={recipeDetails.image || recipeDetails.imageHero} 
                    alt={recipeDetails.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <hr className="border-stone-100 mb-10" />

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Ingredients */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900">Ingredients</h3>
                  <div className="flex items-center gap-3">
                    <label htmlFor="servings" className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Servings</label>
                    <input 
                      type="range" 
                      id="servings" 
                      min="1" 
                      max="12" 
                      value={servings}
                      onChange={(e) => setServings(parseInt(e.target.value))}
                      className="w-20 accent-orange-500 cursor-pointer"
                    />
                    <span className="font-bold text-orange-600 text-sm w-4">{servings}</span>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {(recipeDetails.extendedIngredients || []).map((ingredient, idx) => {
                    const baseServings = recipeDetails.servings || recipeDetails.baseServings || 2;
                    const scaleFactor = servings / baseServings;
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="text-stone-600 text-[15px]">
                          <strong className="font-semibold text-stone-800">
                            {ingredient.amount ? (ingredient.amount * scaleFactor).toFixed(1).replace(/\.0$/, '') : ''} {ingredient.unit}
                          </strong>{' '}
                          {ingredient.nameClean || ingredient.name}
                        </span>
                      </li>
                    );
                  })}
                  {(!recipeDetails.extendedIngredients || recipeDetails.extendedIngredients.length === 0) && (
                    <li className="text-stone-500 italic">No ingredients found.</li>
                  )}
                </ul>
              </div>

              {/* Nutrition */}
              <div className="lg:w-[350px] shrink-0">
                <h3 className="text-xl font-bold text-stone-900 mb-2">Nutrition Info</h3>
                <p className="text-xs text-stone-500 mb-5">Per Serving</p>
                
                <div className="bg-white border border-stone-100 shadow-sm rounded-xl p-5 space-y-4">
                  {[
                    { name: 'Calories', label: 'Calories', unit: 'kcal' },
                    { name: 'Protein', label: 'Protein', unit: 'g' },
                    { name: 'Carbohydrates', label: 'Carbs', unit: 'g' },
                    { name: 'Fat', label: 'Fat', unit: 'g' },
                  ].map((nut) => {
                    const nutritionData = recipeDetails.nutrition?.nutrients || [];
                    const nutrient = nutritionData.find(n => n.name === nut.name);
                    const amount = nutrient ? Math.round(nutrient.amount) : 0;
                    return (
                      <div key={nut.name} className="flex items-center justify-between pb-3 border-b border-stone-100 last:border-0 last:pb-0">
                        <span className="text-stone-500 text-[15px]">{nut.label}</span>
                        <span className="font-semibold text-stone-800 text-[15px]">{amount} {nut.unit}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Start Cooking Button */}
            <div className="mt-12 flex justify-start">
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-md">
                <Play className="w-5 h-5 fill-current" />
                <span>Start Cooking</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
