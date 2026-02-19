
import React, { useState } from 'react';
import { Assessment } from '../types';
import { Save, FileDown, UserCheck, AlertTriangle } from 'lucide-react';

interface ConductReportFormProps {
  assessment: Assessment;
}

const ConductReportForm: React.FC<ConductReportFormProps> = ({ assessment }) => {
  const [formData, setFormData] = useState({
    present: assessment.squad === 'Squad A' ? 42 : 0,
    absent: 2,
    absentees: 'John Doe, Jane Smith',
    malpractice: 'None',
    invigilator: '',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Part B: Conduct Report</h2>
          <p className="text-slate-500">SOP Section 6: Official One-Page Report</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-all font-medium">
            <Save size={18} />
            Save Draft
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all font-medium">
            <FileDown size={18} />
            Generate PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Subject</label>
            <p className="font-semibold text-slate-900 border-b border-slate-100 pb-2">{assessment.course}</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Assessment Instance</label>
            <p className="font-semibold text-slate-900 border-b border-slate-100 pb-2">{assessment.name}</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Date & Start Time</label>
            <p className="font-semibold text-slate-900 border-b border-slate-100 pb-2">{assessment.date} | 09:30 AM</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Squad Strength</label>
            <p className="font-semibold text-slate-900 border-b border-slate-100 pb-2">44 Students</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-xl">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">Present Count</label>
            <input 
              type="number" 
              value={formData.present}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">Absent Count</label>
            <input 
              type="number" 
              value={formData.absent}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
              <UserCheck size={16} className="text-slate-400" />
              Absentee Names (Comma separated)
            </label>
            <textarea 
              rows={2}
              value={formData.absentees}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="e.g. John Doe, Alice Bob"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              Malpractice Instances (if any)
            </label>
            <textarea 
              rows={3}
              value={formData.malpractice}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="Detailed description of malpractice or 'None'"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
           <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">Invigilator Signature (Name)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
              placeholder="Enter Full Name"
            />
            <p className="text-[10px] text-slate-400 font-medium uppercase">CM must verify signature on physical script</p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">CM Signature</label>
            <div className="w-full h-12 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 italic font-medium">
              Digital Identity Verified (Bineet - Program Delivery)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConductReportForm;
