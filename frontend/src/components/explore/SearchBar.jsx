import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-4 w-full max-w-7xl mx-auto px-8 pt-28 pb-4">
      {/* Search Input */}
      <div className="flex-1 relative flex items-center bg-white rounded-full p-2 shadow-sm border border-stone-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300">
        <Search className="text-stone-400 ml-3.5 w-5 h-5 flex-shrink-0" />
        <input 
          type="text" 
          placeholder="Search recipes, ingredients, or cuisines..." 
          className="w-full bg-transparent border-none outline-none text-stone-800 px-3.5 py-1.5 placeholder-stone-400 font-medium text-sm md:text-base"
        />
      </div>

      {/* Filter Button */}
      <button className="flex items-center justify-center p-3.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-md flex-shrink-0">
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
}
