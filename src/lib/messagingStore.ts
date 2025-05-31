
import { create } from 'zustand';
import { Message, Conversation, MessageTemplate, Campaign } from '@/types/messaging';

interface MessagingState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  templates: MessageTemplate[];
  campaigns: Campaign[];
  selectedConversation: string | null;
  isComposing: boolean;
  searchQuery: string;
  filter: 'all' | 'unread' | 'archived';
  
  // Actions
  setSelectedConversation: (id: string | null) => void;
  setIsComposing: (composing: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (filter: 'all' | 'unread' | 'archived') => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  markAsRead: (conversationId: string) => void;
  addTag: (conversationId: string, tag: string) => void;
  removeTag: (conversationId: string, tag: string) => void;
  updateConversationStatus: (conversationId: string, status: Conversation['status']) => void;
}

export const useMessagingStore = create<MessagingState>((set, get) => ({
  conversations: [],
  messages: {},
  templates: [],
  campaigns: [],
  selectedConversation: null,
  isComposing: false,
  searchQuery: '',
  filter: 'all',
  
  setSelectedConversation: (id) => set({ selectedConversation: id }),
  setIsComposing: (composing) => set({ isComposing: composing }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (filter) => set({ filter }),
  
  sendMessage: (messageData) => {
    const message: Message = {
      ...messageData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    
    set((state) => ({
      messages: {
        ...state.messages,
        [message.conversationId]: [
          ...(state.messages[message.conversationId] || []),
          message
        ]
      },
      conversations: state.conversations.map(conv =>
        conv.id === message.conversationId
          ? { ...conv, lastMessage: message, updatedAt: new Date() }
          : conv
      )
    }));
  },
  
  markAsRead: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    }));
  },
  
  addTag: (conversationId, tag) => {
    set((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, tags: [...conv.tags, tag] }
          : conv
      )
    }));
  },
  
  removeTag: (conversationId, tag) => {
    set((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, tags: conv.tags.filter(t => t !== tag) }
          : conv
      )
    }));
  },
  
  updateConversationStatus: (conversationId, status) => {
    set((state) => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, status }
          : conv
      )
    }));
  },
}));
