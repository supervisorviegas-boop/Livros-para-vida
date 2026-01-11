
export interface Flashcard {
  question: string;
  answer: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  exercises?: string[];
  affirmation?: string;
  videoUrl?: string; // Link para vídeo de treinamento
  flashcards?: Flashcard[]; // Flashcards para revisão
}

export type Language = 'pt' | 'en' | 'es' | 'fr';

export interface EbookContent {
  title: string;
  tagline: string;
  chapters: Chapter[];
}

export interface UserProgress {
  lastChapterId: number;
  notes: Record<number, string>; // Notas por ID de capítulo
  completedChapters: number[];
}
