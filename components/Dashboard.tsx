import React from 'react';
import { Assessment, AssessmentStatus } from '../types.ts';
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Printer, 
  Mail, 
  Scan, 
  BookOpenCheck,
  ClipboardCheck,
  UploadCloud,
  Database
} from 'lucide-react';

interface DashboardProps {
  assessments: Assessment[];
  onAction: (id: string, tab: 'dashboard' | 'conduct' | 'scanning' | 'evaluation' | 'finalize') => void;
}

const MilestoneDot = ({ active, label }: { active: boolean; label: string }) => (
  <div className="flex flex-col items-center gap-1 group relative">
    <div className={`w-3 h-3 rounded-full ${active ? 'bg-emerald-500' : 'bg-slate-200 border border-slate-300'}`} />
    <span className="text-[9px] text-slate-400 font-bold">{label}</span>
    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-20">
      {label} Milestone {active ? 'Completed' : 'Pending'}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: AssessmentStatus }) => {
  const styles = {
    [AssessmentStatus.PLANNING]: 'bg-slate-100 text-slate-600',
    [AssessmentStatus.CONDUCTING]: 'bg-indigo-100 text-indigo-700',
    [AssessmentStatus.EVALUATING]: 'bg-amber-100 text-amber-700',
    [AssessmentStatus.COMPLETED]: 'bg-emerald-100 text-emerald-700',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ assessments, onAction }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Mail size={20} />
            </div>
            <h3 className="font-semibold text-slate-700">T-7 Question Papers</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">2 Pending</p>
          <p className="text-xs text-slate-500 mt-1">Check email thread from Design Team</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Scan size={20} />
            </div>
            <h3 className="font-semibold text-slate-700">Evaluation Window</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">48 Hours Left</p>
          <p className="text-xs text-slate-500 mt-1">CA-1 Evaluation for Squad A</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Printer size={20} />
            </div>
            <h3 className="font-semibold text-slate-700">T-1 Printing Check</h3>
          </div>
          <p className="text-2xl font-bold text-slate-900">1 Assessment</p>
          <p className="text-xs text-slate-500 mt-1">Ready for CA-1 Squad A</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Ongoing & Upcoming Assessments</h2>
          <button className="text-sm text-indigo-600 font-semibold hover:underline">View All Records</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Assessment</th>
                <th className="px-6 py-4">Squad</th>
                <th className="px-6 py-4">Timeline Milestone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assessments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{a.name}</div>
                    <div className="text-xs text-slate-500">{a.course}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{a.squad}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <MilestoneDot active={a.milestones.questionPaperReceived} label="T-7" />
                      <MilestoneDot active={a.milestones.printed} label="T-1" />
                      <MilestoneDot active={a.milestones.conductReportSubmitted} label="T-0" />
                      <MilestoneDot active={a.milestones.evaluationDone} label="T+3" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onAction(a.id, 'conduct')}
                        className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                        title="Conduct Report"
                      >
                        <ClipboardCheck size={18} />
                      </button>
                      <button 
                        onClick={() => onAction(a.id, 'scanning')}
                        className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                        title="Upload Scripts"
                      >
                        <UploadCloud size={18} />
                      </button>
                      <button 
                        onClick={() => onAction(a.id, 'evaluation')}
                        className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                        title="Start AI Evaluation"
                      >
                        <BookOpenCheck size={18} />
                      </button>
                      <button 
                        onClick={() => onAction(a.id, 'finalize')}
                        className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors"
                        title="Marks Entry & Sign-off"
                      >
                        <Database size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;