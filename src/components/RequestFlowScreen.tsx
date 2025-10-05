import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, FileText, Send, ArrowRight } from 'lucide-react';

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
  features: string[];
  screenshots: string[];
  popularity: number;
  itApproved: boolean;
}

interface RequestFlowScreenProps {
  app: App;
  onComplete: () => void;
}

export function RequestFlowScreen({ app, onComplete }: RequestFlowScreenProps) {
  const [currentStep, setCurrentStep] = useState<'form' | 'confirmation' | 'success'>('form');
  const [formData, setFormData] = useState({
    businessJustification: '',
    urgency: 'Medium',
    projectName: '',
    expectedUsers: '1-5',
    department: 'Engineering',
    additionalNotes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitRequest = () => {
    setCurrentStep('confirmation');
    // Simulate processing
    setTimeout(() => {
      setCurrentStep('success');
    }, 2000);
  };

  const handleComplete = () => {
    onComplete();
  };

  const itNotes = [
    "This app requires admin approval due to data access permissions",
    "IT security review typically takes 2-3 business days",
    "You'll receive email notifications about your request status"
  ];

  if (currentStep === 'success') {
    return (
      <div className="p-4">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Submitted Successfully!</h2>
          
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center text-lg">
                {app.icon}
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900">{app.name}</h3>
                <p className="text-sm text-gray-600">Access request submitted</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-blue-500" />
              <span>Expected approval time: 2-3 business days</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText size={16} className="text-blue-500" />
              <span>Request ID: REQ-{Date.now().toString().slice(-6)}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleComplete}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to My Apps
            </button>
            <button
              onClick={() => window.history.back()}
              className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'confirmation') {
    return (
      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Clock className="text-blue-600" size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Processing Your Request...</h2>
            <p className="text-gray-600 mt-2">Please wait while we submit your access request</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Validating request details</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Sending to IT approval queue</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span className="text-gray-500">Generating confirmation</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* App Info */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-2xl">
            {app.icon}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{app.name}</h2>
            <p className="text-gray-600">{app.description}</p>
          </div>
        </div>
      </div>

      {/* Request Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Access Request Details</h3>
        
        {/* Business Justification */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Justification *
          </label>
          <textarea
            value={formData.businessJustification}
            onChange={(e) => handleInputChange('businessJustification', e.target.value)}
            placeholder="Please explain why you need access to this app and how it will help your work..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project/Team Name
          </label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            placeholder="e.g., Mobile App Development, Q4 Marketing Campaign"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level
            </label>
            <select
              value={formData.urgency}
              onChange={(e) => handleInputChange('urgency', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Users
            </label>
            <select
              value={formData.expectedUsers}
              onChange={(e) => handleInputChange('expectedUsers', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1-5">1-5 users</option>
              <option value="6-10">6-10 users</option>
              <option value="11-25">11-25 users</option>
              <option value="25+">25+ users</option>
            </select>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            placeholder="Any additional information that might help with the approval process..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* IT Notes */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="text-blue-600 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">IT Review Process</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              {itNotes.map((note, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitRequest}
        disabled={!formData.businessJustification.trim()}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
      >
        <Send size={20} />
        <span>Submit Access Request</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}