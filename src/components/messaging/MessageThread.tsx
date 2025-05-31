
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow, format } from 'date-fns';
import { useMessagingStore } from '@/lib/messagingStore';
import { Message } from '@/types/messaging';
import { 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Calendar,
  Phone,
  Video,
  Archive,
  Tag,
  CheckCheck,
  Check,
  Clock
} from 'lucide-react';

// Mock messages data
const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      conversationId: '1',
      senderId: 'recruiter1',
      senderName: 'John Recruiter',
      recipientId: 'c1',
      recipientName: 'Sarah Chen',
      content: 'Hi Sarah! I came across your profile and was impressed by your React and TypeScript experience. We have an exciting frontend position that might interest you.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'read',
      channel: 'email'
    },
    {
      id: 'm2',
      conversationId: '1',
      senderId: 'c1',
      senderName: 'Sarah Chen',
      recipientId: 'recruiter1',
      recipientName: 'John Recruiter',
      content: 'Thank you for reaching out! I\'m definitely interested in learning more about this opportunity. Could you share more details about the role and the company?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'read',
      channel: 'email'
    }
  ]
};

export const MessageThread = () => {
  const { selectedConversation, sendMessage } = useMessagingStore();
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messages = mockMessages[selectedConversation || ''] || [];
  const conversation = {
    candidateName: 'Sarah Chen',
    candidateAvatar: '/placeholder.svg',
    status: 'in_progress',
    tags: ['frontend', 'urgent']
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    sendMessage({
      conversationId: selectedConversation,
      senderId: 'recruiter1',
      senderName: 'John Recruiter',
      recipientId: 'c1',
      recipientName: conversation.candidateName,
      content: newMessage,
      status: 'sent',
      channel: 'email'
    });

    setNewMessage('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-slate-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-slate-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return <Clock className="w-3 h-3 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className="border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={conversation.candidateAvatar} />
              <AvatarFallback className="bg-slate-700 text-white">
                {conversation.candidateName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-white">{conversation.candidateName}</h2>
              <div className="flex items-center space-x-2">
                {conversation.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isOwn = message.senderId === 'recruiter1';
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!isOwn && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={conversation.candidateAvatar} />
                    <AvatarFallback className="bg-slate-700 text-white text-xs">
                      {message.senderName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`rounded-lg p-3 ${
                  isOwn 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-slate-700 text-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <div className={`flex items-center justify-between mt-2 text-xs ${
                    isOwn ? 'text-primary-100' : 'text-slate-400'
                  }`}>
                    <span>{format(message.timestamp, 'HH:mm')}</span>
                    {isOwn && getStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={conversation.candidateAvatar} />
                <AvatarFallback className="bg-slate-700 text-white text-xs">
                  {conversation.candidateName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="bg-slate-700 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="bg-slate-800 border-slate-600 text-white resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Smile className="w-4 h-4" />
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-primary-500 hover:bg-primary-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Replies */}
        <div className="flex space-x-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-slate-600"
            onClick={() => setNewMessage("Thanks for your interest! When would be a good time for a quick call?")}
          >
            Schedule Call
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-slate-600"
            onClick={() => setNewMessage("Could you share your updated resume and portfolio?")}
          >
            Request Resume
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-slate-600"
            onClick={() => setNewMessage("What's your salary expectation for this role?")}
          >
            Salary Discussion
          </Button>
        </div>
      </div>
    </div>
  );
};
