import { useState } from "react";

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Desserts", "Snacks", "Vegan", "Healthy", "Quick Meals"];

export default function CategoryPills() {
  const [active, setActive] = useState("All");

  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-2 overflow-x-auto no-scrollbar mb-6">
      <div className="flex items-center gap-3 w-max pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              active === category
                ? "bg-stone-900 text-white shadow-md"
                : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
