// Tipos do aplicativo Crescer+

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  ageInMonths: number;
  avatar?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'cognitivo' | 'fisico' | 'linguagem' | 'socio-emocional';
  ageRange: string;
  duration: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  materials?: string[];
  completed?: boolean;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'cognitivo' | 'fisico' | 'linguagem' | 'socio-emocional';
  ageInMonths: number;
  achieved: boolean;
  achievedDate?: string;
}

export interface DailyTip {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
}
