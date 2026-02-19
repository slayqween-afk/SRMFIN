import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  UploadCloud, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Database
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggle }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'conduct', label: 'Conduct Report', icon: ClipboardCheck },
    { id: 'scanning', label: 'Scanning & Upload', icon: UploadCloud },
    { id: 'evaluation', label: 'AI Evaluation Help', icon: BookOpen },
    { id: 'finalize', label: 'Marks Entry', icon: Database },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col relative`}>
      <div className="p-6 font-bold text-xl overflow-hidden whitespace-nowrap border-b border-slate-800">
        {isOpen ? <span className="text-indigo-400">MATH</span> : <span className="text-indigo-400">M</span>}
        {isOpen && <span className="ml-2">SOP HUB</span>}
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all hover:bg-slate-800 ${
              activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-400'
            }`}
          >
            <item.icon size={20} />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <button 
        onClick={toggle}
        className="absolute bottom-4 right-[-12px] bg-indigo-600 rounded-full p-1 border-2 border-white shadow-lg"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="p-6 border-t border-slate-800 text-[10px] text-slate-500">
        {isOpen ? '© 2026 KALVIUM EDUCATION' : '©'}
      </div>
    </aside>
  );
};

export default Sidebar;