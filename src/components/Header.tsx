import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';

interface HeaderProps {
  currentScreen: string;
  onBack: () => void;
  userProfile: {
    name: string;
    department: string;
    avatar: string;
  };
  logo: string;
}

export function Header({ currentScreen, onBack, userProfile, logo }: HeaderProps) {
  const getTitle = () => {
    switch (currentScreen) {
      case 'catalog': return 'App Catalog';
      case 'appDetails': return 'App Details';
      case 'myApps': return 'My Apps';
      case 'requestFlow': return 'Request Access';
      case 'analytics': return 'Analytics';
      case 'bundles': return 'App Bundles';
      default: return 'Zluri';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {currentScreen !== 'catalog' && currentScreen !== 'myApps' && currentScreen !== 'analytics' && currentScreen !== 'bundles' ? (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            ) : (
              <img src={logo} alt="Zluri" className="h-8 w-auto" />
            )}
            
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{getTitle()}</h1>
              {currentScreen === 'catalog' && (
                <p className="text-sm text-gray-500">Discover and manage your apps</p>
              )}
              {currentScreen === 'analytics' && (
                <p className="text-sm text-gray-500">Track usage and app performance</p>
              )}
              {currentScreen === 'bundles' && (
                <p className="text-sm text-gray-500">Pre-configured app collections</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">2</span>
              </span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-900">{userProfile.name}</p>
                <p className="text-xs text-gray-500">{userProfile.department}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">R</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}