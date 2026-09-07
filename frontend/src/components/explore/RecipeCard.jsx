import { Clock, Flame, MapPin } from "lucide-react";

export default function RecipeCard({ recipe }) {
  return (
    <div className="flex flex-col group cursor-pointer w-full min-w-[280px] max-w-[320px]">
      {/* Image Container */}
      <div className="w-full aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden mb-4 relative bg-stone-100 shadow-sm border border-stone-200/50">
        <img 
          src={recipe.imageHero} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="px-1">
        <h3 className="text-lg font-bold text-stone-900 mb-2 truncate">{recipe.title}</h3>
        
        <div className="flex items-center gap-4 text-xs text-stone-500 font-semibold">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-stone-400" />
            <span>{recipe.totalTime} mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-stone-400" />
            <span>{recipe.calories || recipe.nutrition?.calories || 0} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
