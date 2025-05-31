
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SearchInterface } from '../search/SearchInterface';
import { Dashboard } from '../dashboard/Dashboard';
import { MessagingInterface } from '../messaging/MessagingInterface';
import { useAppStore } from '@/lib/store';

export const MainLayout = () => {
  const currentTab = useAppStore((state) => state.currentTab);

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <SearchInterface />;
      case 'messaging':
        return <MessagingInterface />;
      case 'candidates':
        return (
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold text-white mb-4">Candidates</h1>
            <p className="text-slate-400">Candidate management coming soon...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold text-white mb-4">Analytics</h1>
            <p className="text-slate-400">Analytics dashboard coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold text-white mb-4">Settings</h1>
            <p className="text-slate-400">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <SearchInterface />;
    }
  };

  return (
    <div className="h-screen bg-slate-900 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
