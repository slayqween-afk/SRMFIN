
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Assessment } from '../types';
import { BrainCircuit, Sparkles, Send, BookOpen, AlertCircle, RefreshCcw } from 'lucide-react';

interface AIEvaluationAssistantProps {
  assessment: Assessment;
}

const AIEvaluationAssistant: React.FC<AIEvaluationAssistantProps> = ({ assessment }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskAI = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `You are a Mathematics Assessment Evaluator for SRM Trichy's Advanced Calculus & Complex Analysis course. 
      SOP CONTEXT: Part B is descriptive, requiring intermediate steps and method-based marking. 
      Current Assessment: ${assessment.name}.
      Mentor Question: ${query}
      
      Please provide guidance based on mathematical logic and standard marking rubrics. Suggest marks breakdown if a student makes a logical transition but a calculation error.`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: 'You assist academic mentors in grading complex descriptive math papers. Be precise, fair, and focused on methodology over just final answers.'
        }
      });

      setResponse(result.text || 'No guidance generated.');
    } catch (err) {
      setError('Failed to reach AI Evaluator. Please check your connection.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Section 8: AI Evaluation Assistant</h2>
          <p className="text-slate-500 italic">"Method-based marking requires checking logical transitions."</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
          <Sparkles size={14} />
          POWERED BY GEMINI 3 FLASH
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <BrainCircuit size={18} className="text-indigo-600" />
                Marking Guidance Chat
              </h3>
              {response && (
                <button 
                  onClick={() => {setResponse(''); setQuery('');}}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                >
                  <RefreshCcw size={12} /> Clear
                </button>
              )}
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {response ? (
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 prose prose-slate max-w-none">
                  <div className="flex items-center gap-2 mb-4 text-indigo-600">
                    <Sparkles size={16} />
                    <span className="font-bold text-sm">Suggested Guidance</span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{response}</p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-12">
                  <BookOpen size={48} className="mb-4 opacity-20" />
                  <p className="text-sm">Describe a specific problem or a student's answer pattern to get suggested step-marking breakdown based on the SOP rubrics.</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 text-sm border border-red-100">
                  <AlertCircle size={18} /> {error}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                  placeholder="e.g. How to mark a student who solved the integration but used the wrong boundary values?"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleAskAI}
                  disabled={isLoading || !query.trim()}
                  className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md"
                >
                  {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" /> : <Send size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Manual Evaluation Rules</h3>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 shrink-0" />
                <span>Use RED pen or distinct color only. No blue/black or pencils.</span>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1 shrink-0" />
                <span>Awarded marks must be clearly written on the first page.</span>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1 shrink-0" />
                <span>Evaluator signature required immediately after total marks.</span>
              </li>
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1 shrink-0" />
                <span>Perform evaluation in a dedicated staff room (no students around).</span>
              </li>
            </ul>
          </div>

          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold mb-2">3-Day Window</h3>
            <p className="text-sm text-indigo-300 mb-4">Evaluation must be completed by Feb 19, 2026.</p>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[15%]" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-right uppercase font-bold tracking-wider">15% Time Elapsed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEvaluationAssistant;
