
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  MapPin, 
  DollarSign, 
  Mail, 
  Phone, 
  Linkedin,
  Github, 
  ExternalLink,
  MessageCircle,
  Calendar,
  UserPlus,
  Bookmark,
  Share2,
  Download,
  Star,
  TrendingUp
} from 'lucide-react';
import { Candidate } from '@/types/candidate';

interface CandidateDetailModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export const CandidateDetailModal = ({ candidate, onClose }: CandidateDetailModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400';
      case 'interviewing': return 'text-yellow-400';
      case 'employed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available for new opportunities';
      case 'interviewing': return 'Currently interviewing';
      case 'employed': return 'Employed but open to offers';
      default: return 'Status unknown';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={candidate.photo} alt={candidate.name} />
                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-white">{candidate.name}</h2>
                <p className="text-slate-300">{candidate.title} at {candidate.company}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-slate-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {candidate.location}
                  </div>
                  <span className={`text-sm ${getAvailabilityColor(candidate.availability)}`}>
                    {getAvailabilityText(candidate.availability)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-primary-500 text-white text-lg px-3 py-1">
                {candidate.matchScore}% match
              </Badge>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between p-6 bg-slate-750">
            <div className="flex items-center space-x-3">
              <Button className="bg-primary-500 hover:bg-primary-600">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                <UserPlus className="w-4 h-4 mr-2" />
                Add to Pipeline
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-slate-400">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-700">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* AI Summary */}
                <Card className="bg-slate-750 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      AI-Generated Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{candidate.summary}</p>
                  </CardContent>
                </Card>

                {/* Match Breakdown */}
                <Card className="bg-slate-750 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Why this candidate is a great match</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Technical Skills</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                        </div>
                        <span className="text-white text-sm">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Experience Level</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <span className="text-white text-sm">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Location Preference</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-600 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }} />
                        </div>
                        <span className="text-white text-sm">78%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-slate-750 border-slate-600">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-white mb-1">{candidate.experience}</div>
                      <div className="text-slate-400 text-sm">Years Experience</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-750 border-slate-600">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        ${candidate.salary.min.toLocaleString()}
                      </div>
                      <div className="text-slate-400 text-sm">Expected Salary</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <Card className="bg-slate-750 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-primary-500 text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-750 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white">Skill Endorsements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {candidate.endorsements.map((endorsement) => (
                      <div key={endorsement.skill} className="flex items-center justify-between">
                        <span className="text-slate-300">{endorsement.skill}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400 text-sm">{endorsement.count} endorsements</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(endorsement.count / 10) ? 'text-yellow-400 fill-current' : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-4">
                {candidate.education.map((edu, index) => (
                  <Card key={index} className="bg-slate-750 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{edu.degree}</h3>
                          <p className="text-slate-300">{edu.institution}</p>
                          <p className="text-slate-400 text-sm">Graduated {edu.year}</p>
                        </div>
                        {edu.ranking && (
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            #{edu.ranking} Ranked
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                {candidate.projects.map((project, index) => (
                  <Card key={index} className="bg-slate-750 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold">{project.name}</h3>
                        <div className="flex items-center space-x-2">
                          {project.githubUrl && (
                            <Button variant="ghost" size="sm" className="text-slate-400">
                              <Github className="w-4 h-4" />
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button variant="ghost" size="sm" className="text-slate-400">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
