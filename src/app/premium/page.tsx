"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/custom/navbar';
import { isPremiumUser, getPremiumExpiryDate } from '@/lib/subscription';
import { 
  Crown, 
  Check, 
  Sparkles, 
  TrendingUp, 
  Target,
  Calendar,
  Zap,
  Star,
  Lock,
  Unlock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PremiumPage() {
  const [mounted, setMounted] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const premium = isPremiumUser();
    setIsPremium(premium);

    if (premium) {
      const expiryDate = getPremiumExpiryDate();
      if (expiryDate) {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays > 0 ? diffDays : 0);
      }
    }
  }, []);

  const handleSubscribe = () => {
    // Simular ativação de premium por 30 dias
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    localStorage.setItem('premiumExpiry', expiryDate.toISOString());
    setIsPremium(true);
    setDaysRemaining(30);
  };

  const handleCancelSubscription = () => {
    localStorage.removeItem('premiumExpiry');
    setIsPremium(false);
    setDaysRemaining(null);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Sparkles,
      title: 'Insights Personalizados',
      description: 'Análises detalhadas sobre o desenvolvimento do seu bebê',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Progresso Completo',
      description: 'Acompanhe todas as métricas e estatísticas detalhadas',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Atividades Premium',
      description: 'Acesso a atividades cognitivas e de linguagem exclusivas',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Relatórios Semanais',
      description: 'Receba relatórios detalhados sobre o progresso semanal',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Zap,
      title: 'Recomendações Inteligentes',
      description: 'Sugestões personalizadas baseadas no perfil do seu bebê',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Star,
      title: 'Marcos do Desenvolvimento',
      description: 'Acompanhamento completo dos marcos importantes',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <Navbar />

      <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Crescer+ Premium
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Desbloqueie todo o potencial do desenvolvimento do seu bebê
          </p>
        </div>

        {/* Status Premium */}
        {isPremium ? (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white shadow-2xl mb-12">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Unlock className="w-8 h-8" />
                  <h2 className="text-3xl font-bold">Premium Ativo</h2>
                </div>
                <p className="text-yellow-100 text-lg">
                  Você tem acesso completo a todos os recursos premium!
                </p>
              </div>
              <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Crown className="w-8 h-8" />
              </div>
            </div>

            {/* Dias Restantes */}
            {daysRemaining !== null && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm mb-1">Tempo Restante</p>
                    <p className="text-4xl font-bold">{daysRemaining} dias</p>
                  </div>
                  <Calendar className="w-12 h-12 text-white/80" />
                </div>
                <div className="mt-4 w-full bg-white/30 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${(daysRemaining / 30) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push('/progress')}
                className="flex-1 bg-white text-orange-600 px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Ver Progresso Completo
              </button>
              <button
                onClick={handleCancelSubscription}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                Cancelar Assinatura
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-2xl mb-12 border-4 border-orange-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Desbloqueie o Premium
              </h2>
              <p className="text-gray-600 text-lg">
                Tenha acesso completo a todos os recursos por apenas
              </p>
              <div className="mt-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  R$ 29,90
                </span>
                <span className="text-gray-600 text-xl">/mês</span>
              </div>
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 mb-4"
            >
              <Crown className="w-6 h-6" />
              Assinar Premium Agora
            </button>

            <p className="text-center text-gray-500 text-sm">
              Cancele quando quiser • Sem compromisso
            </p>
          </div>
        )}

        {/* Recursos Premium */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            O que você ganha com o Premium
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all hover:scale-105"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold text-sm">Incluído no Premium</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparação */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 text-white text-center">
            <h2 className="text-2xl font-bold">Comparação de Planos</h2>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Plano Gratuito */}
              <div className="border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Gratuito</h3>
                <p className="text-3xl font-bold text-gray-600 mb-6">R$ 0</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Atividades básicas de brincadeira</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Porcentagem de progresso semanal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Perfil básico do bebê</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">Insights personalizados</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">Análise detalhada por categoria</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500">Atividades cognitivas e de linguagem</span>
                  </li>
                </ul>
              </div>

              {/* Plano Premium */}
              <div className="border-4 border-orange-400 rounded-2xl p-6 bg-gradient-to-br from-yellow-50 to-orange-50 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Recomendado
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Premium</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6">
                  R$ 29,90/mês
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-semibold">Tudo do plano gratuito</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Insights personalizados completos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Análise detalhada por categoria</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Atividades cognitivas exclusivas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Atividades de linguagem exclusivas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Recomendações inteligentes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Relatórios semanais detalhados</span>
                  </li>
                </ul>

                {!isPremium && (
                  <button
                    onClick={handleSubscribe}
                    className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Crown className="w-5 h-5" />
                    Assinar Agora
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ ou Benefícios Adicionais */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-lg mb-4">
            Ainda tem dúvidas? Entre em contato conosco!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-xl shadow-lg px-6 py-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-semibold">Cancele quando quiser</span>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-6 py-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-semibold">Sem compromisso</span>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-6 py-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 font-semibold">Suporte prioritário</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
