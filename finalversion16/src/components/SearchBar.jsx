import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function SearchBar({ 
  searchQuery, 
  onSearchChange, 
  totalResults, 
  selectedTag, 
  onSelectTag,
  availableTags = ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'NumPy']
}) {
  return (
    <div className="w-full space-y-3">
      {/* Search Input Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search experiments by name, module, technology, or keywords..."
          className="w-full pl-12 sm:pl-14 pr-24 py-4 rounded-2xl bg-white dark:bg-[#130d24] border border-stone-200 dark:border-violet-900/30 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 shadow-sm transition-all"
        />

        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 border border-stone-200 dark:border-stone-700">
            {totalResults} {totalResults === 1 ? 'Match' : 'Matches'}
          </span>
        </div>
      </div>

      {/* Filter Quick Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
        <span className="text-stone-400 flex items-center gap-1 pl-1">
          <Filter className="w-3 h-3" />
          <span>Filter:</span>
        </span>

        <button
          onClick={() => onSelectTag(null)}
          className={`px-2.5 py-1 rounded-lg transition-colors ${
            !selectedTag
              ? 'bg-violet-600 text-white font-medium shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          All
        </button>

        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelectTag(selectedTag === tag ? null : tag)}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              selectedTag === tag
                ? 'bg-violet-600 text-white font-medium shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
