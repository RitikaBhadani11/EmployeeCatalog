import React, { useState } from 'react';
import { Search, Filter, Star, TrendingUp, Shield } from 'lucide-react';
import { AppCard } from './AppCard';

interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  department: string;
  rating: number;
  reviews: number;
  status: 'Available' | 'Pending' | 'Granted';
  popularity: number;
  itApproved: boolean;
}

interface Filters {
  departments: string[];
  roles: string[];
  categories: string[];
  status: string;
  popularity: string[];
  itApproval: string[];
}

interface CatalogScreenProps {
  apps: App[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onAppSelect: (app: App) => void;
  userDepartment: string;
}

export function CatalogScreen({
  apps,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  onAppSelect,
  userDepartment
}: CatalogScreenProps) {
  const [showFilters, setShowFilters] = useState(false);

  const recommendedApps = apps.filter(app => 
    app.department === userDepartment || 
    app.department === 'All' || 
    app.popularity > 85
  ).slice(0, 3);

  const popularApps = apps.filter(app => app.popularity > 80).slice(0, 4);

  const handleFilterChange = (key: keyof Filters, value: string | string[]) => {
    if (Array.isArray(value)) {
      onFiltersChange({ ...filters, [key]: value });
    } else {
      onFiltersChange({ ...filters, [key]: value });
    }
  };

  const handleCheckboxFilter = (filterType: 'departments' | 'roles' | 'popularity' | 'itApproval', value: string) => {
    const currentValues = filters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleFilterChange(filterType, newValues);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search apps..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-12 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg transition-colors ${
            showFilters ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Enhanced Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-4 max-h-96 overflow-y-auto">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          
          {/* Department Filter */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Department</h4>
            <div className="space-y-2">
              {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map((dept) => (
                <label key={dept} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.departments.includes(dept)}
                    onChange={() => handleCheckboxFilter('departments', dept)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Role</h4>
            <div className="space-y-2">
              {['Developer', 'Manager', 'Analyst', 'Designer', 'Admin'].map((role) => (
                <label key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.roles.includes(role)}
                    onChange={() => handleCheckboxFilter('roles', role)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Popularity Filter */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Popularity</h4>
            <div className="space-y-2">
              {['Most Popular', 'Trending', 'New Apps'].map((pop) => (
                <label key={pop} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.popularity.includes(pop)}
                    onChange={() => handleCheckboxFilter('popularity', pop)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{pop}</span>
                </label>
              ))}
            </div>
          </div>

          {/* IT Approval Filter */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">IT Approval</h4>
            <div className="space-y-2">
              {['IT Approved', 'Pending Approval', 'Not Required'].map((approval) => (
                <label key={approval} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.itApproval.includes(approval)}
                    onChange={() => handleCheckboxFilter('itApproval', approval)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{approval}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Category</h4>
            <div className="space-y-2">
              {['Communication', 'Productivity', 'Design', 'Development', 'Project Management'].map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCheckboxFilter('categories', category)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Access Status */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Access Status</h4>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Granted">Granted</option>
            </select>
          </div>

          <button
            onClick={() => onFiltersChange({ 
              departments: [], 
              roles: [], 
              categories: [], 
              status: 'All', 
              popularity: [], 
              itApproval: [] 
            })}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Recommended for You */}
      {!searchQuery && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
          </div>
          <div className="space-y-3">
            {recommendedApps.map((app) => (
              <AppCard key={app.id} app={app} onSelect={onAppSelect} variant="recommended" />
            ))}
          </div>
        </div>
      )}

      {/* Popular Apps */}
      {!searchQuery && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-green-500" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Popular Apps</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {popularApps.map((app) => (
              <AppCard key={app.id} app={app} onSelect={onAppSelect} variant="grid" />
            ))}
          </div>
        </div>
      )}

      {/* All Apps / Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {searchQuery ? `Search Results (${apps.length})` : 'All Apps'}
          </h2>
          {apps.length > 0 && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Shield size={16} />
              <span>IT Approved</span>
            </div>
          )}
        </div>
        
        {apps.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">🔍</div>
            <p className="text-gray-500">No apps found matching your criteria</p>
            <button
              onClick={() => onFiltersChange({ department: 'All', category: 'All', status: 'All', popularity: 'All' })}
              className="mt-2 text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} onSelect={onAppSelect} variant="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}