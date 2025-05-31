
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Search,
  Filter,
  Mail,
  MessageCircle,
  Calendar,
  FileText
} from 'lucide-react';

const mockTemplates = [
  {
    id: '1',
    name: 'Initial Outreach - Tech Roles',
    category: 'initial_outreach',
    subject: 'Exciting {position} opportunity at {company}',
    content: 'Hi {firstName},\n\nI came across your profile and was impressed by your experience in {skills}. We have an exciting {position} role at {company} that might be perfect for you.\n\nKey highlights:\n- Competitive salary: {salaryRange}\n- Remote-friendly culture\n- Cutting-edge tech stack\n\nWould you be open to a brief 15-minute conversation?\n\nBest regards,\n{senderName}',
    variables: ['firstName', 'position', 'company', 'skills', 'salaryRange', 'senderName'],
    usageCount: 45,
    responseRate: 23.5,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Follow-up Sequence Day 3',
    category: 'follow_up',
    subject: 'Still interested in the {position} role?',
    content: 'Hi {firstName},\n\nI wanted to follow up on my previous message about the {position} opportunity at {company}.\n\nI understand you\'re probably busy, but I\'d love to share more details about this role, including:\n\n- The innovative projects you\'d work on\n- Our team culture and values\n- Career growth opportunities\n\nNo pressure at all - just let me know if you\'d like to learn more!\n\nBest,\n{senderName}',
    variables: ['firstName', 'position', 'company', 'senderName'],
    usageCount: 32,
    responseRate: 18.2,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Interview Invitation',
    category: 'interview_invitation',
    subject: 'Interview invitation for {position} role',
    content: 'Hi {firstName},\n\nThank you for your interest in the {position} role at {company}!\n\nWe\'d love to move forward with a {interviewType} interview. Here are the details:\n\n📅 Date: {interviewDate}\n⏰ Time: {interviewTime}\n🎥 Platform: {platform}\n⏱️ Duration: {duration}\n\nPlease confirm your availability, and I\'ll send you the meeting link.\n\nLooking forward to our conversation!\n\nBest,\n{senderName}',
    variables: ['firstName', 'position', 'company', 'interviewType', 'interviewDate', 'interviewTime', 'platform', 'duration', 'senderName'],
    usageCount: 28,
    responseRate: 87.5,
    createdAt: new Date('2024-02-01')
  }
];

export const MessageTemplates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreating, setIsCreating] = useState(false);

  const categories = [
    { id: 'all', label: 'All Templates', icon: FileText },
    { id: 'initial_outreach', label: 'Initial Outreach', icon: Mail },
    { id: 'follow_up', label: 'Follow-up', icon: MessageCircle },
    { id: 'interview_invitation', label: 'Interview', icon: Calendar },
  ];

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    const Icon = cat?.icon || FileText;
    return <Icon className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'initial_outreach':
        return 'bg-blue-500';
      case 'follow_up':
        return 'bg-yellow-500';
      case 'interview_invitation':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Message Templates</h2>
          <p className="text-slate-400">Create and manage reusable message templates</p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-primary-500 hover:bg-primary-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
            className="pl-10 bg-slate-800 border-slate-600 text-white"
          />
        </div>

        <div className="flex space-x-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(template.category)}`} />
                  <CardTitle className="text-white text-base">{template.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <span>Used {template.usageCount} times</span>
                <span>{template.responseRate}% response rate</span>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="mb-3">
                <p className="text-sm font-medium text-white mb-1">Subject:</p>
                <p className="text-sm text-slate-300 bg-slate-700 rounded p-2">
                  {template.subject}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium text-white mb-1">Preview:</p>
                <p className="text-xs text-slate-400 line-clamp-3 bg-slate-700 rounded p-2">
                  {template.content.substring(0, 150)}...
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {template.variables.slice(0, 3).map(variable => (
                  <Badge key={variable} variant="secondary" className="text-xs">
                    {variable}
                  </Badge>
                ))}
                {template.variables.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{template.variables.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 border-slate-600">
                  Use Template
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
          <p className="text-slate-400 mb-4">Create your first template to get started</p>
          <Button onClick={() => setIsCreating(true)} className="bg-primary-500 hover:bg-primary-600">
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>
      )}
    </div>
  );
};
