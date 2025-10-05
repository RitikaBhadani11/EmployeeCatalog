import React, { useState } from 'react';
import { Search, Filter, ArrowLeft, Home, User, Grid3X3, BarChart3, Package } from 'lucide-react';
import { CatalogScreen } from './components/CatalogScreen';
import { AppDetailsScreen } from './components/AppDetailsScreen';
import { MyAppsScreen } from './components/MyAppsScreen';
import { RequestFlowScreen } from './components/RequestFlowScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { AppBundlesScreen } from './components/AppBundlesScreen';
import { Header } from './components/Header';
import zluriLogo from 'figma:asset/598003827e2259a93b44cd4ee3eaa11d8568a604.png';

type Screen = 'catalog' | 'appDetails' | 'myApps' | 'requestFlow' | 'analytics' | 'bundles';

interface AppData {
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

const mockApps: AppData[] = [
  {
    id: '1',
    name: 'Slack',
    description: 'Team communication and collaboration',
    fullDescription: 'Slack is a business communication platform offering many IRC-style features, including persistent chat rooms organized by topic, private groups, and direct messaging.',
    icon: '💬',
    category: 'Communication',
    department: 'All',
    rating: 4.5,
    reviews: 1250,
    status: 'Granted',
    features: ['Real-time messaging', 'File sharing', 'Video calls', 'Integrations'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 95,
    itApproved: true
  },
  {
    id: '2',
    name: 'Figma',
    description: 'Collaborative design and prototyping tool',
    fullDescription: 'Figma is a vector graphics editor and primarily web-based prototyping tool, with additional offline features enabled by desktop applications.',
    icon: '🎨',
    category: 'Design',
    department: 'Engineering',
    rating: 4.7,
    reviews: 890,
    status: 'Available',
    features: ['Real-time collaboration', 'Vector editing', 'Prototyping', 'Design systems'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 82,
    itApproved: true
  },
  {
    id: '3',
    name: 'Jira',
    description: 'Issue tracking and project management tool',
    fullDescription: 'Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management.',
    icon: '📊',
    category: 'Project Management',
    department: 'Engineering',
    rating: 4.2,
    reviews: 654,
    status: 'Available',
    features: ['Issue tracking', 'Agile boards', 'Reporting', 'Workflow automation'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 79,
    itApproved: true
  },
  {
    id: '4',
    name: 'GitHub',
    description: 'Code hosting and version control platform',
    fullDescription: 'GitHub is a provider of Internet hosting for software development and version control using Git. It offers distributed version control and source code management functionality.',
    icon: '💻',
    category: 'Development',
    department: 'Engineering',
    rating: 4.6,
    reviews: 743,
    status: 'Granted',
    features: ['Version control', 'Code collaboration', 'Issue tracking', 'CI/CD'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 92,
    itApproved: true
  },
  {
    id: '5',
    name: 'Linear',
    description: 'Modern issue tracking and project management',
    fullDescription: 'Linear is a purpose-built tool for modern software development, offering fast issue tracking and project management.',
    icon: '📈',
    category: 'Project Management',
    department: 'Engineering',
    rating: 4.8,
    reviews: 234,
    status: 'Available',
    features: ['Fast issue tracking', 'Sprint planning', 'Roadmaps', 'Integrations'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 85,
    itApproved: true
  },
  {
    id: '6',
    name: 'Zoom',
    description: 'Video conferencing solution',
    fullDescription: 'Zoom is a communications technology company that provides video telephony and online chat services through a cloud-based peer-to-peer software platform.',
    icon: '📹',
    category: 'Communication',
    department: 'All',
    rating: 4.3,
    reviews: 1120,
    status: 'Available',
    features: ['HD video meetings', 'Screen sharing', 'Recording', 'Breakout rooms'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 88,
    itApproved: true
  },
  {
    id: '7',
    name: 'Notion',
    description: 'All-in-one workspace',
    fullDescription: 'Notion is a note-taking software and collaboration platform with markdown support that also integrates tasks, wikis, and databases.',
    icon: '📝',
    category: 'Productivity',
    department: 'All',
    rating: 4.4,
    reviews: 987,
    status: 'Available',
    features: ['Note-taking', 'Database management', 'Task tracking', 'Wiki creation'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 76,
    itApproved: true
  },
  {
    id: '8',
    name: 'Asana',
    description: 'Team project management',
    fullDescription: 'Asana is a web and mobile application designed to help teams organize, track, and manage their work.',
    icon: '✅',
    category: 'Project Management',
    department: 'All',
    rating: 4.3,
    reviews: 567,
    status: 'Available',
    features: ['Task management', 'Team collaboration', 'Timeline view', 'Custom fields'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 73,
    itApproved: true
  },
  {
    id: '9',
    name: 'Adobe Creative Cloud',
    description: 'Creative software suite',
    fullDescription: 'Adobe Creative Cloud is a set of applications and services from Adobe Inc. that gives subscribers access to a collection of software.',
    icon: '🎭',
    category: 'Design',
    department: 'Marketing',
    rating: 4.5,
    reviews: 432,
    status: 'Pending',
    features: ['Photoshop', 'Illustrator', 'InDesign', 'After Effects'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 68,
    itApproved: false
  },
  {
    id: '10',
    name: 'Salesforce',
    description: 'CRM and sales platform',
    fullDescription: 'Salesforce is a cloud-based software company that provides customer-relationship management service.',
    icon: '☁️',
    category: 'Sales',
    department: 'Sales',
    rating: 4.2,
    reviews: 890,
    status: 'Available',
    features: ['Lead management', 'Sales tracking', 'Analytics', 'Automation'],
    screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
    popularity: 81,
    itApproved: true
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('catalog');
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    departments: [] as string[],
    roles: [] as string[],
    categories: [] as string[],
    status: 'All',
    popularity: [] as string[],
    itApproval: [] as string[]
  });

  const handleAppSelect = (app: AppData) => {
    setSelectedApp(app);
    setCurrentScreen('appDetails');
  };

  const handleRequestAccess = (app: AppData) => {
    setSelectedApp(app);
    setCurrentScreen('requestFlow');
  };

  const handleBackNavigation = () => {
    if (currentScreen === 'appDetails' || currentScreen === 'requestFlow') {
      setCurrentScreen('catalog');
    }
  };

  const filteredApps = mockApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filters.departments.length === 0 || filters.departments.includes(app.department) || app.department === 'All';
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(app.category);
    const matchesStatus = filters.status === 'All' || app.status === filters.status;
    
    return matchesSearch && matchesDepartment && matchesCategory && matchesStatus;
  });

  const userProfile = {
    name: 'Ritika Bhadani',
    department: 'Engineering',
    avatar: '👤'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Header 
        currentScreen={currentScreen}
        onBack={handleBackNavigation}
        userProfile={userProfile}
        logo={zluriLogo}
      />

      {/* Main Content */}
      <main className="pb-20">
        {currentScreen === 'catalog' && (
          <CatalogScreen
            apps={filteredApps}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            onAppSelect={handleAppSelect}
            userDepartment={userProfile.department}
          />
        )}

        {currentScreen === 'appDetails' && selectedApp && (
          <AppDetailsScreen
            app={selectedApp}
            onRequestAccess={handleRequestAccess}
          />
        )}

        {currentScreen === 'myApps' && (
          <MyAppsScreen
            apps={mockApps}
            userDepartment={userProfile.department}
            onAppSelect={handleAppSelect}
          />
        )}

        {currentScreen === 'requestFlow' && selectedApp && (
          <RequestFlowScreen
            app={selectedApp}
            onComplete={() => setCurrentScreen('myApps')}
          />
        )}

        {currentScreen === 'analytics' && (
          <AnalyticsScreen />
        )}

        {currentScreen === 'bundles' && (
          <AppBundlesScreen
            onAppSelect={handleAppSelect}
            userDepartment={userProfile.department}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen('catalog')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              currentScreen === 'catalog' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Grid3X3 size={18} />
            <span className="text-xs mt-1">Catalog</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('bundles')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              currentScreen === 'bundles' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Package size={18} />
            <span className="text-xs mt-1">Bundles</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('analytics')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              currentScreen === 'analytics' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <BarChart3 size={18} />
            <span className="text-xs mt-1">Analytics</span>
          </button>
          
          <button
            onClick={() => setCurrentScreen('myApps')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
              currentScreen === 'myApps' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <User size={18} />
            <span className="text-xs mt-1">My Apps</span>
          </button>
        </div>
      </nav>
    </div>
  );
}