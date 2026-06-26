export interface UserInformation {
  name: string;
  email: string;
  profession: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Experienced';
  mainPlatform: string;
}

export type AuditCategory = 
  | 'brandClarity' 
  | 'trustCredibility' 
  | 'visualExperience' 
  | 'conversionSystem' 
  | 'growthFoundation';

export interface QuestionOption {
  label: string;
  points: number;
  recommendationIfChosen?: string;
}

export interface Question {
  id: string;
  category: AuditCategory;
  categoryName: string;
  title: string;
  subtitle?: string;
  type: 'choice' | 'checklist';
  options: QuestionOption[];
}

export interface AuditAnswers {
  [questionId: string]: number | number[]; // index for choice, array of indexes for checklist
}

export interface CategoryScores {
  brandClarity: number; // max 20
  trustCredibility: number; // max 20
  visualExperience: number; // max 20
  conversionSystem: number; // max 20
  growthFoundation: number; // max 20
}

export type ScoreTier = 
  | 'Digital Authority' 
  | 'Strong Foundation' 
  | 'Hidden Potential' 
  | 'Needs Strategic Refinement';

export interface RecommendationItem {
  category: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Critical';
  actionStep: string;
}

export interface GeminiInsight {
  executiveSummary: string;
  topBottleneck: string;
  quickWins: string[];
  strategyRoadmap: string;
}

export interface AuditReportData {
  id: string;
  userInfo: UserInformation;
  overallScore: number;
  categoryScores: CategoryScores;
  tier: ScoreTier;
  strengths: string[];
  weaknesses: string[];
  recommendations: RecommendationItem[];
  aiInsight: GeminiInsight | null;
  completedAt: string;
}
