import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface PostSearchProps {
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function PostSearch({ onSearch, onClear, placeholder = "Search posts..." }: PostSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    } else {
      onClear();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <form onSubmit={handleSearch} className="relative flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" variant="outline">
        Search
      </Button>
    </form>
  );
}