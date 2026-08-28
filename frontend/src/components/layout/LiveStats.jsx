import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LiveStats() {
  // This state will eventually be populated by: const response = await axios.get('/api/stats/live')
  const [stats, setStats] = useState({
    totalRecipes: 0,
    cuisines: 0,
    users: 0,
    avgRating: 0.0
  });

  // Simulated API fetch for now
  useEffect(() => {
    setTimeout(() => {
      setStats({ totalRecipes: 1402, cuisines: 24, users: 8900, avgRating: 4.8 });
    }, 1000);
  }, []);

  const statItems = [
    { label: 'Total Recipes', value: stats.totalRecipes },
    { label: 'Global Cuisines', value: stats.cuisines },
    { label: 'Active Cooks', value: stats.users },
    { label: 'Avg Rating', value: stats.avgRating }
  ];

  return (
    <div className="border-t border-white/10 bg-black/20 backdrop-blur-lg mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statItems.map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-2"
            >
              <span className="text-4xl md:text-5xl font-black text-white tabular-nums">
                {stat.value === 0 ? '-' : stat.value}
              </span>
              <span className="text-sm font-medium tracking-widest text-emerald-500 uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}