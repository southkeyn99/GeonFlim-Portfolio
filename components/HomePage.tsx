
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1492691523567-30730045814e?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinema Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-cinzel font-bold mb-6 tracking-tight animate-fade-in">
          CINÉASTE
        </h1>
        <p className="text-zinc-400 text-sm md:text-lg tracking-[0.3em] font-cinzel uppercase mb-12 animate-slide-up">
          Capturing Silence Through Motion
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/directing" className="px-10 py-4 border border-zinc-700 text-zinc-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 font-cinzel tracking-widest text-xs">
            VIEW DIRECTING
          </Link>
          <Link to="/cinematography" className="px-10 py-4 bg-white text-black hover:bg-[#D4AF37] transition-all duration-500 font-cinzel tracking-widest text-xs">
            VIEW CINEMATOGRAPHY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
