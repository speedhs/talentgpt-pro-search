
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Grid, 
  List, 
  Filter, 
  Search,
  MapPin,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  Eye,
  Download,
  ChevronDown
} from 'lucide-react';
import { mockCandidates } from '@/lib/mockData';
import { Candidate } from '@/types/candidate';
import { CandidateCard } from './CandidateCard';
import { CandidateDetailModal } from './CandidateDetailModal';
import { SearchFilters } from './SearchFilters';

export const SearchResults = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  
  const candidates = mockCandidates;

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === candidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(candidates.map(c => c.id));
    }
  };

  return (
    <div className="flex-1 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Search Results</h1>
            <p className="text-slate-400">{candidates.length} candidates found</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-slate-600 text-slate-300"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center border border-slate-600 rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Refine search..."
              className="pl-10 bg-slate-800 border-slate-600 text-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-400">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-md px-3 py-1 text-white text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="experience">Experience</option>
              <option value="salary">Salary</option>
              <option value="lastActive">Last Active</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCandidates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 border border-slate-600 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedCandidates.length === candidates.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-white">
                  {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''} selected
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message All
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save All
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <SearchFilters />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="flex-1">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CandidateCard
                  candidate={candidate}
                  viewMode={viewMode}
                  isSelected={selectedCandidates.includes(candidate.id)}
                  onSelect={() => handleSelectCandidate(candidate.id)}
                  onViewProfile={() => setSelectedCandidate(candidate)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  );
};
