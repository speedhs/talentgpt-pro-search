
import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'recruiter' | 'admin' | 'viewer';
  avatar?: string;
}

export interface SearchQuery {
  id: string;
  query: string;
  timestamp: Date;
  saved: boolean;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentTab: string;
  searchQueries: SearchQuery[];
  recentSearches: SearchQuery[];
  setUser: (user: User | null) => void;
  setCurrentTab: (tab: string) => void;
  addSearchQuery: (query: string) => void;
  toggleSaveQuery: (id: string) => void;
  deleteQuery: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  currentTab: 'search',
  searchQueries: [],
  recentSearches: [],
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setCurrentTab: (tab) => set({ currentTab: tab }),
  
  addSearchQuery: (query) => {
    const newQuery: SearchQuery = {
      id: Math.random().toString(36).substr(2, 9),
      query,
      timestamp: new Date(),
      saved: false,
    };
    
    set((state) => ({
      searchQueries: [newQuery, ...state.searchQueries],
      recentSearches: [newQuery, ...state.recentSearches.slice(0, 9)],
    }));
  },
  
  toggleSaveQuery: (id) => {
    set((state) => ({
      searchQueries: state.searchQueries.map((query) =>
        query.id === id ? { ...query, saved: !query.saved } : query
      ),
      recentSearches: state.recentSearches.map((query) =>
        query.id === id ? { ...query, saved: !query.saved } : query
      ),
    }));
  },
  
  deleteQuery: (id) => {
    set((state) => ({
      searchQueries: state.searchQueries.filter((query) => query.id !== id),
      recentSearches: state.recentSearches.filter((query) => query.id !== id),
    }));
  },
}));
