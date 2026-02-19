
export enum AssessmentStatus {
  PLANNING = 'PLANNING',
  CONDUCTING = 'CONDUCTING',
  EVALUATING = 'EVALUATING',
  COMPLETED = 'COMPLETED'
}

export interface Assessment {
  id: string;
  name: string; // CA-1, CA-2, CA-3
  course: string;
  date: string;
  squad: string;
  status: AssessmentStatus;
  milestones: {
    questionPaperReceived: boolean; // T-7
    printed: boolean; // T-1
    conductReportSubmitted: boolean;
    scriptsUploaded: boolean;
    evaluationDone: boolean;
  };
}

export interface ConductReport {
  assessmentName: string;
  subjectName: string;
  isRegular: boolean;
  dateTime: string;
  totalStrength: number;
  presentCount: number;
  absentCount: number;
  absenteeNames: string[];
  malpractice: string;
  cmSignature: string;
  invigilatorSignature: string;
}

export interface GradingGuidance {
  questionNumber: number;
  maxMarks: number;
  steps: string[];
  awardedMarks: number;
  comments: string;
}
