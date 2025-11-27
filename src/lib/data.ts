// Dados mock do Crescer+
import { Activity, Milestone, DailyTip } from './types';

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Brincadeira com Espelho',
    description: 'Coloque o bebê em frente ao espelho e observe suas reações. Isso ajuda no reconhecimento próprio.',
    category: 'cognitivo',
    ageRange: '6-12 meses',
    duration: '10 min',
    difficulty: 'facil',
    materials: ['Espelho seguro'],
    completed: false
  },
  {
    id: '2',
    title: 'Empilhar Blocos',
    description: 'Ensine a criança a empilhar blocos coloridos. Desenvolve coordenação motora fina.',
    category: 'fisico',
    ageRange: '12-18 meses',
    duration: '15 min',
    difficulty: 'medio',
    materials: ['Blocos de montar', 'Superfície plana'],
    completed: false
  },
  {
    id: '3',
    title: 'Cantar Músicas Infantis',
    description: 'Cante músicas simples com gestos. Estimula linguagem e memória.',
    category: 'linguagem',
    ageRange: '6-24 meses',
    duration: '10 min',
    difficulty: 'facil',
    materials: [],
    completed: true
  },
  {
    id: '4',
    title: 'Hora do Abraço',
    description: 'Momento de carinho e conexão emocional. Fortalece vínculo afetivo.',
    category: 'socio-emocional',
    ageRange: '0-36 meses',
    duration: '5 min',
    difficulty: 'facil',
    materials: [],
    completed: true
  },
  {
    id: '5',
    title: 'Pegar Objetos Pequenos',
    description: 'Coloque objetos seguros para a criança pegar. Desenvolve pinça e coordenação.',
    category: 'fisico',
    ageRange: '9-15 meses',
    duration: '10 min',
    difficulty: 'medio',
    materials: ['Objetos seguros pequenos'],
    completed: false
  },
  {
    id: '6',
    title: 'Contar Histórias',
    description: 'Leia livros ilustrados e conte histórias simples. Estimula imaginação e linguagem.',
    category: 'linguagem',
    ageRange: '12-36 meses',
    duration: '15 min',
    difficulty: 'facil',
    materials: ['Livros infantis'],
    completed: false
  }
];

export const milestones: Milestone[] = [
  {
    id: '1',
    title: 'Sorri em resposta',
    description: 'Bebê sorri quando você sorri para ele',
    category: 'socio-emocional',
    ageInMonths: 2,
    achieved: true,
    achievedDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Sustenta a cabeça',
    description: 'Consegue manter a cabeça erguida quando está de bruços',
    category: 'fisico',
    ageInMonths: 3,
    achieved: true,
    achievedDate: '2024-02-10'
  },
  {
    id: '3',
    title: 'Balbucia sons',
    description: 'Faz sons como "ba-ba" ou "ma-ma"',
    category: 'linguagem',
    ageInMonths: 6,
    achieved: false
  },
  {
    id: '4',
    title: 'Senta sem apoio',
    description: 'Consegue sentar sozinho sem suporte',
    category: 'fisico',
    ageInMonths: 7,
    achieved: false
  },
  {
    id: '5',
    title: 'Reconhece o próprio nome',
    description: 'Responde quando chamado pelo nome',
    category: 'cognitivo',
    ageInMonths: 8,
    achieved: false
  }
];

export const dailyTips: DailyTip[] = [
  {
    id: '1',
    title: 'Rotina é fundamental',
    content: 'Estabeleça horários regulares para sono, alimentação e brincadeiras. Isso traz segurança para o bebê.',
    category: 'Desenvolvimento',
    date: '2024-01-20T10:00:00.000Z'
  },
  {
    id: '2',
    title: 'Tempo de barriga',
    content: 'Coloque o bebê de bruços por alguns minutos diariamente. Fortalece pescoço e costas.',
    category: 'Físico',
    date: '2024-01-20T10:00:00.000Z'
  }
];

export const categories = [
  { id: 'cognitivo', name: 'Cognitivo', color: 'from-purple-500 to-pink-500' },
  { id: 'fisico', name: 'Físico', color: 'from-blue-500 to-cyan-500' },
  { id: 'linguagem', name: 'Linguagem', color: 'from-orange-500 to-yellow-500' },
  { id: 'socio-emocional', name: 'Sócio-emocional', color: 'from-green-500 to-emerald-500' }
];
