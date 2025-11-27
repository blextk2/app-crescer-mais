export interface BabyProfile {
  name: string;
  birthDate: string;
  ageMonths: number;
  gender: 'boy' | 'girl' | 'other';
  photoUrl?: string;
  parentName: string;
  parentEmail: string;
  preferences: {
    notifications: boolean;
    weeklyReport: boolean;
    activityReminders: boolean;
  };
  theme: ThemeOption;
  milestones: Milestone[];
  favoriteActivities: string[];
}

export type ThemeOption = 'purple-pink' | 'blue-cyan' | 'green-emerald' | 'orange-coral' | 'rose-pink';

export interface Theme {
  id: ThemeOption;
  name: string;
  gradient: string;
  bgGradient: string;
  ringColor: string;
  textColor: string;
}

export const themes: Theme[] = [
  {
    id: 'purple-pink',
    name: 'Roxo & Rosa',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 via-pink-50 to-orange-50',
    ringColor: 'ring-purple-500',
    textColor: 'text-purple-600'
  },
  {
    id: 'blue-cyan',
    name: 'Azul & Ciano',
    gradient: 'from-blue-500 to-cyan-400',
    bgGradient: 'from-blue-50 via-cyan-50 to-sky-50',
    ringColor: 'ring-blue-500',
    textColor: 'text-blue-600'
  },
  {
    id: 'green-emerald',
    name: 'Verde & Esmeralda',
    gradient: 'from-green-500 to-emerald-400',
    bgGradient: 'from-green-50 via-emerald-50 to-teal-50',
    ringColor: 'ring-green-500',
    textColor: 'text-green-600'
  },
  {
    id: 'orange-coral',
    name: 'Laranja & Coral',
    gradient: 'from-orange-500 to-pink-400',
    bgGradient: 'from-orange-50 via-pink-50 to-rose-50',
    ringColor: 'ring-orange-500',
    textColor: 'text-orange-600'
  },
  {
    id: 'rose-pink',
    name: 'Rosa Suave',
    gradient: 'from-rose-400 to-pink-400',
    bgGradient: 'from-rose-50 via-pink-50 to-fuchsia-50',
    ringColor: 'ring-rose-500',
    textColor: 'text-rose-600'
  }
];

export function getTheme(themeId: ThemeOption): Theme {
  return themes.find(t => t.id === themeId) || themes[0];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  achievedDate?: string;
  category: 'motor' | 'cognitive' | 'language' | 'social';
  ageRange: string;
}

// Milestones padrão para bebês de 6-12 meses
export const defaultMilestones: Milestone[] = [
  {
    id: 'milestone-1',
    title: 'Sentar sem apoio',
    description: 'Consegue sentar sozinho por alguns minutos',
    category: 'motor',
    ageRange: '6-8 meses'
  },
  {
    id: 'milestone-2',
    title: 'Engatinhar',
    description: 'Começa a se movimentar engatinhando',
    category: 'motor',
    ageRange: '7-10 meses'
  },
  {
    id: 'milestone-3',
    title: 'Primeiras palavras',
    description: 'Fala "mamã" ou "papá" com significado',
    category: 'language',
    ageRange: '8-12 meses'
  },
  {
    id: 'milestone-4',
    title: 'Permanência do objeto',
    description: 'Entende que objetos existem mesmo quando não os vê',
    category: 'cognitive',
    ageRange: '8-12 meses'
  },
  {
    id: 'milestone-5',
    title: 'Ficar em pé com apoio',
    description: 'Consegue ficar em pé segurando em móveis',
    category: 'motor',
    ageRange: '9-12 meses'
  },
  {
    id: 'milestone-6',
    title: 'Pinça com dedos',
    description: 'Pega objetos pequenos com polegar e indicador',
    category: 'motor',
    ageRange: '9-12 meses'
  },
  {
    id: 'milestone-7',
    title: 'Responde ao nome',
    description: 'Olha quando chamado pelo nome',
    category: 'social',
    ageRange: '6-9 meses'
  },
  {
    id: 'milestone-8',
    title: 'Imita sons',
    description: 'Tenta imitar sons e gestos simples',
    category: 'language',
    ageRange: '8-12 meses'
  }
];

// Função para calcular idade em meses
export function calculateAgeInMonths(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  const months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  return months;
}

// Função para obter perfil do localStorage
export function getBabyProfile(): BabyProfile | null {
  if (typeof window === 'undefined') return null;
  
  const saved = localStorage.getItem('babyProfile');
  if (saved) {
    const profile = JSON.parse(saved);
    // Adicionar tema padrão se não existir
    if (!profile.theme) {
      profile.theme = 'purple-pink';
    }
    return profile;
  }
  
  // Perfil padrão se não existir
  return {
    name: 'Seu Bebê',
    birthDate: new Date(Date.now() - 8 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8 meses atrás
    ageMonths: 8,
    gender: 'other',
    parentName: 'Família',
    parentEmail: '',
    preferences: {
      notifications: true,
      weeklyReport: true,
      activityReminders: true
    },
    theme: 'purple-pink',
    milestones: defaultMilestones,
    favoriteActivities: []
  };
}

// Função para salvar perfil
export function saveBabyProfile(profile: BabyProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('babyProfile', JSON.stringify(profile));
}

// Função para marcar milestone como alcançado
export function achieveMilestone(milestoneId: string): void {
  const profile = getBabyProfile();
  if (!profile) return;
  
  const milestone = profile.milestones.find(m => m.id === milestoneId);
  if (milestone && !milestone.achievedDate) {
    milestone.achievedDate = new Date().toISOString().split('T')[0];
    saveBabyProfile(profile);
  }
}

// Função para obter milestones por categoria
export function getMilestonesByCategory(category: Milestone['category']): Milestone[] {
  const profile = getBabyProfile();
  if (!profile) return [];
  return profile.milestones.filter(m => m.category === category);
}

// Função para calcular progresso de milestones
export function getMilestoneProgress(): { achieved: number; total: number; percentage: number } {
  const profile = getBabyProfile();
  if (!profile) return { achieved: 0, total: 0, percentage: 0 };
  
  const achieved = profile.milestones.filter(m => m.achievedDate).length;
  const total = profile.milestones.length;
  const percentage = total > 0 ? (achieved / total) * 100 : 0;
  
  return { achieved, total, percentage };
}
