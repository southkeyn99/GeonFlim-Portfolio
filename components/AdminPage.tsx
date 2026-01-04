
import React, { useState, useRef } from 'react';
import { Work, Category, Award } from '../types';
import { ADMIN_PASSWORD } from '../constants';

interface AdminPageProps {
  works: Work[];
  onAdd: (work: Work) => void;
  onUpdate: (work: Work) => void;
  onDelete: (id: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ works, onAdd, onUpdate, onDelete }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState<string | 'new' | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-8 text-center animate-fade-in">
          <h2 className="text-2xl font-cinzel tracking-widest text-[#D4AF37]">ADMIN ACCESS</h2>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="ENTER PASSWORD"
              className="w-full bg-zinc-900 border-b border-zinc-700 py-4 px-2 text-center text-white focus:outline-none focus:border-[#D4AF37] transition-colors font-cinzel tracking-widest"
              autoFocus
            />
          </div>
          <button type="submit" className="w-full py-4 bg-zinc-100 text-black font-cinzel tracking-[0.2em] text-xs hover:bg-[#D4AF37] transition-all">
            AUTHENTICATE
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-8 md:px-16 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-cinzel tracking-widest uppercase">Dashboard</h2>
            <p className="text-zinc-500 text-xs mt-2 uppercase tracking-widest">Manage your filmography works.</p>
          </div>
          <button 
            onClick={() => setIsEditing('new')}
            className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-xs font-cinzel tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            ADD NEW WORK
          </button>
        </div>

