
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ConversationList } from './ConversationList';
import { MessageThread } from './MessageThread';
import { ComposeModal } from './ComposeModal';
import { MessageTemplates } from './MessageTemplates';
import { CampaignBuilder } from './CampaignBuilder';
import { useMessagingStore } from '@/lib/messagingStore';
import { 
  Search, 
  Filter, 
  Plus, 
  Settings, 
  Archive, 
  Mail,
  MessageCircle,
  Smartphone,
  Calendar,
  BarChart3
} from 'lucide-react';

export const MessagingInterface = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'templates' | 'campaigns' | 'analytics'>('inbox');
  const { 
    selectedConversation, 
    isComposing, 
    setIsComposing, 
    searchQuery, 
    setSearchQuery,
    filter,
    setFilter 
  } = useMessagingStore();

  const tabs = [
    { id: 'inbox', label: 'Inbox', icon: Mail },
    { id: 'templates', label: 'Templates', icon: MessageCircle },
    { id: 'campaigns', label: 'Campaigns', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inbox':
        return (
          <div className="flex h-full">
            {/* Conversation List */}
            <div className="w-80 border-r border-slate-700 flex flex-col">
              {/* Search and Filters */}
              <div className="p-4 border-b border-slate-700">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="pl-10 bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={filter === 'all' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter('all')}
                    className="text-xs"
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === 'unread' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter('unread')}
                    className="text-xs"
                  >
                    Unread
                  </Button>
                  <Button
                    variant={filter === 'archived' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setFilter('archived')}
                    className="text-xs"
                  >
                    Archived
                  </Button>
                </div>
              </div>

              <ConversationList />
            </div>

            {/* Message Thread */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <MessageThread />
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-sm">Choose a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'templates':
        return <MessageTemplates />;
      case 'campaigns':
        return <CampaignBuilder />;
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Analytics Dashboard</h2>
            <p className="text-slate-400">Coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Communications</h1>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsComposing(true)}
              className="bg-primary-500 hover:bg-primary-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Compose
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'secondary' : 'ghost'}
                onClick={() => setActiveTab(tab.id as any)}
                className="text-sm"
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {renderTabContent()}
      </div>

      {/* Compose Modal */}
      {isComposing && <ComposeModal />}

      {/* Floating Action Button for Mobile */}
      <motion.button
        className="fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg md:hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsComposing(true)}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};
