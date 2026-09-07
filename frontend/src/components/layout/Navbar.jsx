import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full absolute top-0 z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto left-0 right-0">
      {/* Brand Logo */}
      <div className="text-2xl font-black text-stone-900 tracking-tight flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>
        <Link to="/">CRAVE<span className="text-orange-500">.</span></Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600">
        <Link to="/explore" className="text-orange-600 font-bold transition-colors">Explore</Link>
        <Link to="#" className="hover:text-orange-600 transition-colors">Smart Pantry</Link>
        <Link to="#" className="hover:text-orange-600 transition-colors">Cook Mode</Link>
        <Link to="#" className="hover:text-orange-600 transition-colors">Community</Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 text-sm font-semibold">
        <button className="text-stone-700 hover:text-orange-600 transition-colors px-3 py-2">
          Log in
        </button>
        <button className="bg-stone-900 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-sm hover:shadow-orange-500/20">
          Get Started
        </button>
      </div>
    </nav>
  );
}