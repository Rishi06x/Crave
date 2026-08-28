import { motion } from "framer-motion";
import { Search } from "lucide-react";

const carouselImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
];

const infiniteImages = [...carouselImages, ...carouselImages, ...carouselImages];

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col justify-between items-center text-center px-6 pt-24 pb-8 overflow-hidden bg-[#FAF8F5]">
      
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-orange-400/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Top Header & Search Area */}
      <div className="flex flex-col items-center w-full max-w-4xl z-20">
       

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-stone-900 mb-3 leading-[1.08]">
          Cook effortlessly.<br />
          <span className="text-orange-500">Scale automatically.</span>
        </h1>
        
        <p className="text-stone-600 text-sm md:text-base max-w-lg font-medium mb-7">
          Adjust serving sizes on the fly, find recipes with ingredients in your fridge, and cook with voice guidance.
        </p>

        {/* Floating Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full max-w-xl mx-auto"
        >
          <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl shadow-orange-950/5 border border-stone-200 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all duration-300">
            <Search className="text-stone-400 ml-3.5 w-5 h-5 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Search recipes, ingredients, or cuisines..." 
              className="w-full bg-transparent border-none outline-none text-stone-800 px-3.5 py-2.5 placeholder-stone-400 font-medium text-sm md:text-base"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-2.5 rounded-full font-bold transition-all shadow-md shadow-orange-500/25 flex-shrink-0 text-sm">
              Search
            </button>
          </div>
        </motion.div>
      </div>

      {/* Middle Carousel with Curved Inset Masks */}
      <div className="w-full max-w-[1400px] relative my-auto flex items-center justify-center">
        {/* Top Curve Mask (Dips down in center) */}
        <div className="absolute top-0 left-0 right-0 h-14 z-10 pointer-events-none -mt-1">
          <svg viewBox="0 0 1440 100" className="w-full h-full text-[#FAF8F5] fill-current" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 C960,100 480,100 0,0 Z" />
          </svg>
        </div>

        {/* Carousel Reel */}
        <div className="flex gap-6 overflow-hidden w-full py-2">
          <motion.div 
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {infiniteImages.map((src, index) => (
              <div 
                key={index} 
                className="min-w-[200px] md:min-w-[240px] h-[210px] overflow-hidden bg-stone-100 shadow-lg shadow-stone-900/5 rounded-2xl border border-stone-200/60"
              >
                <img src={src} alt="Recipe" className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>        
        </div>

        {/* Bottom Curve Mask (Pushes up in center) */}
        <div className="absolute bottom-0 left-0 right-0 h-14 z-10 pointer-events-none -mb-1">
          <svg viewBox="0 0 1440 100" className="w-full h-full text-[#FAF8F5] fill-current" preserveAspectRatio="none">
            <path d="M0,100 L1440,100 C960,0 480,0 0,100 Z" />
          </svg>
        </div>
      </div>

      {/* Bottom CTA Area */}
      <div className="relative pb-2 z-20 flex flex-col items-center">
        <div className="rounded-full border border-orange-500/30 p-1.5 bg-white/40 backdrop-blur-sm shadow-sm">
          <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-9 py-3 rounded-full transition-all shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]">
            Explore All Recipes
          </button>
        </div>
      </div>
      
    </section>
  );
}