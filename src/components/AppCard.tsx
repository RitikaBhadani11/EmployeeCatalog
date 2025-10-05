import React from 'react';
import { Star, Shield, Clock, Check, AlertCircle } from 'lucide-react';

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

interface AppCardProps {
  app: App;
  onSelect: (app: App) => void;
  variant?: 'list' | 'grid' | 'recommended';
}

export function AppCard({ app, onSelect, variant = 'list' }: AppCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Granted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
        return <Check size={12} />;
      case 'Pending':
        return <Clock size={12} />;
      case 'Granted':
        return <Check size={12} />;
      default:
        return <AlertCircle size={12} />;
    }
  };

  if (variant === 'grid') {
    return (
      <div
        onClick={() => onSelect(app)}
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="text-3xl">{app.icon}</div>
          <div className="space-y-1">
            <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{app.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{app.description}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400" size={12} fill="currentColor" />
            <span className="text-xs text-gray-600">{app.rating}</span>
          </div>
          <div className={`px-2 py-1 rounded-full border text-xs flex items-center space-x-1 ${getStatusColor(app.status)}`}>
            {getStatusIcon(app.status)}
            <span>{app.status}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(app)}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-2xl">
            {app.icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{app.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{app.description}</p>
              
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={14} fill="currentColor" />
                  <span className="text-sm text-gray-600">{app.rating}</span>
                  <span className="text-sm text-gray-400">({app.reviews})</span>
                </div>
                
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">{app.category}</span>
                
                {app.itApproved && (
                  <>
                    <span className="text-sm text-gray-400">•</span>
                    <div className="flex items-center space-x-1">
                      <Shield className="text-green-500" size={12} />
                      <span className="text-xs text-green-600">IT Approved</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <div className={`px-3 py-1 rounded-full border text-xs flex items-center space-x-1 ${getStatusColor(app.status)}`}>
                {getStatusIcon(app.status)}
                <span>{app.status}</span>
              </div>
              
              {variant === 'recommended' && (
                <div className="flex items-center space-x-1 text-xs text-blue-600">
                  <Star size={12} fill="currentColor" />
                  <span>Recommended</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}