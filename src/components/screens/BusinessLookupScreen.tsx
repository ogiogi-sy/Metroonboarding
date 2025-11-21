import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SplitLayout } from '../SplitLayout';
import { Search, Building2, ChevronRight, Info } from 'lucide-react';

interface BusinessLookupScreenProps {
  onNext: (data: any) => void;
  onManual: () => void;
  currentStep: number;
  totalSteps: number;
  onRestart?: () => void;
}

// Mock Companies House autocomplete results
const mockSearchResults = [
  {
    number: '12345678',
    name: 'Tech Innovations Ltd',
    address: '123 High Street, London, SW1A 1AA',
    status: 'Active',
  },
  {
    number: '87654321',
    name: 'Metro Solutions Ltd',
    address: '456 Oxford Street, London, W1D 1BS',
    status: 'Active',
  },
  {
    number: '11223344',
    name: 'Digital Services Group Ltd',
    address: '789 King Street, Manchester, M2 4WU',
    status: 'Active',
  },
];

export function BusinessLookupScreen({ onNext, onManual, currentStep, totalSteps, onRestart }: BusinessLookupScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length >= 2) {
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockSearchResults.filter(
          result =>
            result.name.toLowerCase().includes(query.toLowerCase()) ||
            result.number.includes(query)
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectBusiness = (business: any) => {
    // Fetch full business details (mock data)
    const fullData = {
      companiesHouseNumber: business.number,
      companyName: business.name,
      legalName: business.name,
      registeredAddress: business.address,
      incorporationDate: '2020-01-15',
      businessStatus: business.status,
      businessType: 'Private Limited Company',
      industry: 'Software Development',
      postcode: business.address.split(',').pop()?.trim() || '',
      // Mock officers/PSCs
      officers: [
        { name: 'John Smith', role: 'Director', appointedOn: '2020-01-15' },
        { name: 'Sarah Johnson', role: 'Director', appointedOn: '2020-01-15' },
      ],
      pscs: [
        { name: 'John Smith', natureOfControl: 'Ownership of shares - 75% or more' },
      ],
    };
    
    onNext(fullData);
  };

  return (
    <SplitLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      stepLabel="Business information"
      percentComplete={17}
      minutesRemaining={8}
      onRestart={onRestart}
      onBack={() => window.location.reload()}
      leftHeading="Let's find your business"
      leftDescription="We'll need to confirm your business details with Companies House to get your account set up correctly."
      leftIcon={Search}
    >
      <div className="mb-8">
        <h2 className="mb-3">Find your business</h2>
        <p className="text-muted-foreground">
          Search Companies House to get started
        </p>
      </div>

      <div className="space-y-8">
        {/* Search Input */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Search by business name or number"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12"
              autoFocus
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Helper Text - moved closer and left-aligned */}
          {searchQuery.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Try: "Tech Innovations", "Metro Solutions", or "12345678"
            </p>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
            <div className="divide-y divide-border max-h-80 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.number}
                  onClick={() => handleSelectBusiness(result)}
                  className="w-full p-6 text-left hover:bg-accent/5 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="mb-2 group-hover:text-accent transition-colors">
                        {result.name}
                      </h4>
                      <p className="text-base text-muted-foreground mb-2">
                        {result.address}
                      </p>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground">No. {result.number}</span>
                        <span className={`px-3 py-1 rounded-full ${
                          result.status === 'Active' 
                            ? 'bg-[#DCFCE7] text-[#16A34A]' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-4">
              No businesses found matching "{searchQuery}"
            </p>
            <Button
              variant="outline"
              onClick={onManual}
              size="sm"
            >
              Enter details manually
            </Button>
          </div>
        )}

        {/* Manual Entry Option - new card style */}
        {searchQuery.length === 0 && (
          <div className="pt-6">
            <button
              onClick={onManual}
              className="w-full bg-white border border-border rounded-2xl p-6 text-left hover:border-accent hover:bg-accent/5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 group-hover:text-accent transition-colors">
                    Can't find your business?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enter your details manually instead
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
              </div>
            </button>
          </div>
        )}

        {/* Manual Entry when searching */}
        {searchQuery.length > 0 && searchResults.length > 0 && (
          <div className="pt-4">
            <button
              onClick={onManual}
              className="w-full bg-white border border-border rounded-2xl p-6 text-left hover:border-accent hover:bg-accent/5 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 group-hover:text-accent transition-colors">
                    Can't find your business?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Enter your details manually instead
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
              </div>
            </button>
          </div>
        )}
      </div>
    </SplitLayout>
  );
}