import React from 'react';
import { Clock, CheckCircle, Star, TrendingUp, Plus } from 'lucide-react';
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

interface MyAppsScreenProps {
  apps: App[];
  userDepartment: string;
  onAppSelect: (app: App) => void;
}

export function MyAppsScreen({ apps, userDepartment, onAppSelect }: MyAppsScreenProps) {
  const grantedApps = apps.filter(app => app.status === 'Granted');
  const pendingApps = apps.filter(app => app.status === 'Pending');
  const suggestedApps = apps.filter(app => 
    app.status === 'Available' && 
    (app.department === userDepartment || app.department === 'All') &&
    app.popularity > 80
  ).slice(0, 4);

  const StatCard = ({ icon, title, count, color }: { icon: React.ReactNode, title: string, count: number, color: string }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900">{count}</p>
          <p className="text-gray-600 text-sm">{title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<CheckCircle className="text-green-600" size={24} />}
          title="Active Apps"
          count={grantedApps.length}
          color="bg-green-100"
        />
        <StatCard
          icon={<Clock className="text-yellow-600" size={24} />}
          title="Pending Requests"
          count={pendingApps.length}
          color="bg-yellow-100"
        />
      </div>

      {/* My Active Apps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">My Active Apps</h2>
          {grantedApps.length > 0 && (
            <span className="text-sm text-gray-500">{grantedApps.length} apps</span>
          )}
        </div>

        {grantedApps.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200">
            <div className="text-gray-400 text-4xl mb-4">📱</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Apps</h3>
            <p className="text-gray-500 mb-4">You don't have any approved apps yet. Browse the catalog to get started.</p>
            <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={16} />
              <span>Browse Catalog</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {grantedApps.map((app) => (
              <div key={app.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-2xl">
                    {app.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-500">{app.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Active</span>
                      <span className="text-xs text-gray-500">Last used: 2 hours ago</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onAppSelect(app)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Requests */}
      {pendingApps.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Pending Requests</h2>
          <div className="space-y-3">
            {pendingApps.map((app) => (
              <div key={app.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl flex items-center justify-center text-2xl">
                    {app.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-500">{app.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock size={14} className="text-yellow-500" />
                      <span className="text-xs text-yellow-600">Awaiting IT approval</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">Requested 2 days ago</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      Pending
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Apps */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Suggested for You</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {suggestedApps.map((app) => (
            <AppCard key={app.id} app={app} onSelect={onAppSelect} variant="grid" />
          ))}
        </div>
        
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center space-x-1 mx-auto">
            <span>View more suggestions</span>
            <TrendingUp size={16} />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Need a specific app?</h3>
        <p className="text-blue-100 mb-4">Can't find what you're looking for? Request a custom app evaluation.</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
          Request Custom App
        </button>
      </div>
    </div>
  );
}