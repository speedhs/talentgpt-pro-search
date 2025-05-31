
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

export const SearchFilters = () => {
  const [experienceRange, setExperienceRange] = useState([0, 15]);
  const [salaryRange, setSalaryRange] = useState([50000, 250000]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  const skillOptions = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 
    'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch',
    'LangChain', 'RAG', 'GraphQL', 'PostgreSQL', 'MongoDB'
  ];

  const locationOptions = [
    'San Francisco, CA', 'New York, NY', 'Remote', 'London, UK',
    'Berlin, Germany', 'Toronto, Canada', 'Austin, TX', 'Seattle, WA'
  ];

  const availabilityOptions = [
    { value: 'available', label: 'Available' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'employed', label: 'Employed but Open' }
  ];

  const toggleSelection = (value: string, selected: string[], setSelected: (values: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(item => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSelectedLocations([]);
    setSelectedAvailability([]);
    setExperienceRange([0, 15]);
    setSalaryRange([50000, 250000]);
  };

  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-slate-400 hover:text-white"
          >
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Skills */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Skills</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {skillOptions.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={() => toggleSelection(skill, selectedSkills, setSelectedSkills)}
                />
                <label className="text-sm text-slate-300 cursor-pointer flex-1">
                  {skill}
                </label>
              </div>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-primary-500 text-white text-xs"
                >
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 text-white hover:text-slate-300"
                    onClick={() => toggleSelection(skill, selectedSkills, setSelectedSkills)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator className="bg-slate-700" />

        {/* Location */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Location</h3>
          <div className="space-y-2">
            {locationOptions.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                />
                <label className="text-sm text-slate-300 cursor-pointer flex-1">
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Experience */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Experience</h3>
          <div className="space-y-3">
            <Slider
              value={experienceRange}
              onValueChange={setExperienceRange}
              max={15}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>{experienceRange[0]} years</span>
              <span>{experienceRange[1]}+ years</span>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Salary */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Salary Range (USD)</h3>
          <div className="space-y-3">
            <Slider
              value={salaryRange}
              onValueChange={setSalaryRange}
              max={300000}
              min={40000}
              step={10000}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>${salaryRange[0].toLocaleString()}</span>
              <span>${salaryRange[1].toLocaleString()}+</span>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Availability */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Availability</h3>
          <div className="space-y-2">
            {availabilityOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedAvailability.includes(option.value)}
                  onCheckedChange={() => toggleSelection(option.value, selectedAvailability, setSelectedAvailability)}
                />
                <label className="text-sm text-slate-300 cursor-pointer flex-1">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
