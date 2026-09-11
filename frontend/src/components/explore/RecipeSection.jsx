import RecipeCard from "./RecipeCard";

export default function RecipeSection({ title, recipes, subtitle, onLoadMore, isLoadingMore, layout = "carousel" }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-stone-500 mt-1 font-medium">{subtitle}</p>}
        </div>
      </div>

      {/* Container */}
      <div className={
        layout === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "flex items-stretch gap-6 overflow-x-auto no-scrollbar pb-4 -mx-8 px-8 snap-x"
      }>
        {recipes.map((recipe, index) => (
          <div key={index} className={layout === "grid" ? "flex items-stretch justify-center" : "snap-start shrink-0 flex items-stretch"}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
        {/* Load More Button */}
        {onLoadMore && (
          <div className="snap-start shrink-0 flex items-center justify-center px-4 col-span-full">
            <button 
              onClick={onLoadMore}
              className="px-6 py-3 bg-white text-stone-700 font-semibold rounded-full shadow-sm border border-stone-200 hover:shadow-md hover:border-orange-300 hover:text-orange-600 transition-all flex items-center gap-2"
            >
              {isLoadingMore ? (
                <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
