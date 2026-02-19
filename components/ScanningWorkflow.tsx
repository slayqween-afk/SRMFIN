
import React, { useState } from 'react';
import { Assessment } from '../types';
// Import all necessary icons at the top level
import { 
  FileSearch, 
  CheckCircle, 
  Info, 
  UploadCloud, 
  Copy, 
  FileText,
  AlertTriangle 
} from 'lucide-react';

interface ScanningWorkflowProps {
  assessment: Assessment;
}

const ScanningWorkflow: React.FC<ScanningWorkflowProps> = ({ assessment }) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const namingFormat = "StudentName_CA1_ADVC.pdf";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Cast e.target.files to FileList and f to File to ensure 'name' property is accessible
      const names = Array.from(e.target.files as FileList).map((f: File) => f.name);
      setUploadedFiles(prev => [...prev, ...names]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Section 7: Scanning & Upload</h2>
        <p className="text-slate-500">Ensure combined single-PDFs for each student with proper naming.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <Info className="text-indigo-600 mt-1" size={20} />
              <div>
                <p className="text-sm font-bold text-indigo-900">Naming Convention Reminder</p>
                <code className="text-xs bg-white px-2 py-1 rounded border border-indigo-200 mt-2 block w-fit">
                  {namingFormat}
                </code>
                <button 
                  onClick={() => navigator.clipboard.writeText(namingFormat)}
                  className="mt-2 text-[10px] text-indigo-600 font-bold uppercase hover:underline flex items-center gap-1"
                >
                  <Copy size={10} /> Copy Format
                </button>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                <UploadCloud size={32} />
              </div>
              <p className="text-slate-600 font-semibold">Click to select files or drag and drop</p>
              <p className="text-xs text-slate-400 mt-1">Combine multiple pages into one PDF per student</p>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                id="file-upload" 
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="file-upload"
                className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold cursor-pointer hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Choose PDF Files
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Upload Status ({uploadedFiles.length}/44)</h3>
              <button className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Verify All</button>
            </div>
            <div className="p-4 space-y-2 max-h-[300px] overflow-y-auto">
              {uploadedFiles.length === 0 ? (
                <p className="text-center py-8 text-slate-400 text-sm">No files uploaded yet.</p>
              ) : (
                uploadedFiles.map((name, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-indigo-400" />
                      <span className="text-sm font-medium text-slate-700">{name}</span>
                    </div>
                    <CheckCircle size={16} className="text-emerald-500" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border border-slate-800">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <FileSearch size={18} className="text-indigo-400" />
              SOP Checklist
            </h3>
            <ul className="space-y-4">
              <ChecklistItem checked={true} label="Combine all pages (1 PDF/student)" />
              <ChecklistItem checked={false} label="Correct Naming Format" />
              <ChecklistItem checked={false} label="Scan Conduct Report (Section 6)" />
              <ChecklistItem checked={false} label="Email Notify (SOP Section 7.5)" />
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
             <div className="flex gap-3">
                <AlertTriangle size={20} className="text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-amber-900">Important</p>
                  <p className="text-xs text-amber-800 leading-relaxed mt-1">
                    Once uploaded, notify the design team via the existing email thread with the drive link and evaluation timelines.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChecklistItem = ({ checked, label }: { checked: boolean; label: string }) => (
  <li className="flex items-center gap-3 text-xs">
    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${checked ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600'}`}>
      {checked && <CheckCircle size={10} className="text-white" />}
    </div>
    <span className={checked ? 'text-slate-300 line-through' : 'text-slate-400'}>{label}</span>
  </li>
);

export default ScanningWorkflow;
