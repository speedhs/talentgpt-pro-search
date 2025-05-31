
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useMessagingStore } from '@/lib/messagingStore';
import { 
  Send, 
  Clock, 
  Paperclip, 
  Type, 
  Mail, 
  MessageCircle, 
  Smartphone,
  X,
  Plus
} from 'lucide-react';

export const ComposeModal = () => {
  const { isComposing, setIsComposing } = useMessagingStore();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [channels, setChannels] = useState({
    email: true,
    linkedin: false,
    sms: false
  });
  const [scheduled, setScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [useTemplate, setUseTemplate] = useState(false);

  const templates = [
    {
      id: '1',
      name: 'Initial Outreach',
      subject: 'Exciting opportunity at {company}',
      content: 'Hi {firstName},\n\nI came across your profile and was impressed by your experience in {skills}. We have an exciting {position} role that might interest you.\n\nWould you be open to a brief conversation?\n\nBest regards,\n{senderName}'
    },
    {
      id: '2',
      name: 'Follow-up',
      subject: 'Following up on our previous conversation',
      content: 'Hi {firstName},\n\nI wanted to follow up on our previous conversation about the {position} role at {company}.\n\nDo you have any questions I can help answer?\n\nLooking forward to hearing from you.\n\nBest,\n{senderName}'
    }
  ];

  const handleSend = () => {
    // In real app, this would send the message
    console.log('Sending message:', { recipient, subject, content, channels, scheduled, scheduleDate });
    setIsComposing(false);
    // Reset form
    setRecipient('');
    setSubject('');
    setContent('');
  };

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSubject(template.subject);
    setContent(template.content);
    setUseTemplate(false);
  };

  return (
    <Dialog open={isComposing} onOpenChange={setIsComposing}>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Compose Message</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Recipient */}
          <div>
            <Label htmlFor="recipient" className="text-white">To</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter candidate name or email..."
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          {/* Channels */}
          <div>
            <Label className="text-white mb-2 block">Send via</Label>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={channels.email}
                  onCheckedChange={(checked) => setChannels(prev => ({ ...prev, email: checked }))}
                />
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-white">Email</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={channels.linkedin}
                  onCheckedChange={(checked) => setChannels(prev => ({ ...prev, linkedin: checked }))}
                />
                <MessageCircle className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-white">LinkedIn</span>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={channels.sms}
                  onCheckedChange={(checked) => setChannels(prev => ({ ...prev, sms: checked }))}
                />
                <Smartphone className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-white">SMS</span>
              </div>
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-white">Templates</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUseTemplate(!useTemplate)}
                className="text-sm"
              >
                <Type className="w-4 h-4 mr-1" />
                {useTemplate ? 'Hide' : 'Use Template'}
              </Button>
            </div>
            
            {useTemplate && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {templates.map(template => (
                  <Button
                    key={template.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleTemplateSelect(template)}
                    className="border-slate-600 text-left justify-start"
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject" className="text-white">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Message subject..."
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content" className="text-white">Message</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your message..."
              rows={8}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          {/* Schedule */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                checked={scheduled}
                onCheckedChange={setScheduled}
              />
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-white">Schedule for later</span>
            </div>
            
            {scheduled && (
              <Input
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-auto bg-slate-700 border-slate-600 text-white"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsComposing(false)}
                className="border-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                disabled={!recipient || !content}
                className="bg-primary-500 hover:bg-primary-600"
              >
                {scheduled ? (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
