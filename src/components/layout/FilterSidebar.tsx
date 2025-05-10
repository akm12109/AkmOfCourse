
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input'; // Not used, consider removing
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { courseCategories as defaultCourseCategories, skillLevels as defaultSkillLevels } from '@/lib/placeholder-data'; // Use updated categories
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void; 
}

// Use imported categories and skill levels
const courseCategories = defaultCourseCategories;
const skillLevels = defaultSkillLevels;

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]); // Adjusted for INR
  const [selectedSkillLevels, setSelectedSkillLevels] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleSkillLevelChange = (level: string) => {
    setSelectedSkillLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories.includes('All') ? [] : selectedCategories, // If 'All' is selected, pass empty array to not filter by category
      priceRange,
      skillLevels: selectedSkillLevels.includes('All Levels') ? [] : selectedSkillLevels, // If 'All Levels' is selected, pass empty
    });
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSelectedSkillLevels([]);
    onFilterChange({
      categories: [],
      priceRange: [0, 10000],
      skillLevels: [],
    });
  }


  return (
    <aside className="w-full md:w-72 lg:w-80 p-6 bg-card rounded-lg shadow-lg space-y-6 sticky top-20 h-fit">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center">
          <Filter className="mr-2 h-5 w-5 text-primary" /> Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
            <X className="mr-1 h-3 w-3" /> Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['categories', 'price', 'skillLevel']} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">Categories</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 max-h-60 overflow-y-auto">
            {courseCategories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.replace(/\s+/g, '-')}`} // Ensure ID is valid
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`cat-${category.replace(/\s+/g, '-')}`} className="font-normal text-sm">{category}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range (INR)</AccordionTrigger>
          <AccordionContent className="space-y-3 pt-3">
            <Slider
              defaultValue={[0, 10000]}
              min={0}
              max={10000} // Max price in INR
              step={500}  // Step in INR
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}{priceRange[1] === 10000 ? '+' : ''}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skillLevel">
          <AccordionTrigger className="text-base font-medium">Skill Level</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {skillLevels.map(level => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`skill-${level.replace(/\s+/g, '-')}`} // Ensure ID is valid
                  checked={selectedSkillLevels.includes(level)}
                  onCheckedChange={() => handleSkillLevelChange(level)}
                />
                <Label htmlFor={`skill-${level.replace(/\s+/g, '-')}`} className="font-normal text-sm">{level}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full bg-primary hover:bg-primary/90">Apply Filters</Button>
    </aside>
  );
};

export default FilterSidebar;
