import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function SearchBar({ value, onChange, activeFilters = {}, onFilterChange }) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterUpdate = (key, val) => {
    onFilterChange(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-7xl mx-auto px-8 pt-28 pb-4 z-20">
      <div className="flex items-center gap-4 w-full">
        {/* Search Input */}
        <div className="flex-1 relative flex items-center bg-white rounded-full p-2 shadow-sm border border-stone-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300">
          <Search className="text-stone-400 ml-3.5 w-5 h-5 flex-shrink-0" />
          <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search recipes, ingredients, or cuisines..." 
            className="w-full bg-transparent border-none outline-none text-stone-800 px-3.5 py-1.5 placeholder-stone-400 font-medium text-sm md:text-base"
          />
        </div>

        {/* Filter Button */}
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center p-3.5 rounded-full transition-colors shadow-md flex-shrink-0 ${showFilters ? 'bg-orange-500 text-white' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
        >
          {showFilters ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
        </button>
      </div>

      {/* Filter Modal Dropdown */}
      {showFilters && (
        <div className="absolute top-full mt-4 right-8 w-80 bg-white rounded-2xl shadow-xl border border-stone-100 p-6 flex flex-col gap-6 z-50">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Dietary Preference</label>
            <select 
              value={activeFilters.diet || ''}
              onChange={(e) => handleFilterUpdate('diet', e.target.value)}
              className="w-full p-2.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-800 text-sm focus:outline-none focus:border-orange-400"
            >
              <option value="">Any</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten free">Gluten Free</option>
              <option value="ketogenic">Keto</option>
              <option value="paleo">Paleo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Max Prep Time ({activeFilters.maxTime || 'Any'} mins)
            </label>
            <input 
              type="range" 
              min="10" 
              max="120" 
              step="10"
              value={activeFilters.maxTime || 120}
              onChange={(e) => handleFilterUpdate('maxTime', e.target.value)}
              className="w-full accent-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">
              Max Calories ({activeFilters.maxCalories || 'Any'})
            </label>
            <input 
              type="range" 
              min="100" 
              max="1500" 
              step="100"
              value={activeFilters.maxCalories || 1500}
              onChange={(e) => handleFilterUpdate('maxCalories', e.target.value)}
              className="w-full accent-orange-500"
            />
          </div>

          <div className="flex justify-between items-center mt-2 pt-4 border-t border-stone-100">
             <button 
                onClick={() => onFilterChange({ diet: '', maxTime: '', maxCalories: '' })}
                className="text-sm font-medium text-stone-500 hover:text-stone-800"
             >
                Clear All
             </button>
             <button 
                onClick={() => setShowFilters(false)}
                className="px-5 py-2 bg-stone-900 text-white text-sm font-semibold rounded-lg shadow hover:bg-stone-800"
             >
                Apply
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