        {isEditing && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl bg-zinc-900 p-8 md:p-12 my-auto shadow-2xl border border-zinc-800">
              <WorkForm 
                initialWork={isEditing === 'new' ? null : works.find(w => w.id === isEditing) || null}
                onSave={(work) => {
                  if (isEditing === 'new') onAdd(work);
                  else onUpdate(work);
                  setIsEditing(null);
                }}
                onCancel={() => setIsEditing(null)}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {works.map((work) => (
            <div key={work.id} className="bg-zinc-900/50 p-6 flex flex-col md:flex-row gap-6 items-center justify-between border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="flex items-center gap-6 w-full">
                <img src={work.representativeImage} className="w-24 h-32 object-cover bg-black border border-zinc-800" alt={work.titleEN} />
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-cinzel">{work.category}</span>
                    <span className="text-[10px] text-zinc-500 font-cinzel">{work.year}</span>
                  </div>
                  <h4 className="text-lg font-bold">{work.titleKR}</h4>
                  <p className="text-zinc-500 text-sm font-cinzel italic">{work.titleEN}</p>
                </div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setIsEditing(work.id)}
                  className="flex-1 md:flex-none px-6 py-2 text-xs font-cinzel border border-zinc-700 hover:border-white transition-all uppercase tracking-widest"
                >
                  Edit
                </button>
                <button 
                  onClick={() => { if(confirm('이 작품을 삭제하시겠습니까?')) onDelete(work.id); }}
                  className="flex-1 md:flex-none px-6 py-2 text-xs font-cinzel border border-zinc-700 hover:border-red-500 hover:text-red-500 transition-all uppercase tracking-widest"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {works.length === 0 && (
            <div className="text-center py-20 border border-dashed border-zinc-800 text-zinc-600 font-cinzel tracking-widest">
              YOUR PORTFOLIO IS EMPTY
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WorkForm: React.FC<{ initialWork: Work | null, onSave: (work: Work) => void, onCancel: () => void }> = ({ initialWork, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Work>(initialWork || {
    id: Math.random().toString(36).substr(2, 9),
    category: 'DIRECTING',
    year: '',
    titleKR: '',
    titleEN: '',
    genre: '',
    duration: '',
    role: '',
    synopsis: '',
    representativeImage: '',
    stillCuts: [],
    awards: []
  });

  const [awardInput, setAwardInput] = useState('');
  const repFileRef = useRef<HTMLInputElement>(null);
  const stillFilesRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleRepImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setFormData({ ...formData, representativeImage: base64 });
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }
  };

  const handleStillCutsChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // FIX: Add explicit type assertion to avoid "Argument of type 'unknown' is not assignable to parameter of type 'File'" error
    const files = Array.from(e.target.files || []) as File[];
    if (files.length > 0) {
      try {
        const base64Promises = files.map(file => fileToBase64(file));
        const base64Images = await Promise.all(base64Promises);
        setFormData({ ...formData, stillCuts: [...formData.stillCuts, ...base64Images] });
      } catch (err) {
        console.error("Still cuts upload failed", err);
      }
    }
  };

  const removeStillCut = (index: number) => {
    setFormData({
      ...formData,
      stillCuts: formData.stillCuts.filter((_, i) => i !== index)
    });
  };

  const handleAddAward = () => {
    if (!awardInput) return;
    setFormData({
      ...formData,
      awards: [...formData.awards, { id: Math.random().toString(36).substr(2, 9), title: awardInput }]
    });
    setAwardInput('');
  };

  const handleRemoveAward = (id: string) => {
    setFormData({
      ...formData,
      awards: formData.awards.filter(a => a.id !== id)
    });
  };

  return (
    <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-4 custom-scrollbar">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-zinc-900 z-10 py-2 border-b border-zinc-800">
        <h3 className="text-xl font-cinzel tracking-widest">{initialWork ? 'EDIT WORK' : 'ADD NEW WORK'}</h3>
        <button onClick={onCancel} className="text-zinc-500 hover:text-white font-cinzel text-sm uppercase tracking-widest transition-colors">CLOSE</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
              className="bg-black border border-zinc-800 p-3 text-sm focus:outline-none focus:border-[#D4AF37] appearance-none"
            >
              <option value="DIRECTING">DIRECTING</option>
              <option value="CINEMATOGRAPHY">CINEMATOGRAPHY</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Year</label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="bg-black border border-zinc-800 p-3 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. 2024" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Genre</label>
              <input type="text" value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} className="bg-black border border-zinc-800 p-3 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Drama, SF" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Duration</label>
              <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="bg-black border border-zinc-800 p-3 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. 100 min" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Role</label>
              <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="bg-black border border-zinc-800 p-3 text-sm focus:outline-none focus:border-[#D4AF37]" placeholder="e.g. Director" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Title (Korean)</label>
            <input type="text" value={formData.titleKR} onChange={(e) => setFormData({...formData, titleKR: e.target.value})} className="bg-black border border-zinc-800 p-3 text-sm focus:outline-none focus:border-[#D4AF37]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Title (English)</label>
            <input type="text" value={formData.titleEN} onChange={(e) => setFormData({...formData, titleEN: e.target.value})} className="bg-black border border-zinc-800 p-3 text-sm font-cinzel focus:outline-none focus:border-[#D4AF37]" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Synopsis</label>
            <textarea 
              rows={6}
              value={formData.synopsis}
              onChange={(e) => setFormData({...formData, synopsis: e.target.value})}
              className="bg-black border border-zinc-800 p-3 text-sm focus:outline-none focus:border-[#D4AF37] resize-none leading-relaxed"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Representative Image</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => repFileRef.current?.click()}
                className="px-4 py-2 border border-zinc-700 text-xs font-cinzel tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all uppercase"
              >
                Upload File
              </button>
              <input 
                type="file" 
                ref={repFileRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleRepImageChange} 
              />
              <span className="text-[9px] text-zinc-600 uppercase tracking-tighter italic">OR PASTE URL BELOW</span>
            </div>
            <input 
              type="text" 
              value={formData.representativeImage} 
              onChange={(e) => setFormData({...formData, representativeImage: e.target.value})} 
              className="bg-black border border-zinc-800 p-2 text-xs focus:outline-none focus:border-[#D4AF37]" 
              placeholder="https://..." 
            />
            {formData.representativeImage && (
              <div className="mt-2 aspect-[3/4] w-32 border border-zinc-800 overflow-hidden bg-black">
                <img src={formData.representativeImage} className="w-full h-full object-cover" alt="Preview" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Still Cuts (Multiple)</label>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => stillFilesRef.current?.click()}
                className="px-4 py-2 border border-zinc-700 text-xs font-cinzel tracking-widest hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all uppercase"
              >
                Add Multiple Photos
              </button>
              <input 
                type="file" 
                ref={stillFilesRef} 
                className="hidden" 
                accept="image/*" 
                multiple 
                onChange={handleStillCutsChange} 
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-2">
              {formData.stillCuts.map((cut, idx) => (
                <div key={idx} className="relative aspect-video border border-zinc-800 bg-black group">
                  <img src={cut} className="w-full h-full object-cover" alt={`Still cut ${idx}`} />
                  <button 
                    onClick={() => removeStillCut(idx)}
                    className="absolute top-1 right-1 bg-black/80 text-white w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
            <label className="text-[10px] text-zinc-500 font-cinzel tracking-widest uppercase">Awards & Screenings</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={awardInput} 
                onChange={(e) => setAwardInput(e.target.value)} 
                className="flex-grow bg-black border border-zinc-800 p-3 text-sm focus:outline-none focus:border-[#D4AF37]" 
                placeholder="Item name (e.g. Cannes Film Festival Competition)"
                onKeyPress={(e) => e.key === 'Enter' && handleAddAward()}
              />
              <button onClick={handleAddAward} className="px-6 bg-zinc-800 text-xs font-cinzel hover:bg-zinc-700 transition-colors tracking-widest uppercase">ADD</button>
            </div>
            <ul className="mt-2 space-y-2">
              {formData.awards.map(a => (
                <li key={a.id} className="flex justify-between items-center text-xs bg-zinc-900/50 p-3 border border-zinc-800 hover:border-zinc-600 transition-all">
                  <span className="text-zinc-400 italic tracking-wide">{a.title}</span>
                  <button onClick={() => handleRemoveAward(a.id)} className="text-zinc-600 hover:text-red-500 text-lg transition-colors leading-none">×</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-zinc-800 flex justify-end gap-6 pb-4">
        <button onClick={onCancel} className="px-8 py-3 font-cinzel text-xs tracking-[0.3em] text-zinc-500 hover:text-white transition-colors uppercase">Cancel</button>
        <button 
          onClick={() => onSave(formData)} 
          className="px-16 py-4 bg-[#D4AF37] text-black font-cinzel text-xs font-bold tracking-[0.3em] hover:bg-white transition-all uppercase shadow-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
