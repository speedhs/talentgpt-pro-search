
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Play, 
  Pause, 
  BarChart3, 
  Users, 
  Mail, 
  MessageCircle, 
  Smartphone,
  Calendar,
  TrendingUp,
  Target,
  Clock
} from 'lucide-react';

const mockCampaigns = [
  {
    id: '1',
    name: 'Q1 Frontend Recruitment',
    status: 'active' as const,
    channels: ['email', 'linkedin'],
    targetCount: 150,
    sentCount: 120,
    analytics: {
      sent: 120,
      delivered: 118,
      opened: 45,
      replied: 12,
      bounced: 2,
      openRate: 38.1,
      responseRate: 10.0,
      conversionRate: 8.3
    },
    createdAt: new Date('2024-01-15'),
    scheduledAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Senior Backend Engineers',
    status: 'paused' as const,
    channels: ['email', 'sms'],
    targetCount: 80,
    sentCount: 45,
    analytics: {
      sent: 45,
      delivered: 44,
      opened: 22,
      replied: 8,
      bounced: 1,
      openRate: 50.0,
      responseRate: 18.2,
      conversionRate: 15.6
    },
    createdAt: new Date('2024-02-01'),
    scheduledAt: new Date('2024-02-05')
  },
  {
    id: '3',
    name: 'DevOps Specialists Outreach',
    status: 'draft' as const,
    channels: ['linkedin'],
    targetCount: 60,
    sentCount: 0,
    analytics: {
      sent: 0,
      delivered: 0,
      opened: 0,
      replied: 0,
      bounced: 0,
      openRate: 0,
      responseRate: 0,
      conversionRate: 0
    },
    createdAt: new Date('2024-02-10'),
    scheduledAt: undefined
  }
];

export const CampaignBuilder = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'paused':
        return 'bg-yellow-500';
      case 'draft':
        return 'bg-gray-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Outreach Campaigns</h2>
          <p className="text-slate-400">Create and manage multi-channel recruitment campaigns</p>
        </div>
        <Button className="bg-primary-500 hover:bg-primary-600">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-sm text-slate-400">Active Campaigns</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-slate-400">Total Reached</p>
                <p className="text-2xl font-bold text-white">165</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-sm text-slate-400">Avg Response Rate</p>
                <p className="text-2xl font-bold text-white">14.1%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-sm text-slate-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-white">11.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {mockCampaigns.map(campaign => (
          <Card key={campaign.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`} />
                  <CardTitle className="text-white">{campaign.name}</CardTitle>
                  <Badge variant="secondary" className="capitalize">
                    {campaign.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  {campaign.status === 'active' ? (
                    <Button variant="outline" size="sm" className="border-slate-600">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  ) : campaign.status === 'paused' ? (
                    <Button variant="outline" size="sm" className="border-slate-600">
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="border-slate-600">
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="border-slate-600">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Campaign Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Channels</p>
                    <div className="flex space-x-2">
                      {campaign.channels.map(channel => (
                        <div key={channel} className="flex items-center space-x-1 bg-slate-700 rounded px-2 py-1">
                          {getChannelIcon(channel)}
                          <span className="text-xs text-white capitalize">{channel}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-slate-400 mb-1">Progress</p>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={(campaign.sentCount / campaign.targetCount) * 100} 
                        className="flex-1"
                      />
                      <span className="text-xs text-white">
                        {campaign.sentCount}/{campaign.targetCount}
                      </span>
                    </div>
                  </div>

                  {campaign.scheduledAt && (
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Scheduled</p>
                      <div className="flex items-center space-x-1 text-sm text-white">
                        <Calendar className="w-4 h-4" />
                        <span>{campaign.scheduledAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analytics */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-slate-400 mb-3">Performance</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-slate-700 rounded">
                      <p className="text-lg font-bold text-white">{campaign.analytics.sent}</p>
                      <p className="text-xs text-slate-400">Sent</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700 rounded">
                      <p className="text-lg font-bold text-white">{campaign.analytics.opened}</p>
                      <p className="text-xs text-slate-400">Opened</p>
                      <p className="text-xs text-green-400">{campaign.analytics.openRate}%</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700 rounded">
                      <p className="text-lg font-bold text-white">{campaign.analytics.replied}</p>
                      <p className="text-xs text-slate-400">Replied</p>
                      <p className="text-xs text-blue-400">{campaign.analytics.responseRate}%</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700 rounded">
                      <p className="text-lg font-bold text-white">{Math.round(campaign.analytics.replied * (campaign.analytics.conversionRate / 100))}</p>
                      <p className="text-xs text-slate-400">Converted</p>
                      <p className="text-xs text-purple-400">{campaign.analytics.conversionRate}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h3 className="text-lg font-medium text-white mb-2">No campaigns yet</h3>
          <p className="text-slate-400 mb-4">Create your first outreach campaign to start recruiting</p>
          <Button className="bg-primary-500 hover:bg-primary-600">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      )}
    </div>
  );
};
