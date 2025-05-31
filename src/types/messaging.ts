
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  channel: 'email' | 'linkedin' | 'sms';
  attachments?: Attachment[];
  isInternal?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface Conversation {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar?: string;
  lastMessage: Message;
  unreadCount: number;
  status: 'new' | 'in_progress' | 'scheduled' | 'archived';
  tags: string[];
  assignedTo?: string;
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: 'initial_outreach' | 'follow_up' | 'interview_invitation' | 'offer_letter';
  subject: string;
  content: string;
  variables: string[];
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  channels: ('email' | 'linkedin' | 'sms')[];
  template: MessageTemplate;
  targetCandidates: string[];
  workflow: CampaignStep[];
  analytics: CampaignAnalytics;
  createdAt: Date;
  scheduledAt?: Date;
}

export interface CampaignStep {
  id: string;
  type: 'send_message' | 'wait' | 'condition';
  delay?: number; // in hours
  template?: MessageTemplate;
  condition?: string;
}

export interface CampaignAnalytics {
  sent: number;
  delivered: number;
  opened: number;
  replied: number;
  bounced: number;
  openRate: number;
  responseRate: number;
  conversionRate: number;
}
