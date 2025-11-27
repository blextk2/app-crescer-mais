"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/custom/navbar';
import { 
  getTodayPlayActivity, 
  getCognitiveActivities, 
  getLanguageActivities,
  getWeeklyPlayActivities,
  PlayActivity 
} from '@/lib/play-activities';
import { isPremiumUser } from '@/lib/subscription';
import { 
  Brain, 
  MessageCircle, 
  Sparkles, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Circle,
  Crown,
  Lock
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ActivitiesPage() {
  const [mounted, setMounted] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setIsPremium(isPremiumUser());
    
    // Carregar atividades completadas do localStorage
    const saved = localStorage.getItem('completedActivities');
    if (saved) {
      setCompletedActivities(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleActivity = (id: string) => {
    setCompletedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      localStorage.setItem('completedActivities', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const weeklyActivities = getWeeklyPlayActivities();
  const cognitiveActivities = getCognitiveActivities();
  const languageActivities = getLanguageActivities();

  const allActivities = [
    ...weeklyActivities,
    ...(isPremium ? [...cognitiveActivities, ...languageActivities] : [])
  ];

  const completedCount = allActivities.filter(a => completedActivities.has(a.id)).length;
  const totalCount = allActivities.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Calcular progresso semanal
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const weeklyCompletedCount = allActivities.filter(a => {
    if (!completedActivities.has(a.id)) return false;
    // Aqui você pode adicionar lógica para verificar se foi completado nesta semana
    return true;
  }).length;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  const ActivityCard = ({ activity, isLocked }: { activity: PlayActivity; isLocked: boolean }) => {
    const isCompleted = completedActivities.has(activity.id);
    
    return (
      <div
        onClick={() => {
          if (isLocked) {
            router.push('/subscription');
          } else {
            toggleActivity(activity.id);
          }
        }}
        className={`relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl hover:scale-105 ${
          isCompleted ? 'ring-2 ring-green-500' : ''
        }`}
      >
        {/* Imagem ilustrativa suave e minimalista */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop&q=80"
            alt={activity.title}
            width={800}
            height={600}
            className="w-full h-full object-cover opacity-60"
          />
          
          {isLocked && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="text-center">
                <Lock className="w-12 h-12 text-white mx-auto mb-2" />
                <p className="text-white font-semibold">Premium</p>
              </div>
            </div>
          )}
          
          {/* Badge de conclusão */}
          {isCompleted && !isLocked && (
            <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full shadow-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-gray-800 text-lg flex-1">
              {activity.title}
            </h3>
            {!isLocked && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleActivity(activity.id);
                }}
                className="flex-shrink-0 ml-2"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300" />
                )}
              </button>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {activity.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg">
              {activity.ageRange}
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
              {activity.duration}
            </span>
          </div>

          {!isLocked && (
            <div className="border-t pt-3">
              <p className="text-xs text-gray-500 font-semibold mb-1">Benefícios:</p>
              <ul className="space-y-1">
                {activity.benefits.slice(0, 2).map((benefit, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="text-purple-500 mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Navbar />

      <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header com Progresso */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  Atividades 🎯
                </h1>
                <p className="text-purple-100 text-sm sm:text-base">
                  Acompanhe o progresso do desenvolvimento do seu bebê
                </p>
              </div>
            </div>

            {/* Toggle Semanal/Mensal */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setViewMode('weekly')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  viewMode === 'weekly'
                    ? 'bg-white text-purple-600'
                    : 'bg-white/20 text-white'
                }`}
              >
                Semanal
              </button>
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  viewMode === 'monthly'
                    ? 'bg-white text-purple-600'
                    : 'bg-white/20 text-white'
                }`}
              >
                Mensal
              </button>
            </div>

            {/* Barra de Progresso */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {viewMode === 'weekly' ? 'Progresso Semanal' : 'Progresso Mensal'}
                </span>
                <span className="text-sm font-bold">
                  {completedCount}/{totalCount} atividades
                </span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-purple-100 mt-2">
                {progressPercentage.toFixed(0)}% concluído
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">Esta Semana</span>
                </div>
                <p className="text-xl font-bold">{weeklyCompletedCount}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-medium">Total</span>
                </div>
                <p className="text-xl font-bold">{completedCount}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">Meta</span>
                </div>
                <p className="text-xl font-bold">{totalCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Banner (if not premium) */}
        {!isPremium && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1 text-lg">Desbloqueie Todas as Atividades!</h3>
                    <p className="text-white/90 text-sm">
                      Acesse atividades cognitivas, de linguagem e muito mais
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/subscription')}
                  className="flex-shrink-0 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Ver Planos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Brincadeira do Dia */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎮 Brincadeira do Dia
            {isPremium && (
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                PREMIUM
              </span>
            )}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {weeklyActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isLocked={!isPremium}
              />
            ))}
          </div>
        </div>

        {/* Atividades Cognitivas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Brain className="w-7 h-7 text-purple-600" />
            Atividades Cognitivas
            {isPremium && (
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                PREMIUM
              </span>
            )}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cognitiveActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isLocked={!isPremium}
              />
            ))}
          </div>
        </div>

        {/* Atividades de Linguagem */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MessageCircle className="w-7 h-7 text-blue-600" />
            Atividades de Linguagem
            {isPremium && (
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                PREMIUM
              </span>
            )}
          </h2>

          {/* 6-12 meses */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">6-12 meses</span>
              Primeiros Sons e Comunicação
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {languageActivities.filter(a => a.ageRange === '6-12 meses').map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isLocked={!isPremium}
                />
              ))}
            </div>
          </div>

          {/* 12-18 meses */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-lg text-sm">12-18 meses</span>
              Compreensão Rápida
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {languageActivities.filter(a => a.ageRange === '12-18 meses').map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isLocked={!isPremium}
                />
              ))}
            </div>
          </div>

          {/* 18-24 meses */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-lg text-sm">18-24 meses</span>
              Construção de Frases
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {languageActivities.filter(a => a.ageRange === '18-24 meses').map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isLocked={!isPremium}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
