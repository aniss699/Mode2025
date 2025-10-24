import { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Star, Sliders, X, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CATEGORIES as categories, budgetRanges, urgencyLevels } from '@/lib/categories';

interface SearchFilters {
  query: string;
  categories: string[];
  budgetRange: [number, number];
  location: string;
  urgency: string[];
  rating: number;
  distance: number;
  dateRange: string;
  sortBy: string;
  availability: string;
}

interface AdvancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
}

export function AdvancedSearch({ onFiltersChange, initialFilters }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    budgetRange: [0, 10000],
    location: '',
    urgency: [],
    rating: 0,
    distance: 50,
    dateRange: 'all',
    sortBy: 'relevance',
    availability: 'all'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    updateFilters({ categories: newCategories });
  };

  const clearFilters = () => {
    const defaultFilters: SearchFilters = {
      query: '',
      categories: [],
      budgetRange: [0, 10000],
      location: '',
      urgency: [],
      rating: 0,
      distance: 50,
      dateRange: 'all',
      sortBy: 'relevance',
      availability: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const activeFiltersCount = [
    filters.categories.length > 0,
    filters.budgetRange[0] > 0 || filters.budgetRange[1] < 10000,
    filters.location,
    filters.urgency.length > 0,
    filters.rating > 0,
    filters.distance < 50,
    filters.dateRange !== 'all',
    filters.availability !== 'all'
  ].filter(Boolean).length;

  const handleSearchInput = (query: string) => {
    updateFilters({ query });

    // Simuler des suggestions de recherche
    if (query.length > 2) {
      const mockSuggestions = [
        'Développement web',
        'Design graphique',
        'Rénovation cuisine',
        'Transport meuble',
        'Formation Excel'
      ].filter(s => s.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    onFiltersChange({
      query: filters.query,
      categories: filters.categories,
      location: filters.location,
      budgetRange: filters.budgetRange,
      dateRange: filters.dateRange,
      urgency: filters.urgency,
      rating: filters.rating,
      distance: filters.distance,
      availability: filters.availability,
      sortBy: filters.sortBy
    });
  };

  const handleAISearch = async () => {
    if (!filters.query.trim()) return;

    try {
      const response = await fetch('/api/ai/search-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: filters.query })
      });

      if (response.ok) {
        const data = await response.json();
        setAiSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('AI search error:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Barre de recherche principale */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des missions ou des prestataires..."
            value={filters.query}
            onChange={(e) => handleSearchInput(e.target.value)}
            className="pl-10 pr-12"
          />
          {filters.query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => {
                updateFilters({ query: '' });
                setSuggestions([]);
                setAiSuggestions([]);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Suggestions de recherche */}
        {suggestions.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 shadow-lg">
            <CardContent className="p-2">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="px-3 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => {
                    updateFilters({ query: suggestion });
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Suggestions IA */}
        {aiSuggestions.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 shadow-lg">
            <CardContent className="p-2">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-semibold">Suggestions IA</h5>
                <Button variant="outline" size="sm" onClick={handleAISearch}>
                  Rafraîchir
                </Button>
              </div>
              {aiSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="px-3 py-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => {
                    updateFilters({ query: suggestion });
                    setAiSuggestions([]);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Bouton pour lancer la recherche IA */}
        {filters.query && (
          <Button onClick={handleAISearch} className="mt-2 w-full">
            Recherche IA
          </Button>
        )}
      </div>

      {/* Bouton pour afficher/masquer les filtres */}
      <div className="flex items-center gap-3">
        <Button 
          variant={showFilters ? "default" : "outline"} 
          className="gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Sliders className="h-4 w-4" />
          Filtres
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 bg-white text-primary">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Tri toujours visible */}
        <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Pertinence</SelectItem>
            <SelectItem value="date-desc">Plus récent</SelectItem>
            <SelectItem value="date-asc">Plus ancien</SelectItem>
            <SelectItem value="budget-desc">Budget décroissant</SelectItem>
            <SelectItem value="budget-asc">Budget croissant</SelectItem>
            <SelectItem value="rating">Note</SelectItem>
            <SelectItem value="distance">Distance</SelectItem>
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
            <X className="h-3 w-3" />
            Effacer
          </Button>
        )}
      </div>

      {/* Panneau de filtres avec animation */}
      {showFilters && (
        <Card className="border-2 border-primary/20 shadow-xl animate-in slide-in-from-top-2 duration-300">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres avancés
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFilters(false)}
                className="gap-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                Fermer
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Catégories */}
              <div className="space-y-4">
                <label className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <Filter className="h-4 w-4" />
                  Catégories
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category.id}
                      variant={filters.categories.includes(category.id) ? "default" : "outline"}
                      className="cursor-pointer hover:scale-110 transition-all duration-200 hover:shadow-md px-3 py-1.5"
                      onClick={() => toggleCategory(category.id)}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-4">
                <label className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <DollarSign className="h-4 w-4" />
                  Budget
                </label>
                <div className="space-y-4 bg-muted/30 rounded-lg p-4">
                  <Slider
                    value={filters.budgetRange}
                    onValueChange={(value) => updateFilters({ budgetRange: value as [number, number] })}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm font-bold text-primary">
                    <span className="bg-primary/10 px-3 py-1 rounded-md">{filters.budgetRange[0]}€</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-md">{filters.budgetRange[1]}€</span>
                  </div>
                </div>
              </div>

              {/* Note minimale */}
              <div className="space-y-4">
                <label className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <Star className="h-4 w-4" />
                  Note minimale
                </label>
                <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-3 justify-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={filters.rating >= rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFilters({ rating })}
                      className="w-12 h-12 p-0 hover:scale-110 transition-transform"
                    >
                      <Star className={`h-5 w-5 ${filters.rating >= rating ? 'fill-current' : ''}`} />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Distance */}
              <div className="space-y-4">
                <label className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <MapPin className="h-4 w-4" />
                  Rayon de recherche
                </label>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary">{filters.distance}</span>
                    <span className="text-sm text-muted-foreground ml-1">km</span>
                  </div>
                  <Slider
                    value={[filters.distance]}
                    onValueChange={([value]) => updateFilters({ distance: value })}
                    max={100}
                    step={5}
                  />
                </div>
              </div>

              {/* Urgence */}
              <div className="space-y-4 md:col-span-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <Clock className="h-4 w-4" />
                  Niveau d'urgence
                </label>
                <div className="flex flex-wrap gap-4 bg-muted/30 rounded-lg p-4">
                  {urgencyLevels.map((level) => (
                    <div 
                      key={level.id} 
                      className="flex items-center space-x-2 bg-background rounded-md px-3 py-2 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        const checked = !filters.urgency.includes(level.id);
                        const newUrgency = checked
                          ? [...filters.urgency, level.id]
                          : filters.urgency.filter(u => u !== level.id);
                        updateFilters({ urgency: newUrgency });
                      }}
                    >
                      <Checkbox
                        id={level.id}
                        checked={filters.urgency.includes(level.id)}
                        onCheckedChange={(checked) => {
                          const newUrgency = checked
                            ? [...filters.urgency, level.id]
                            : filters.urgency.filter(u => u !== level.id);
                          updateFilters({ urgency: newUrgency });
                        }}
                      />
                      <label htmlFor={level.id} className="text-sm cursor-pointer">
                        <span className={`font-semibold ${level.color}`}>{level.name}</span>
                        <span className="text-muted-foreground ml-1.5 text-xs">({level.days})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions du panneau */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                {activeFiltersCount} filtre{activeFiltersCount > 1 ? 's' : ''} actif{activeFiltersCount > 1 ? 's' : ''}
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearFilters}
                  disabled={activeFiltersCount === 0}
                  className="gap-1"
                >
                  <X className="h-3 w-3" />
                  Réinitialiser
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="gap-1"
                >
                  Appliquer les filtres
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtres actifs */}
      {activeFiltersCount > 0 && (
        <div className="flex gap-2 flex-wrap">
          {filters.categories.map((categoryId) => {
            const category = categories.find(c => c.id === categoryId);
            return category ? (
              <Badge key={categoryId} variant="secondary" className="gap-1">
                {category.name}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleCategory(categoryId)}
                />
              </Badge>
            ) : null;
          })}

          {(filters.budgetRange[0] > 0 || filters.budgetRange[1] < 10000) && (
            <Badge variant="secondary" className="gap-1">
              {filters.budgetRange[0]}€ - {filters.budgetRange[1]}€
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilters({ budgetRange: [0, 10000] })}
              />
            </Badge>
          )}

          {filters.rating > 0 && (
            <Badge variant="secondary" className="gap-1">
              {filters.rating}+ étoiles
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilters({ rating: 0 })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}