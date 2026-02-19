import React, { useState } from 'react';
import { Assessment } from '../types.ts';
import { 
  Table, 
  Lock, 
  Unlock, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  ShieldCheck
} from 'lucide-react';

interface StudentMark {
  id: string;
  name: string;
  email: string;
  partA: number; // MCQ (Fetched)
  partB: number; // Descriptive (Entered)
}

const MOCK_STUDENTS: StudentMark[] = [
  { id: 'U25MA001', name: 'Arjun Reddy', email: 'arjun.r@srm.edu', partA: 24, partB: 15 },
  { id: 'U25MA002', name: 'Bhavana K.', email: 'bhavana.k@srm.edu', partA: 28, partB: 18 },
  { id: 'U25MA003', name: 'Cyrus Mistry', email: 'cyrus.m@srm.edu', partA: 19, partB: 12 },
  { id: 'U25MA004', name: 'Divya S.', email: 'divya.s@srm.edu', partA: 30, partB: 20 },
  { id: 'U25MA005', name: 'Eshwar P.', email: 'eshwar.p@srm.edu', partA: 15, partB: 8 },
];

interface MarksEntryProps {
  assessment: Assessment;
}

const MarksEntry: React.FC<MarksEntryProps> = ({ assessment }) => {
  const [marks, setMarks] = useState<StudentMark[]>(MOCK_STUDENTS);
  const [isLocked, setIsLocked] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleMarkChange = (id: string, value: string) => {
    if (isLocked) return;
    const numValue = Math.min(20, Math.max(0, parseInt(value) || 0));
    setMarks(prev => prev.map(m => m.id === id ? { ...m, partB: numValue } : m));
  };

  const handleLock = () => {
    setIsLocked(true);
    setShowConfirm(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Section 9 & 10: Marks Entry & Sign-off</h2>
          <p className="text-slate-500">Final Workbook: Single Source of Truth for University Submission</p>
        </div>
        <div className="flex gap-3">
          {isLocked ? (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200 font-bold animate-in fade-in zoom-in duration-300">
              <ShieldCheck size={18} />
              WORKBOOK LOCKED
            </div>
          ) : (
            <button 
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all font-bold shadow-lg"
            >
              <Lock size={18} />
              Finalize & Sign-off
            </button>
          )}
          <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-all font-medium">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl flex items-center justify-between mb-6 shadow-sm animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-full text-amber-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="font-bold text-amber-900">Are you sure you want to lock the workbook?</p>
              <p className="text-sm text-amber-700">Once locked, further edits are prevented as per SOP Section 9.3.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-slate-600 font-medium hover:underline">Cancel</button>
            <button onClick={handleLock} className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-amber-700 transition-all">Confirm Sign-off</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-slate-600">
          <FileSpreadsheet size={18} />
          <span className="text-sm font-bold uppercase tracking-wider">{assessment.squad} - {assessment.name} Marks Ledger</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
              <th className="px-6 py-4">University ID</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4 bg-indigo-50/30">Part A (MCQ /30)</th>
              <th className="px-6 py-4 bg-indigo-50/50">Part B (Desc /20)</th>
              <th className="px-6 py-4 font-black text-slate-900">Total (/50)</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {marks.map((student) => (
              <tr key={student.id} className={`hover:bg-slate-50/50 transition-colors ${isLocked ? 'opacity-90' : ''}`}>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">{student.id}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800 text-sm">{student.name}</div>
                  <div className="text-[10px] text-slate-400">{student.email}</div>
                </td>
                <td className="px-6 py-4 bg-indigo-50/10">
                  <span className="font-bold text-indigo-600">{student.partA}</span>
                  <span className="text-[10px] text-slate-400 ml-1">Synced</span>
                </td>
                <td className="px-6 py-4 bg-indigo-50/20">
                  <input 
                    type="number"
                    value={student.partB}
                    disabled={isLocked}
                    onChange={(e) => handleMarkChange(student.id, e.target.value)}
                    className={`w-16 px-2 py-1 rounded border font-bold text-center ${
                      isLocked 
                        ? 'bg-slate-100 border-slate-200 text-slate-500' 
                        : 'bg-white border-indigo-200 focus:ring-2 focus:ring-indigo-500 outline-none text-indigo-700'
                    }`}
                  />
                </td>
                <td className="px-6 py-4">
                  <span className={`text-lg font-black ${student.partA + student.partB < 25 ? 'text-red-500' : 'text-slate-900'}`}>
                    {student.partA + student.partB}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {student.partB > 0 ? (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    ) : (
                      <AlertCircle size={16} className="text-amber-500" />
                    )}
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      {student.partB > 0 ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg border border-indigo-800">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Lock size={18} className="text-indigo-400" />
            Compliance Rule 10.1
          </h3>
          <p className="text-sm text-indigo-200 leading-relaxed italic">
            "Once finalized, scripts can be shared with students via the subject mentor only for a 30-minute window to verify evaluation. Any deviations must be reported in the official email thread."
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Signatory Authority</p>
            <p className="text-lg font-bold text-slate-800 mt-1">Bineet - Program Delivery</p>
            <p className="text-xs text-slate-400 mt-1">Final Authorization for {assessment.squad}</p>
          </div>
          <div className="w-24 h-24 bg-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 font-bold text-[10px] text-center p-2">
            Digital Signature Stamp
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarksEntry;