
export type Category = 'DIRECTING' | 'CINEMATOGRAPHY';

export interface Award {
  id: string;
  title: string;
}

export interface Work {
  id: string;
  category: Category;
  year: string;
  titleKR: string;
  titleEN: string;
  genre: string;
  duration: string;
  role: string;
  synopsis: string;
  representativeImage: string;
  stillCuts: string[];
  awards: Award[];
}

export interface AppState {
  works: Work[];
  isAdmin: boolean;
}
