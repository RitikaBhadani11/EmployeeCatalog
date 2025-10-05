import React, { useState } from 'react';
import { Star, Shield, Users, Download, ExternalLink, Clock, Check, AlertCircle, ChevronRight } from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  icon: string;
  category: string;
  department: string;
  rating: number;
  reviews: number;
  status: 'Available' | 'Pending' | 'Granted';
  features: string[];
  screenshots: string[];
  popularity: number;
  itApproved: boolean;
}

interface AppDetailsScreenProps {
  app: App;
  onRequestAccess: (app: App) => void;
}

interface Review {
  id: string;
  user: string;
  department: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    user: 'Priya Sharma',
    department: 'Engineering',
    rating: 5,
    comment: 'Excellent tool for team collaboration. Makes our daily standups much more efficient.',
    date: '2 days ago'
  },
  {
    id: '2',
    user: 'Rahul Gupta',
    department: 'Product',
    rating: 4,
    comment: 'Great features and intuitive interface. Sometimes slow during peak hours.',
    date: '1 week ago'
  },
  {
    id: '3',
    user: 'Ananya Patel',
    department: 'Design',
    rating: 5,
    comment: 'Perfect for our design team. The integration with other tools is seamless.',
    date: '2 weeks ago'
  },
  {
    id: '4',
    user: 'Vikram Singh',
    department: 'Marketing',
    rating: 4,
    comment: 'Helpful for project management but has a learning curve for new users.',
    date: '3 weeks ago'
  }
];

export function AppDetailsScreen({ app, onRequestAccess }: AppDetailsScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'reviews' | 'features'>('overview');

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
        return <Check size={16} />;
      case 'Pending':
        return <Clock size={16} />;
      case 'Granted':
        return <Check size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const getButtonText = () => {
    switch (app.status) {
      case 'Available':
        return 'Request Access';
      case 'Pending':
        return 'Access Pending';
      case 'Granted':
        return 'Open App';
      default:
        return 'Request Access';
    }
  };

  const getButtonAction = () => {
    if (app.status === 'Available') {
      onRequestAccess(app);
    } else if (app.status === 'Granted') {
      // Would open the app in real implementation
      console.log('Opening app:', app.name);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="p-4 space-y-6">
      {/* App Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-3xl">
            {app.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{app.name}</h1>
                <p className="text-gray-600 mt-1">{app.description}</p>
                
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={16} fill="currentColor" />
                    <span className="font-medium text-gray-900">{app.rating}</span>
                    <span className="text-gray-500">({app.reviews} reviews)</span>
                  </div>
                  
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{app.category}</span>
                  
                  {app.itApproved && (
                    <>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center space-x-1">
                        <Shield className="text-green-500" size={14} />
                        <span className="text-green-600 text-sm">IT Approved</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className={`px-3 py-2 rounded-lg border flex items-center space-x-2 ${getStatusColor(app.status)}`}>
                {getStatusIcon(app.status)}
                <span className="font-medium">{app.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={getButtonAction}
            disabled={app.status === 'Pending'}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
              app.status === 'Pending'
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : app.status === 'Granted'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {getButtonText()}
          </button>
          
          {app.status === 'Pending' && (
            <p className="text-center text-gray-500 text-sm mt-2">
              Your request is being reviewed by IT
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
          <Users className="text-blue-500 mx-auto mb-2" size={24} />
          <p className="text-2xl font-semibold text-gray-900">{app.popularity}%</p>
          <p className="text-gray-500 text-sm">Adoption Rate</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
          <Star className="text-yellow-500 mx-auto mb-2" size={24} />
          <p className="text-2xl font-semibold text-gray-900">{app.rating}</p>
          <p className="text-gray-500 text-sm">Average Rating</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
          <Download className="text-green-500 mx-auto mb-2" size={24} />
          <p className="text-2xl font-semibold text-gray-900">{app.reviews}</p>
          <p className="text-gray-500 text-sm">Reviews</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'features', label: 'Features' },
            { id: 'reviews', label: 'Reviews' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{app.fullDescription}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Department</h3>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {app.department}
                </span>
              </div>
            </div>
          )}

          {selectedTab === 'features' && (
            <div className="space-y-3">
              {app.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.user}</h4>
                      <p className="text-sm text-gray-500">{review.department} • {review.date}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
              
              <button className="w-full py-2 text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center space-x-1">
                <span>View all reviews</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}