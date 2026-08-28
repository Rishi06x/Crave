import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/layout/HeroSection';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F5] flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-900">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
      </main>
    </div>
  );
}