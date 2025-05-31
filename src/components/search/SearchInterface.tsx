
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Filter, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  Clock,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

const popularQueries = [
  "Senior AI/ML engineers with Python and TensorFlow",
  "React developers with TypeScript and 5+ years experience",
  "Data scientists with expertise in NLP and computer vision",
  "DevOps engineers familiar with AWS and Kubernetes",
  "Full-stack developers with Node.js and MongoDB"
];

export const SearchInterface = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { searchQueries, addSearchQuery, toggleSaveQuery, deleteQuery } = useAppStore();

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      addSearchQuery(finalQuery);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Main Search Bar */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Find senior Gen-AI engineers with LangChain + RAG experience in Europe, open to contract work"
              className="pl-12 pr-24 py-6 text-lg bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost"
                className="text-slate-400 hover:text-white"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
              <Button 
                size="sm" 
                onClick={() => handleSearch()}
                className="bg-primary-500 hover:bg-primary-600"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Search
              </Button>
            </div>
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50"
              >
                <div className="p-4">
                  <h3 className="text-sm font-medium text-slate-300 mb-3">Popular searches</h3>
                  <div className="space-y-2">
                    {popularQueries.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion)}
                        className="w-full text-left p-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Card className="bg-slate-800 border-slate-600">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Advanced Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAdvancedFilters(false)}
                    >
                      {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location
                      </label>
                      <Input 
                        placeholder="e.g., San Francisco, Remote" 
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Salary Range
                      </label>
                      <div className="flex space-x-2">
                        <Input 
                          placeholder="Min" 
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <Input 
                          placeholder="Max" 
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Availability
                      </label>
                      <select className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white">
                        <option>Any</option>
                        <option>Immediately</option>
                        <option>Within 2 weeks</option>
                        <option>Within 1 month</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search History */}
      {searchQueries.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Search History</h2>
            <Badge variant="secondary" className="bg-slate-700 text-slate-300">
              {searchQueries.length} searches
            </Badge>
          </div>
          
          <div className="space-y-3">
            {searchQueries.map((search, index) => (
              <motion.div
                key={search.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800 border-slate-600 hover:border-slate-500 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white mb-1">{search.query}</p>
                        <p className="text-sm text-slate-400">
                          {search.timestamp.toLocaleDateString()} at {search.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaveQuery(search.id)}
                          className={search.saved ? 'text-yellow-400' : 'text-slate-400'}
                        >
                          <Bookmark className={`w-4 h-4 ${search.saved ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteQuery(search.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {searchQueries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto text-center py-12"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">Ready to find amazing talent?</h3>
          <p className="text-slate-400 mb-6">
            Start by describing the ideal candidate you're looking for. Our AI will help you find the perfect match.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularQueries.slice(0, 3).map((query, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSearch(query)}
                className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
              >
                {query.split(' ').slice(0, 4).join(' ')}...
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
