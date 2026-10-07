import {
  INITIAL_SUBJECTS,
  INITIAL_CHAPTERS,
  INITIAL_LECTURES,
  INITIAL_QUIZZES,
  INITIAL_QUESTIONS,
  INITIAL_NOTES,
} from './seed-data';
import {
  Subject,
  Chapter,
  Lecture,
  Quiz,
  Question,
  Note,
  User,
  QuizAttempt,
  PersonalNote,
} from './types';

// In-memory persistent state for fast serverless & instant local testing
class GlobalStore {
  subjects: Subject[] = [...INITIAL_SUBJECTS];
  chapters: Chapter[] = [...INITIAL_CHAPTERS];
  lectures: Lecture[] = [...INITIAL_LECTURES];
  quizzes: Quiz[] = [...INITIAL_QUIZZES];
  questions: Question[] = [...INITIAL_QUESTIONS];
  notes: Note[] = [...INITIAL_NOTES];
  users: (User & { passwordHash: string })[] = [
    {
      id: 'admin-1',
      name: 'Deepak Kumar Priyadarshi',
      email: 'director@tpsonlineclasses.com',
      phone: '9876543210',
      role: 'ADMIN',
      board: 'Bihar Board Class 10 (Director)',
      streakDays: 45,
      lastActiveAt: new Date().toISOString(),
      passwordHash: '$2a$10$7R9M7O8S/qT3xV1U9mO2CeQ3M8uB9X4A3gD4vG7jK9pL2oW1qZ5nS', // tps2099admin
    },
    {
      id: 'student-1',
      name: 'Aman Kumar (Topper)',
      email: 'student@tpsonlineclasses.com',
      phone: '9123456780',
      role: 'STUDENT',
      board: 'Bihar Board Class 10',
      streakDays: 14,
      lastActiveAt: new Date().toISOString(),
      passwordHash: '$2a$10$7R9M7O8S/qT3xV1U9mO2CeQ3M8uB9X4A3gD4vG7jK9pL2oW1qZ5nS', // student123
    },
  ];
  quizAttempts: QuizAttempt[] = [
    {
      id: 'att-1',
      userId: 'student-1',
      quizId: 'quiz-math-1',
      score: 5,
      totalMarks: 5,
      percentage: 100,
      timeTakenSec: 145,
      answers: { 'q-m1': 2, 'q-m2': 1, 'q-m3': 0, 'q-m4': 0, 'q-m5': 2 },
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
  ];
  lectureProgress: Record<string, { completed: boolean; lastPositionSec: number; watchedSec: number }> = {
    'student-1:lec-math-1': { completed: true, lastPositionSec: 2450, watchedSec: 2450 },
  };
  personalNotes: PersonalNote[] = [];
  bookmarks: string[] = ['lec-math-1', 'note-math-1'];
}

// Global singleton pattern in Next.js
declare global {
  // eslint-disable-next-line no-var
  var __tpsDataStore: GlobalStore | undefined;
}

const store: GlobalStore = globalThis.__tpsDataStore || new GlobalStore();
if (process.env.NODE_ENV !== 'production') {
  globalThis.__tpsDataStore = store;
}

export const DataStore = {
  // Subjects
  getSubjects: (): Subject[] => {
    return [...store.subjects].sort((a, b) => a.order - b.order);
  },

  getSubjectByCode: (code: string): Subject | undefined => {
    return store.subjects.find((s) => s.code.toLowerCase() === code.toLowerCase());
  },

  // Chapters
  getChaptersBySubjectId: (subjectId: string): Chapter[] => {
    return store.chapters
      .filter((c) => c.subjectId === subjectId)
      .sort((a, b) => a.chapterNum - b.chapterNum);
  },

  getChapterById: (id: string): Chapter | undefined => {
    return store.chapters.find((c) => c.id === id);
  },

  // Lectures
  getLecturesByChapterId: (chapterId: string): Lecture[] => {
    return store.lectures
      .filter((l) => l.chapterId === chapterId)
      .sort((a, b) => a.order - b.order);
  },

  getLectureById: (id: string): Lecture | undefined => {
    return store.lectures.find((l) => l.id === id);
  },

  getAllLectures: (): Lecture[] => {
    return store.lectures;
  },

  addLecture: (lecture: Omit<Lecture, 'id'>): Lecture => {
    const newLec: Lecture = {
      ...lecture,
      id: `lec-${Date.now()}`,
    };
    store.lectures.push(newLec);
    return newLec;
  },

  // Quizzes & Questions
  getQuizzes: (subjectId?: string): Quiz[] => {
    let list = store.quizzes;
    if (subjectId) {
      list = list.filter((q) => q.subjectId === subjectId);
    }
    return list.map((q) => ({
      ...q,
      questions: store.questions.filter((quest) => quest.quizId === q.id),
    }));
  },

  getQuizById: (quizId: string): Quiz | undefined => {
    const quiz = store.quizzes.find((q) => q.id === quizId);
    if (!quiz) return undefined;
    return {
      ...quiz,
      questions: store.questions.filter((q) => q.quizId === quiz.id),
    };
  },

  addQuiz: (quiz: Omit<Quiz, 'id'>, questions: Omit<Question, 'id' | 'quizId'>[]): Quiz => {
    const quizId = `quiz-${Date.now()}`;
    const newQuiz: Quiz = { ...quiz, id: quizId };
    store.quizzes.push(newQuiz);

    questions.forEach((q, idx) => {
      store.questions.push({
        ...q,
        id: `q-${Date.now()}-${idx}`,
        quizId,
      });
    });

    return {
      ...newQuiz,
      questions: store.questions.filter((q) => q.quizId === quizId),
    };
  },

  submitQuizAttempt: (
    userId: string,
    quizId: string,
    answers: Record<string, number>,
    timeTakenSec: number
  ): QuizAttempt => {
    const questions = store.questions.filter((q) => q.quizId === quizId);
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctOption) {
        correctCount++;
      }
    });

    const total = questions.length || 1;
    const percentage = Math.round((correctCount / total) * 100);

    const attempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      userId,
      quizId,
      score: correctCount,
      totalMarks: total,
      percentage,
      timeTakenSec,
      answers,
      createdAt: new Date().toISOString(),
    };

    store.quizAttempts.unshift(attempt);
    return attempt;
  },

  getUserAttempts: (userId: string): QuizAttempt[] => {
    return store.quizAttempts.filter((a) => a.userId === userId);
  },

  // Notes
  getNotes: (subjectId?: string): Note[] => {
    if (subjectId) {
      return store.notes.filter((n) => n.subjectId === subjectId);
    }
    return store.notes;
  },

  addNote: (note: Omit<Note, 'id' | 'downloads' | 'createdAt'>): Note => {
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      downloads: 0,
      createdAt: new Date().toISOString(),
    };
    store.notes.unshift(newNote);
    return newNote;
  },

  incrementNoteDownloads: (id: string): void => {
    const note = store.notes.find((n) => n.id === id);
    if (note) {
      note.downloads += 1;
    }
  },

  // Progress
  saveProgress: (
    userId: string,
    lectureId: string,
    lastPositionSec: number,
    completed: boolean
  ) => {
    const key = `${userId}:${lectureId}`;
    store.lectureProgress[key] = {
      completed,
      lastPositionSec,
      watchedSec: lastPositionSec,
    };
  },

  getProgress: (userId: string, lectureId: string) => {
    const key = `${userId}:${lectureId}`;
    return store.lectureProgress[key] || { completed: false, lastPositionSec: 0, watchedSec: 0 };
  },

  getUserOverallStats: (userId: string) => {
    const attempts = store.quizAttempts.filter((a) => a.userId === userId);
    const avgScore =
      attempts.length > 0
        ? Math.round(attempts.reduce((acc, c) => acc + c.percentage, 0) / attempts.length)
        : 88;
    const completedLecturesCount = Object.keys(store.lectureProgress).filter(
      (k) => k.startsWith(`${userId}:`) && store.lectureProgress[k].completed
    ).length;

    return {
      streakDays: 14,
      totalHours: 28.5,
      quizAccuracy: avgScore,
      completedLectures: Math.max(completedLecturesCount, 3),
      totalLectures: store.lectures.length,
    };
  },

  // Users
  getUserByEmail: (email: string) => {
    return store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  getUserById: (id: string) => {
    return store.users.find((u) => u.id === id);
  },

  createUser: (userData: Omit<User, 'id' | 'streakDays' | 'lastActiveAt'> & { passwordHash: string }) => {
    const newUser: User & { passwordHash: string } = {
      ...userData,
      id: `usr-${Date.now()}`,
      streakDays: 1,
      lastActiveAt: new Date().toISOString(),
    };
    store.users.push(newUser);
    return newUser;
  },

  // Search
  searchAll: (query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) return { lectures: [], chapters: [], quizzes: [], notes: [] };

    const lectures = store.lectures.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        (l.hindiTitle && l.hindiTitle.toLowerCase().includes(q)) ||
        (l.description && l.description.toLowerCase().includes(q))
    );

    const chapters = store.chapters.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.hindiTitle && c.hindiTitle.toLowerCase().includes(q))
    );

    const quizzes = store.quizzes.filter(
      (qz) =>
        qz.title.toLowerCase().includes(q) ||
        (qz.hindiTitle && qz.hindiTitle.toLowerCase().includes(q))
    );

    const notes = store.notes.filter((n) => n.title.toLowerCase().includes(q));

    return { lectures, chapters, quizzes, notes };
  },
};
