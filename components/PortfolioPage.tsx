
import React from 'react';
import { Work, Category } from '../types';

interface PortfolioPageProps {
  works: Work[];
  category: Category;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ works, category }) => {
  return (
    <div className="pt-32 pb-20 px-8 md:px-24 max-w-[1600px] mx-auto">
      <header className="mb-24 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-cinzel font-bold tracking-widest text-zinc-100 opacity-90">
          {category}
        </h2>
        <div className="h-px w-24 bg-[#D4AF37] mt-6" />
      </header>

      <div className="space-y-48">
        {works.length === 0 ? (
          <div className="text-zinc-600 font-cinzel text-center py-20">No works found.</div>
        ) : (
          works.map((work) => <WorkDetail key={work.id} work={work} />)
        )}
      </div>
    </div>
  );
};

const WorkDetail: React.FC<{ work: Work }> = ({ work }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      {/* Left Area: Visuals */}
      <div className="space-y-8 animate-fade-in">
        <div className="relative group overflow-hidden bg-zinc-900 aspect-[3/4] md:aspect-video lg:aspect-[3/4]">
          <img 
            src={work.representativeImage} 
            alt={work.titleEN} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        
        {/* Still Cuts */}
        {work.stillCuts.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {work.stillCuts.map((cut, idx) => (
              <div key={idx} className="aspect-video bg-zinc-900 overflow-hidden">
                <img src={cut} alt="Still cut" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Area: Information */}
      <div className="flex flex-col animate-slide-up">
        <div className="mb-2">
          <span className="text-[#D4AF37] font-cinzel text-sm tracking-widest">{work.year}</span>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-bold mb-4 flex flex-col gap-2">
          <span className="block">{work.titleKR}</span>
          <span className="block font-cinzel text-2xl text-zinc-500 font-normal tracking-wide italic">{work.titleEN}</span>
        </h3>

        <div className="grid grid-cols-2 gap-y-4 gap-x-8 my-8 text-xs font-cinzel tracking-widest text-zinc-400 border-y border-zinc-800 py-6 uppercase">
          <div>
            <p className="text-zinc-600 mb-1">Genre</p>
            <p className="text-zinc-200">{work.genre}</p>
          </div>
          <div>
            <p className="text-zinc-600 mb-1">Running Time</p>
            <p className="text-zinc-200">{work.duration}</p>
          </div>
          <div>
            <p className="text-zinc-600 mb-1">Role</p>
            <p className="text-zinc-200">{work.role}</p>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-zinc-600 text-xs font-cinzel tracking-widest uppercase mb-4">Synopsis</h4>
          <p className="text-zinc-300 leading-relaxed font-light text-sm md:text-base whitespace-pre-wrap">
            {work.synopsis}
          </p>
        </div>

        {work.awards.length > 0 && (
          <div>
            <h4 className="text-zinc-600 text-xs font-cinzel tracking-widest uppercase mb-4">Awards & Screenings</h4>
            <ul className="space-y-3">
              {work.awards.map((award) => (
                <li key={award.id} className="flex items-start gap-3">
                  <span className="text-[#D4AF37] text-lg mt-[-2px]">•</span>
                  <span className="text-zinc-400 text-sm italic">{award.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
