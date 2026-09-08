import { Clock, Flame, MapPin } from "lucide-react";

export default function RecipeCard({ recipe }) {
  return (
    <div className="flex flex-col group cursor-pointer w-full min-w-[200px] max-w-[240px] h-full bg-white p-3 rounded-[1.25rem] shadow-sm border border-stone-100 hover:shadow-md transition-all">
      {/* Image Container */}
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 relative bg-stone-50">
        <img 
          src={recipe.imageHero || recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="px-1 flex flex-col flex-1">
        <h3 className="text-[15px] font-bold text-stone-800 mb-2 line-clamp-2 leading-tight">{recipe.title}</h3>
        
        <div className="mt-auto pt-1 flex items-center justify-between text-[11px] text-stone-500 font-semibold">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>{recipe.totalTime || recipe.readyInMinutes || 30}m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{recipe.calories || recipe.nutrition?.calories || recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0} cal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
