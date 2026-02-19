import React, { useState } from 'react';
import { 
  Bell
} from 'lucide-react';
import { Assessment, AssessmentStatus } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import ConductReportForm from './components/ConductReportForm.tsx';
import ScanningWorkflow from './components/ScanningWorkflow.tsx';
import AIEvaluationAssistant from './components/AIEvaluationAssistant.tsx';
import MarksEntry from './components/MarksEntry.tsx';
import Sidebar from './components/Sidebar.tsx';

const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: '1',
    name: 'CA-1',
    course: 'Advanced Calculus & Complex Analysis',
    date: '2026-02-16',
    squad: 'Squad A',
    status: AssessmentStatus.EVALUATING,
    milestones: {
      questionPaperReceived: true,
      printed: true,
      conductReportSubmitted: true,
      scriptsUploaded: true,
      evaluationDone: false
    }
  },
  {
    id: '2',
    name: 'CA-2',
    course: 'Advanced Calculus & Complex Analysis',
    date: '2026-03-20',
    squad: 'Squad B',
    status: AssessmentStatus.PLANNING,
    milestones: {
      questionPaperReceived: false,
      printed: false,
      conductReportSubmitted: false,
      scriptsUploaded: false,
      evaluationDone: false
    }
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'conduct' | 'scanning' | 'evaluation' | 'finalize'>('dashboard');
  const [assessments] = useState<Assessment[]>(MOCK_ASSESSMENTS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectedAssessment = assessments[0]; 

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">SRM Trichy - Even Sem 2025-26</h1>
            <p className="text-sm text-slate-500">Part B (Descriptive Section) SOP Manager</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
              CM
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard assessments={assessments} onAction={(_id, tab) => setActiveTab(tab)} />
          )}
          {activeTab === 'conduct' && (
            <ConductReportForm assessment={selectedAssessment} />
          )}
          {activeTab === 'scanning' && (
            <ScanningWorkflow assessment={selectedAssessment} />
          )}
          {activeTab === 'evaluation' && (
            <AIEvaluationAssistant assessment={selectedAssessment} />
          )}
          {activeTab === 'finalize' && (
            <MarksEntry assessment={selectedAssessment} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;