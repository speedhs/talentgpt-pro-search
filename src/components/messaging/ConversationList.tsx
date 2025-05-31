
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { useMessagingStore } from '@/lib/messagingStore';
import { Conversation } from '@/types/messaging';
import { 
  Mail, 
  MessageCircle, 
  Smartphone, 
  Clock,
  CheckCheck,
  Check
} from 'lucide-react';

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    candidateId: 'c1',
    candidateName: 'Sarah Chen',
    candidateAvatar: '/placeholder.svg',
    lastMessage: {
      id: 'm1',
      conversationId: '1',
      senderId: 'c1',
      senderName: 'Sarah Chen',
      recipientId: 'recruiter1',
      recipientName: 'John Recruiter',
      content: 'Thank you for reaching out! I\'m definitely interested in learning more about this opportunity.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'read',
      channel: 'email'
    },
    unreadCount: 0,
    status: 'in_progress',
    tags: ['frontend', 'urgent'],
    notes: [],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    candidateId: 'c2',
    candidateName: 'Marcus Johnson',
    candidateAvatar: '/placeholder.svg',
    lastMessage: {
      id: 'm2',
      conversationId: '2',
      senderId: 'recruiter1',
      senderName: 'John Recruiter',
      recipientId: 'c2',
      recipientName: 'Marcus Johnson',
      content: 'Hi Marcus, I came across your profile and think you\'d be a great fit for our Senior Backend Engineer position.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      status: 'delivered',
      channel: 'linkedin'
    },
    unreadCount: 2,
    status: 'new',
    tags: ['backend', 'senior'],
    notes: [],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    candidateId: 'c3',
    candidateName: 'Emily Rodriguez',
    candidateAvatar: '/placeholder.svg',
    lastMessage: {
      id: 'm3',
      conversationId: '3',
      senderId: 'c3',
      senderName: 'Emily Rodriguez',
      recipientId: 'recruiter1',
      recipientName: 'John Recruiter',
      content: 'I\'m available for the interview next Tuesday at 2 PM.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: 'read',
      channel: 'sms'
    },
    unreadCount: 0,
    status: 'scheduled',
    tags: ['fullstack', 'interview'],
    notes: [],
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  }
];

export const ConversationList = () => {
  const { selectedConversation, setSelectedConversation, searchQuery, filter } = useMessagingStore();

  // Initialize mock data (in real app, this would come from API)
  const conversations = mockConversations;

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="w-3 h-3" />;
      case 'linkedin':
        return <MessageCircle className="w-3 h-3" />;
      case 'sms':
        return <Smartphone className="w-3 h-3" />;
      default:
        return <Mail className="w-3 h-3" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'scheduled':
        return 'bg-blue-500';
      case 'archived':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && conv.unreadCount > 0) ||
      (filter === 'archived' && conv.status === 'archived');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredConversations.map((conversation, index) => (
        <motion.div
          key={conversation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-4 border-b border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors ${
            selectedConversation === conversation.id ? 'bg-slate-800 border-l-4 border-l-primary-500' : ''
          }`}
          onClick={() => setSelectedConversation(conversation.id)}
        >
          <div className="flex items-start space-x-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={conversation.candidateAvatar} />
                <AvatarFallback className="bg-slate-700 text-white">
                  {conversation.candidateName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(conversation.status)}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-white truncate">{conversation.candidateName}</h3>
                <div className="flex items-center space-x-1 text-slate-400">
                  {getChannelIcon(conversation.lastMessage.channel)}
                  <span className="text-xs">
                    {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 truncate mb-2">
                {conversation.lastMessage.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {conversation.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(conversation.lastMessage.status)}
                  {conversation.unreadCount > 0 && (
                    <div className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {filteredConversations.length === 0 && (
        <div className="p-8 text-center text-slate-400">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No conversations found</p>
        </div>
      )}
    </div>
  );
};
