"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Baby, 
  TrendingUp,
  Crown,
  CheckCircle2,
  ArrowRight,
  Play,
  Clock,
  Target,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import ChatSupport from '@/components/custom/ChatSupport';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    // Verificar se usuário está logado
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('user');
    
    if (loggedIn && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      // Se não estiver logado, redirecionar para login
      router.push('/login');
    }
  }, []);

  if (!mounted || !isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-20 md:pb-8">
      <Navbar />

      {/* Conteúdo Principal */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Boas-vindas */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Olá, {user?.nome}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Veja como está o desenvolvimento de {user?.nomeBebe}
          </p>
        </div>

        {/* Resumo de Progresso */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 - Atividades Concluídas */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">12</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Atividades Concluídas</h3>
            <p className="text-sm text-gray-600">Esta semana</p>
          </div>

          {/* Card 2 - Progresso Geral */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">68%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Progresso Geral</h3>
            <p className="text-sm text-gray-600">+15% este mês</p>
          </div>

          {/* Card 3 - Próximo Marco */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Próximos Marcos</h3>
            <p className="text-sm text-gray-600">A serem alcançados</p>
          </div>
        </div>

        {/* Atividade Fixa para Não-Premium */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Atividade do Dia</h2>
            <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">Grátis</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Brincadeira de Esconde-Esconde
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Desenvolva a permanência de objeto e habilidades cognitivas do seu bebê com esta atividade divertida e educativa.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      Cognitivo
                    </span>
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                      6-12 meses
                    </span>
                    <span className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      <Clock className="w-4 h-4" />
                      10 min
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Como fazer:</h4>
                <ol className="space-y-2 text-gray-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600">1.</span>
                    <span>Cubra seu rosto com as mãos e diga "Cadê a mamãe/papai?"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600">2.</span>
                    <span>Descubra o rosto e diga "Achou!" com entusiasmo</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600">3.</span>
                    <span>Repita várias vezes, observando a reação do bebê</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-purple-600">4.</span>
                    <span>Varie escondendo brinquedos sob um pano</span>
                  </li>
                </ol>
              </div>

              <button
                onClick={() => router.push('/activities')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Marcar como Concluída
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action Premium */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Crown className="w-5 h-5" />
                <span className="font-semibold">Premium</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Acesse Mais de 500 Atividades
              </h2>
              <p className="text-white/90 text-lg mb-4">
                Desbloqueie todo o potencial de desenvolvimento do seu bebê com atividades personalizadas, vídeos exclusivos e relatórios detalhados.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Atividades Ilimitadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Vídeos de Evolução</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Relatórios Avançados</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/subscription')}
              className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-2 whitespace-nowrap"
            >
              Ver Planos Premium
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dica do Dia */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dica do Dia</h3>
              <p className="text-gray-700">
                Bebês aprendem melhor através da repetição! Repita as mesmas atividades várias vezes 
                ao longo da semana para reforçar o aprendizado e criar conexões neurais mais fortes.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Chat de Suporte */}
      <ChatSupport />
    </div>
  );
}
