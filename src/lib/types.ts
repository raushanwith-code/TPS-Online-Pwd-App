export type UserRole = 'STUDENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  board: string;
  streakDays: number;
  lastActiveAt: string;
}

export interface Subject {
  id: string;
  name: string;
  hindiName: string;
  code: string;
  description: string;
  icon: string;
  accentColor: string;
  order: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  hindiTitle: string;
  chapterNum: number;
  description: string;
}

export interface Lecture {
  id: string;
  chapterId: string;
  title: string;
  hindiTitle?: string;
  description?: string;
  youtubeUrl: string;
  youtubeId: string;
  durationSec: number;
  thumbnailUrl?: string;
  order: number;
  completed?: boolean;
  lastPositionSec?: number;
}

export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE';

export interface Question {
  id: string;
  quizId: string;
  questionText: string;
  hindiText?: string;
  type: QuestionType;
  options: string[];
  correctOption: number;
  explanation?: string;
  hindiExpl?: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  chapterId?: string;
  title: string;
  hindiTitle?: string;
  description?: string;
  durationMins: number;
  passScore: number;
  questions?: Question[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  timeTakenSec: number;
  answers: Record<string, number>;
  createdAt: string;
}

export type NoteFileType = 'PDF' | 'DOCX' | 'PPTX' | 'XLSX' | 'ZIP';

export interface Note {
  id: string;
  subjectId: string;
  chapterId?: string;
  title: string;
  fileUrl: string;
  fileType: NoteFileType;
  fileSizeKb: number;
  downloads: number;
  createdAt: string;
}

export interface PersonalNote {
  id: string;
  userId: string;
  lectureId: string;
  timestamp: number;
  content: string;
  createdAt: string;
}
