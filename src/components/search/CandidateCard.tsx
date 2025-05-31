
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  Eye,
  Star,
  Calendar
} from 'lucide-react';
import { Candidate } from '@/types/candidate';

interface CandidateCardProps {
  candidate: Candidate;
  viewMode: 'grid' | 'list';
  isSelected: boolean;
  onSelect: () => void;
  onViewProfile: () => void;
}

export const CandidateCard = ({ 
  candidate, 
  viewMode, 
  isSelected, 
  onSelect, 
  onViewProfile 
}: CandidateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(candidate.saved);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'interviewing': return 'bg-yellow-500';
      case 'employed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    return `${salary.currency} ${salary.min.toLocaleString()}-${salary.max.toLocaleString()}`;
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="bg-slate-800 border-slate-600 hover:border-slate-500 transition-all cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onViewProfile}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              onClick={(e) => e.stopPropagation()}
            />
            
            <Avatar className="w-16 h-16">
              <AvatarImage src={candidate.photo} alt={candidate.name} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white truncate">{candidate.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-primary-500 text-white">
                    {candidate.matchScore}% match
                  </Badge>
                  <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(candidate.availability)}`} />
                </div>
              </div>
              
              <p className="text-slate-300 mb-2">{candidate.title} at {candidate.company}</p>
              
              <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {candidate.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {formatSalary(candidate.salary)}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {candidate.experience}y exp
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {candidate.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs border-slate-600 text-slate-300">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 4 && (
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                    +{candidate.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="flex items-center space-x-2"
            >
              <Button
                size="sm"
                variant="outline"
                onClick={handleSave}
                className="border-slate-600 text-slate-300"
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={onViewProfile}
                className="bg-primary-500 hover:bg-primary-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className="bg-slate-800 border-slate-600 hover:border-slate-500 transition-all cursor-pointer h-full"
        onClick={onViewProfile}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSave}
              className="text-slate-400 hover:text-white"
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </Button>
          </div>

          <div className="text-center mb-4">
            <Avatar className="w-20 h-20 mx-auto mb-3">
              <AvatarImage src={candidate.photo} alt={candidate.name} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <h3 className="text-lg font-semibold text-white mb-1">{candidate.name}</h3>
            <p className="text-slate-300 text-sm mb-2">{candidate.title}</p>
            <p className="text-slate-400 text-sm">{candidate.company}</p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-slate-400">
                <MapPin className="w-4 h-4 mr-1" />
                {candidate.location}
              </div>
              <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(candidate.availability)}`} />
            </div>

            <div className="flex items-center text-sm text-slate-400">
              <DollarSign className="w-4 h-4 mr-1" />
              {formatSalary(candidate.salary)}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">{candidate.experience} years exp</span>
              <Badge variant="secondary" className="bg-primary-500 text-white">
                {candidate.matchScore}% match
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {candidate.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs border-slate-600 text-slate-300">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="flex space-x-2"
          >
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Contact
            </Button>
            <Button
              size="sm"
              onClick={onViewProfile}
              className="flex-1 bg-primary-500 hover:bg-primary-600"
            >
              <Eye className="w-4 h-4 mr-1" />
              Profile
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
