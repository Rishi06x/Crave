import RecipeCard from "./RecipeCard";

export default function RecipeSection({ title, recipes, subtitle }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-stone-500 mt-1 font-medium">{subtitle}</p>}
        </div>
        <button className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm">
          View All
        </button>
      </div>

      {/* Grid/Scrollable List */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-8 px-8 snap-x">
        {recipes.map((recipe, index) => (
          <div key={index} className="snap-start shrink-0">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </section>
  );
}
