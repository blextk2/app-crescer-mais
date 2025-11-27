"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Baby, 
  TrendingUp, 
  Calendar, 
  Award,
  Heart,
  Smile,
  Activity,
  Target,
  CheckCircle2,
  Plus,
  ArrowLeft,
  LogOut,
  Home
} from 'lucide-react';
import Navbar from '@/components/custom/navbar';

interface UserData {
  nome: string;
  nomeBebe: string;
  dataNascimento: string;
}

export default function ProgressoPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [idadeMeses, setIdadeMeses] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Verificar autenticação
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = localStorage.getItem('user');
    
    if (!isLoggedIn || !userData) {
      router.push('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Calcular idade em meses
    if (parsedUser.dataNascimento) {
      const nascimento = new Date(parsedUser.dataNascimento);
      const hoje = new Date();
      const meses = (hoje.getFullYear() - nascimento.getFullYear()) * 12 + 
                    (hoje.getMonth() - nascimento.getMonth());
      setIdadeMeses(meses);
    }
  }, []);

  if (!mounted || !user) {
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
      <main className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Boas-vindas */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Olá, {user.nome}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Acompanhe o desenvolvimento de {user.nomeBebe}
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Atividades Concluídas */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">24</span>
            </div>
            <p className="text-gray-600 font-medium">Atividades Concluídas</p>
            <p className="text-sm text-green-600 mt-1">+8 esta semana</p>
          </div>

          {/* Marcos Alcançados */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
            <p className="text-gray-600 font-medium">Marcos Alcançados</p>
            <p className="text-sm text-purple-600 mt-1">85% do esperado</p>
          </div>

          {/* Progresso Geral */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">78%</span>
            </div>
            <p className="text-gray-600 font-medium">Progresso Geral</p>
            <p className="text-sm text-blue-600 mt-1">+12% este mês</p>
          </div>

          {/* Sequência */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">7</span>
            </div>
            <p className="text-gray-600 font-medium">Dias de Sequência</p>
            <p className="text-sm text-orange-600 mt-1">Continue assim!</p>
          </div>
        </div>

        {/* Áreas de Desenvolvimento */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Áreas de Desenvolvimento</h2>
          
          <div className="space-y-6">
            {/* Motor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Desenvolvimento Motor</span>
                </div>
                <span className="text-sm font-bold text-blue-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* Cognitivo */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Desenvolvimento Cognitivo</span>
                </div>
                <span className="text-sm font-bold text-purple-600">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Desenvolvimento Social</span>
                </div>
                <span className="text-sm font-bold text-pink-600">90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            {/* Emocional */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Smile className="w-5 h-5 text-yellow-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Desenvolvimento Emocional</span>
                </div>
                <span className="text-sm font-bold text-yellow-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Atividades Recentes</h2>
            <button className="flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nova Atividade</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Atividade 1 */}
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Brincadeira com blocos</p>
                <p className="text-sm text-gray-600">Concluída há 2 horas</p>
              </div>
              <span className="text-sm font-bold text-green-600">+10 pts</span>
            </div>

            {/* Atividade 2 */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Leitura de história</p>
                <p className="text-sm text-gray-600">Concluída ontem</p>
              </div>
              <span className="text-sm font-bold text-blue-600">+8 pts</span>
            </div>

            {/* Atividade 3 */}
            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Música e movimento</p>
                <p className="text-sm text-gray-600">Concluída há 2 dias</p>
              </div>
              <span className="text-sm font-bold text-purple-600">+12 pts</span>
            </div>
          </div>
        </div>

        {/* Próximos Marcos */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-6">Próximos Marcos de Desenvolvimento</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold mb-1">Andar sem apoio</p>
                <p className="text-white/80 text-sm">Esperado para {idadeMeses + 2} meses</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold mb-1">Falar primeiras palavras</p>
                <p className="text-white/80 text-sm">Esperado para {idadeMeses + 1} meses</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold mb-1">Brincar de forma independente</p>
                <p className="text-white/80 text-sm">Esperado para {idadeMeses + 3} meses</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
