import React from 'react';
import { Plus, UserPlus, FileText, Settings, Download, Upload } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    { icon: Plus, label: 'New Project', color: 'bg-navy hover:bg-navy/90 text-gold' },
    { icon: UserPlus, label: 'Add User', color: 'bg-gold hover:bg-gold/90 text-navy' },
    { icon: FileText, label: 'Generate Report', color: 'bg-navy hover:bg-navy/90 text-gold' },
    { icon: Download, label: 'Export Data', color: 'bg-gold hover:bg-gold/90 text-navy' },
    { icon: Upload, label: 'Import Data', color: 'bg-navy hover:bg-navy/90 text-gold' },
    { icon: Settings, label: 'Settings', color: 'bg-gold hover:bg-gold/90 text-navy' },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gold/20">
      <h3 className="text-lg font-semibold text-navy mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`flex min-w-0 items-center gap-2 sm:gap-3 p-3 rounded-lg transition-colors ${action.color}`}
            >
              <Icon size={18} className="shrink-0" />
              <span className="truncate text-xs sm:text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
