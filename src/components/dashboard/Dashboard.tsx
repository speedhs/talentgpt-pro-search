
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Search, 
  TrendingUp, 
  Clock,
  Star,
  MapPin,
  Briefcase
} from 'lucide-react';

const stats = [
  { label: 'Total Searches', value: '1,234', change: '+12%', icon: Search },
  { label: 'Active Candidates', value: '567', change: '+8%', icon: Users },
  { label: 'Successful Placements', value: '89', change: '+15%', icon: TrendingUp },
  { label: 'Response Rate', value: '94%', change: '+2%', icon: Clock },
];

const recentCandidates = [
  {
    name: 'Sarah Chen',
    role: 'Senior ML Engineer',
    location: 'San Francisco, CA',
    skills: ['Python', 'TensorFlow', 'PyTorch'],
    rating: 4.9,
    status: 'Available'
  },
  {
    name: 'Marcus Johnson',
    role: 'Full Stack Developer',
    location: 'Austin, TX',
    skills: ['React', 'Node.js', 'AWS'],
    rating: 4.7,
    status: 'Interviewing'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Data Scientist',
    location: 'Remote',
    skills: ['Python', 'R', 'SQL'],
    rating: 4.8,
    status: 'Available'
  }
];

export const Dashboard = () => {
  return (
    <div className="flex-1 p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Overview of your recruitment activities</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800 border-slate-600">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-400">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <p className="text-sm text-green-400 mt-1">{stat.change}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-slate-800 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription>Your latest recruitment activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-sm text-slate-300">New candidate matched for "Senior React Developer"</p>
                  <span className="text-xs text-slate-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <p className="text-sm text-slate-300">Interview scheduled with Sarah Chen</p>
                  <span className="text-xs text-slate-500">4h ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <p className="text-sm text-slate-300">5 new search results for "ML Engineer"</p>
                  <span className="text-xs text-slate-500">6h ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-slate-800 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Search Performance</CardTitle>
              <CardDescription>This week's search analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">AI/ML Engineers</span>
                    <span className="text-sm text-slate-400">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">Frontend Developers</span>
                    <span className="text-sm text-slate-400">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-300">Data Scientists</span>
                    <span className="text-sm text-slate-400">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Candidates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white">Top Candidates</CardTitle>
            <CardDescription>Recently discovered high-potential candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{candidate.name}</h3>
                      <p className="text-sm text-slate-400 flex items-center">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {candidate.role}
                      </p>
                      <p className="text-sm text-slate-400 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {candidate.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-white">{candidate.rating}</span>
                    </div>
                    <Badge 
                      variant={candidate.status === 'Available' ? 'default' : 'secondary'}
                      className={candidate.status === 'Available' ? 'bg-green-600' : 'bg-yellow-600'}
                    >
                      {candidate.status}
                    </Badge>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {candidate.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs border-slate-500 text-slate-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
