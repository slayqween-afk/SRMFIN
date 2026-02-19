
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.API_KEY;

export const generateGradingHelp = async (questionText: string, studentAnswerDesc: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on a descriptive math rubric for Advanced Calculus, grade this scenario:
    Question: ${questionText}
    Student logic: ${studentAnswerDesc}
    
    Format the response as:
    1. Core Error identified
    2. Suggested step marks (e.g. 3/5)
    3. Reasoning for methodology deduction.`,
  });
  return response.text;
};
