// Sistema de gerenciamento de assinatura

export type SubscriptionPlan = 'free' | 'monthly' | 'bimonthly' | 'annual';

export interface SubscriptionStatus {
  plan: SubscriptionPlan;
  isActive: boolean;
  expiresAt?: string;
}

// Simula o status da assinatura (em produção, viria de um backend/Supabase)
export const getSubscriptionStatus = (): SubscriptionStatus => {
  if (typeof window === 'undefined') {
    return { plan: 'free', isActive: false };
  }
  
  const stored = localStorage.getItem('subscription');
  if (stored) {
    return JSON.parse(stored);
  }
  
  return { plan: 'free', isActive: false };
};

export const setSubscriptionStatus = (status: SubscriptionStatus) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('subscription', JSON.stringify(status));
  }
};

export const isPremiumUser = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Verificar se existe premiumExpiry (novo sistema)
  const premiumExpiry = localStorage.getItem('premiumExpiry');
  if (premiumExpiry) {
    const expiryDate = new Date(premiumExpiry);
    const today = new Date();
    return expiryDate > today;
  }
  
  // Fallback para sistema antigo
  const status = getSubscriptionStatus();
  return ['monthly', 'bimonthly', 'annual'].includes(status.plan) && status.isActive;
};

// Obter data de expiração do premium
export const getPremiumExpiryDate = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('premiumExpiry');
};

// Planos disponíveis
export const subscriptionPlans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    period: '',
    features: [
      'Atividades básicas de desenvolvimento',
      'Acompanhamento de marcos',
      'Dicas diárias',
      'Acesso limitado a conteúdos'
    ],
    limitations: [
      'Sem atividades de brincadeira variadas',
      'Sem conteúdo premium',
      'Anúncios'
    ]
  },
  {
    id: 'monthly',
    name: 'Mensal',
    price: 30.00,
    period: '/mês',
    features: [
      'Todas as atividades básicas',
      'Atividades de brincadeira que variam diariamente',
      'Conteúdo exclusivo premium',
      'Jogos interativos',
      'Sem anúncios',
      'Relatórios detalhados de progresso',
      'Suporte prioritário'
    ],
    popular: false,
    savings: null
  },
  {
    id: 'bimonthly',
    name: 'Bimestral',
    price: 120.00,
    period: '/2 meses',
    features: [
      'Todas as atividades básicas',
      'Atividades de brincadeira que variam diariamente',
      'Conteúdo exclusivo premium',
      'Jogos interativos',
      'Sem anúncios',
      'Relatórios detalhados de progresso',
      'Suporte prioritário',
      'Economia de R$ 60,00 vs mensal'
    ],
    popular: true,
    savings: 'Economize 33%'
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 200.00,
    period: '/ano',
    features: [
      'Todas as atividades básicas',
      'Atividades de brincadeira que variam diariamente',
      'Conteúdo exclusivo premium',
      'Jogos interativos',
      'Sem anúncios',
      'Relatórios detalhados de progresso',
      'Suporte prioritário',
      'Economia de R$ 160,00 vs mensal',
      'Melhor custo-benefício'
    ],
    popular: false,
    savings: 'Economize 44%'
  }
];
