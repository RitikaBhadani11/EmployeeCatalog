import React from 'react';
import { Package, Clock, CheckCircle, Star, Users, Code, Palette, Briefcase } from 'lucide-react';

interface AppBundle {
  id: string;
  name: string;
  description: string;
  appsIncluded: number;
  icon: React.ReactNode;
  color: string;
  setupTime: string;
  approved: number;
  recommendedFor: string[];
  includedApps: Array<{
    name: string;
    icon: string;
  }>;
  gradient: string;
}

interface AppBundlesScreenProps {
  onAppSelect: (app: any) => void;
  userDepartment: string;
}

const appBundles: AppBundle[] = [
  {
    id: 'engineering',
    name: 'Engineering Essentials',
    description: 'Core development tools and collaboration apps for engineering teams.',
    appsIncluded: 7,
    icon: <Code size={24} />,
    color: 'text-blue-600',
    setupTime: '15 minutes',
    approved: 4,
    recommendedFor: ['Software Engineer', 'DevOps Engineer', 'QA Engineer', 'Tech Lead'],
    includedApps: [
      { name: 'GitHub', icon: '💻' },
      { name: 'Jira', icon: '📊' },
      { name: 'Slack', icon: '💬' },
      { name: 'Zoom', icon: '📹' },
      { name: 'Linear', icon: '📈' },
      { name: 'VS Code', icon: '⚡' },
      { name: 'Docker', icon: '🐳' }
    ],
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'design',
    name: 'Design & Creative',
    description: 'Design tools and creative software for UI/UX designers and creative teams.',
    appsIncluded: 5,
    icon: <Palette size={24} />,
    color: 'text-purple-600',
    setupTime: '10 minutes',
    approved: 11,
    recommendedFor: ['UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Creative Director'],
    includedApps: [
      { name: 'Figma', icon: '🎨' },
      { name: 'Adobe CC', icon: '🎭' },
      { name: 'Sketch', icon: '✏️' },
      { name: 'Notion', icon: '📝' },
      { name: 'Miro', icon: '🔗' }
    ],
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'business',
    name: 'Business & Operations',
    description: 'Essential business tools for project management, communication, and productivity.',
    appsIncluded: 6,
    icon: <Briefcase size={24} />,
    color: 'text-green-600',
    setupTime: '12 minutes',
    approved: 4,
    recommendedFor: ['Project Manager', 'Business Analyst', 'Operations Manager', 'Team Lead'],
    includedApps: [
      { name: 'Asana', icon: '✅' },
      { name: 'Slack', icon: '💬' },
      { name: 'Google Workspace', icon: '📧' },
      { name: 'Zoom', icon: '📹' },
      { name: 'Salesforce', icon: '☁️' },
      { name: 'Tableau', icon: '📊' }
    ],
    gradient: 'from-green-500 to-emerald-600'
  }
];

export function AppBundlesScreen({ onAppSelect, userDepartment }: AppBundlesScreenProps) {
  const BundleCard = ({ bundle }: { bundle: AppBundle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${bundle.gradient} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              {bundle.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{bundle.name}</h3>
              <p className="text-sm text-white text-opacity-90">{bundle.appsIncluded} apps included</p>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-white text-opacity-90 leading-relaxed">
          {bundle.description}
        </p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Recommended for */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Recommended for:</h4>
          <div className="flex flex-wrap gap-2">
            {bundle.recommendedFor.map((role) => (
              <span 
                key={role} 
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Included Apps */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Included Apps:</h4>
          <div className="grid grid-cols-4 gap-3">
            {bundle.includedApps.slice(0, 6).map((app) => (
              <div key={app.name} className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                  {app.icon}
                </div>
                <span className="text-xs text-gray-600 text-center">{app.name}</span>
              </div>
            ))}
            {bundle.includedApps.length > 6 && (
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500">+{bundle.includedApps.length - 6}</span>
                </div>
                <span className="text-xs text-gray-500">more</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">Setup time: {bundle.setupTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-sm text-gray-600">{bundle.approved} IT approved</span>
          </div>
        </div>

        {/* Action Button */}
        <button 
          className={`w-full bg-gradient-to-r ${bundle.gradient} text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium`}
        >
          Request Bundle Access
        </button>
      </div>
    </div>
  );

  const welcomeUserDepartment = userDepartment === 'Engineering' ? 'Engineering' : 
                                userDepartment === 'Design' ? 'Design' : 'Business';

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Zluri!</h1>
        <p className="text-gray-600">Get started quickly with pre-selected app bundles tailored for your role</p>
      </div>

      {/* Recommended Bundle for User */}
      {userDepartment === 'Engineering' && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Star className="text-blue-600" size={20} fill="currentColor" />
            <h3 className="font-semibold text-blue-900">Recommended for You</h3>
          </div>
          <p className="text-blue-800 text-sm mb-3">
            Based on your role in {userDepartment}, we recommend the Engineering Essentials bundle.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            View Engineering Bundle
          </button>
        </div>
      )}

      {/* Bundle Categories */}
      <div className="space-y-6">
        {appBundles.map((bundle) => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>

      {/* Custom Bundle Option */}
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <Package className="text-gray-400 mx-auto mb-3" size={32} />
        <h3 className="font-semibold text-gray-900 mb-2">Need a Custom Bundle?</h3>
        <p className="text-gray-600 text-sm mb-4">
          Can't find the right combination? We can create a custom app bundle for your team.
        </p>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors">
          Request Custom Bundle
        </button>
      </div>

      {/* Bundle Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
          <Users className="text-blue-600 mx-auto mb-2" size={24} />
          <p className="text-xl font-semibold text-gray-900">250+</p>
          <p className="text-gray-600 text-sm">Users Onboarded</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
          <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
          <p className="text-xl font-semibold text-gray-900">98%</p>
          <p className="text-gray-600 text-sm">Success Rate</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200">
          <Clock className="text-purple-600 mx-auto mb-2" size={24} />
          <p className="text-xl font-semibold text-gray-900">12min</p>
          <p className="text-gray-600 text-sm">Avg Setup Time</p>
        </div>
      </div>
    </div>
  );
}