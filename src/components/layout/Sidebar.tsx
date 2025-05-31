
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/lib/store';
import { 
  Search, 
  Layout, 
  Users, 
  BarChart3, 
  Settings,
  Bookmark,
  Clock
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Layout },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'candidates', label: 'Candidates', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const { currentTab, setCurrentTab, recentSearches } = useAppStore();

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">TalentGPT Pro</h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          
          return (
            <motion.div
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  isActive 
                    ? 'bg-primary-500 text-white hover:bg-primary-600' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                onClick={() => setCurrentTab(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            </motion.div>
          );
        })}
      </nav>

      {recentSearches.length > 0 && (
        <>
          <Separator className="mx-4 bg-slate-700" />
          <div className="p-4">
            <div className="flex items-center mb-3">
              <Clock className="w-4 h-4 mr-2 text-slate-400" />
              <span className="text-sm font-medium text-slate-400">Recent Searches</span>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {recentSearches.slice(0, 3).map((search) => (
                <motion.div
                  key={search.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between text-xs text-slate-500 hover:text-slate-300 cursor-pointer p-2 rounded hover:bg-slate-800"
                >
                  <span className="truncate flex-1">{search.query}</span>
                  {search.saved && <Bookmark className="w-3 h-3 ml-2 fill-current" />}
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
