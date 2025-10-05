import React from 'react';
import { TrendingUp, TrendingDown, Users, Download, Activity, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const usageData = [
  { month: 'Jul', downloads: 28 },
  { month: 'Aug', downloads: 32 },
  { month: 'Sep', downloads: 28 },
  { month: 'Oct', downloads: 35 },
  { month: 'Nov', downloads: 39 },
  { month: 'Dec', downloads: 45 }
];

const topAppsData = [
  { name: 'Slack', downloads: 245, color: '#3B82F6' },
  { name: 'GitHub', downloads: 198, color: '#10B981' },
  { name: 'Figma', downloads: 167, color: '#8B5CF6' },
  { name: 'Zoom', downloads: 142, color: '#F59E0B' },
  { name: 'Notion', downloads: 128, color: '#EF4444' }
];

const departmentData = [
  { department: 'Engineering', apps: 12, usage: 85 },
  { department: 'Design', apps: 8, usage: 72 },
  { department: 'Marketing', apps: 6, usage: 68 },
  { department: 'Sales', apps: 5, usage: 45 },
  { department: 'HR', apps: 4, usage: 38 }
];

export function AnalyticsScreen() {
  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    trend, 
    trendValue,
    color = 'text-blue-600'
  }: {
    title: string;
    value: string;
    subtitle: string;
    icon: any;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-1">{value}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-2 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
          <Icon size={20} className={color} />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center mt-3">
          {trend === 'up' ? (
            <TrendingUp size={14} className="text-green-500 mr-1" />
          ) : (
            <TrendingDown size={14} className="text-red-500 mr-1" />
          )}
          <span className={`text-xs ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendValue}
          </span>
          <span className="text-xs text-gray-400 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Usage Analytics Header */}
      <div className="flex items-center space-x-2">
        <Activity className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold text-gray-900">Usage Analytics</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          title="Daily Active Users"
          value="1250"
          subtitle="Average daily usage"
          icon={Users}
          trend="up"
          trendValue="+12%"
          color="text-blue-600"
        />
        <StatCard
          title="Weekly Active"
          value="1400"
          subtitle="Users this week"
          icon={Activity}
          trend="up"
          trendValue="+8%"
          color="text-green-600"
        />
        <StatCard
          title="Monthly Active"
          value="1500"
          subtitle="Total monthly users"
          icon={Clock}
          trend="up"
          trendValue="+15%"
          color="text-purple-600"
        />
      </div>

      {/* Download Growth Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Download Growth</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Downloads</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: any) => [`${value} downloads`, 'Downloads']}
              />
              <Line 
                type="monotone" 
                dataKey="downloads" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-green-600" size={16} />
              <span className="text-sm text-green-700 font-medium">45</span>
            </div>
            <p className="text-xs text-green-600 mt-1">Downloads this month</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Download className="text-blue-600" size={16} />
              <span className="text-sm text-blue-700 font-medium">1,580</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Total downloads</p>
          </div>
        </div>
      </div>

      {/* Top Apps */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Downloaded Apps</h3>
        <div className="space-y-3">
          {topAppsData.map((app, index) => (
            <div key={app.name} className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{app.name}</span>
                  <span className="text-sm text-gray-600">{app.downloads}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(app.downloads / 250) * 100}%`,
                      backgroundColor: app.color
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Usage */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage by Department</h3>
        <div className="space-y-4">
          {departmentData.map((dept) => (
            <div key={dept.department} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{dept.department}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">{dept.apps} apps</span>
                  <span className="text-sm text-gray-900">{dept.usage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dept.usage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">Quick Insights</h3>
        <div className="space-y-2 text-sm">
          <p className="text-blue-100">• Engineering team has the highest app adoption rate at 85%</p>
          <p className="text-blue-100">• Slack remains the most popular app with 245 downloads</p>
          <p className="text-blue-100">• Overall app usage increased by 15% this month</p>
          <p className="text-blue-100">• 3 new apps were approved for company-wide use</p>
        </div>
      </div>
    </div>
  );
}