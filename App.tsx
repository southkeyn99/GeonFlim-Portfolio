
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Work, Category } from './types';
import { INITIAL_WORKS } from './constants';
import PortfolioPage from './components/PortfolioPage';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';

const App: React.FC = () => {
  const [works, setWorks] = useState<Work[]>(() => {
    const saved = localStorage.getItem('cineaste_works');
    return saved ? JSON.parse(saved) : INITIAL_WORKS;
  });

  useEffect(() => {
    localStorage.setItem('cineaste_works', JSON.stringify(works));
  }, [works]);

  const addWork = (work: Work) => setWorks([...works, work]);
  const updateWork = (updatedWork: Work) => {
    setWorks(works.map(w => w.id === updatedWork.id ? updatedWork : w));
  };
  const deleteWork = (id: string) => setWorks(works.filter(w => w.id !== id));

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white selection:bg-[#D4AF37] selection:text-black">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/directing" element={<PortfolioPage works={works.filter(w => w.category === 'DIRECTING')} category="DIRECTING" />} />
            <Route path="/cinematography" element={<PortfolioPage works={works.filter(w => w.category === 'CINEMATOGRAPHY')} category="CINEMATOGRAPHY" />} />
            <Route path="/admin" element={<AdminPage works={works} onAdd={addWork} onUpdate={updateWork} onDelete={deleteWork} />} />
          </Routes>
        </main>
        <footer className="p-12 text-center text-zinc-600 text-xs font-cinzel tracking-widest uppercase">
          © {new Date().getFullYear()} CINÉASTE PORTFOLIO. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </Router>
  );
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-10 bg-gradient-to-b from-black to-transparent">
      <Link to="/" className="text-2xl font-bold font-cinzel tracking-tighter hover:text-[#D4AF37] transition-colors">
        CINÉASTE
      </Link>
      <div className="flex gap-8 text-xs font-cinzel tracking-[0.2em] uppercase">
        <Link to="/directing" className={`${isActive('/directing') ? 'text-[#D4AF37]' : 'text-zinc-400'} hover:text-white transition-colors`}>
          Directing
        </Link>
        <Link to="/cinematography" className={`${isActive('/cinematography') ? 'text-[#D4AF37]' : 'text-zinc-400'} hover:text-white transition-colors`}>
          Cinematography
        </Link>
        <Link to="/admin" className={`${isActive('/admin') ? 'text-[#D4AF37]' : 'text-zinc-400'} hover:text-white transition-colors`}>
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default App;
