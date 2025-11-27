"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/custom/navbar';
import { 
  getBabyProfile, 
  saveBabyProfile, 
  achieveMilestone,
  getMilestoneProgress,
  BabyProfile,
  Milestone,
  calculateAgeInMonths,
  themes,
  getTheme,
  ThemeOption
} from '@/lib/profile';
import { 
  User, 
  Baby, 
  Calendar, 
  Mail, 
  Bell, 
  CheckCircle2,
  Circle,
  Edit2,
  Save,
  X,
  Award,
  TrendingUp,
  Heart,
  Sparkles,
  Target,
  Brain,
  MessageCircle,
  Users,
  Palette
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<BabyProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<BabyProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const loadedProfile = getBabyProfile();
    setProfile(loadedProfile);
    setEditedProfile(loadedProfile);
  }, []);

  const handleSave = () => {
    if (editedProfile) {
      // Recalcular idade baseado na data de nascimento
      editedProfile.ageMonths = calculateAgeInMonths(editedProfile.birthDate);
      saveBabyProfile(editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const toggleMilestone = (milestoneId: string) => {
    if (!profile) return;
    
    const milestone = profile.milestones.find(m => m.id === milestoneId);
    if (milestone) {
      if (milestone.achievedDate) {
        // Desmarcar
        milestone.achievedDate = undefined;
      } else {
        // Marcar como alcançado
        milestone.achievedDate = new Date().toISOString().split('T')[0];
      }
      saveBabyProfile(profile);
      setProfile({ ...profile });
    }
  };

  const togglePreference = (key: keyof BabyProfile['preferences']) => {
    if (!editedProfile) return;
    setEditedProfile({
      ...editedProfile,
      preferences: {
        ...editedProfile.preferences,
        [key]: !editedProfile.preferences[key]
      }
    });
  };

  const changeTheme = (themeId: ThemeOption) => {
    if (!editedProfile) return;
    setEditedProfile({
      ...editedProfile,
      theme: themeId
    });
  };

  if (!mounted || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const milestoneProgress = getMilestoneProgress();
  const displayProfile = isEditing ? editedProfile : profile;

  if (!displayProfile) return null;

  const currentTheme = getTheme(displayProfile.theme);

  // Categorizar milestones
  const motorMilestones = displayProfile.milestones.filter(m => m.category === 'motor');
  const cognitiveMilestones = displayProfile.milestones.filter(m => m.category === 'cognitive');
  const languageMilestones = displayProfile.milestones.filter(m => m.category === 'language');
  const socialMilestones = displayProfile.milestones.filter(m => m.category === 'social');

  const categoryIcons = {
    motor: Target,
    cognitive: Brain,
    language: MessageCircle,
    social: Users
  };

  const categoryColors = {
    motor: { bg: 'bg-blue-100', text: 'text-blue-700', gradient: 'from-blue-500 to-cyan-500' },
    cognitive: { bg: 'bg-purple-100', text: 'text-purple-700', gradient: 'from-purple-500 to-pink-500' },
    language: { bg: 'bg-green-100', text: 'text-green-700', gradient: 'from-green-500 to-emerald-500' },
    social: { bg: 'bg-orange-100', text: 'text-orange-700', gradient: 'from-orange-500 to-pink-500' }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bgGradient}`}>
      <Navbar />

      <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              👤 Perfil
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className={`flex items-center gap-2 bg-gradient-to-r ${currentTheme.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all`}
              >
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-lg">
            Informações sobre o desenvolvimento do seu pequeno
          </p>
        </div>

        {/* Card Principal do Bebê */}
        <div className={`bg-gradient-to-r ${currentTheme.gradient} rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-8`}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Foto do Bebê */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                {displayProfile.photoUrl ? (
                  <Image
                    src={displayProfile.photoUrl}
                    alt={displayProfile.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                ) : (
                  <Baby className="w-16 h-16 text-white" />
                )}
              </div>
            </div>

            {/* Informações */}
            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile?.name || ''}
                  onChange={(e) => setEditedProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                  className="text-3xl font-bold mb-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 w-full text-white placeholder-white/60"
                  placeholder="Nome do bebê"
                />
              ) : (
                <h2 className="text-3xl font-bold mb-2">{displayProfile.name}</h2>
              )}
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedProfile?.birthDate || ''}
                      onChange={(e) => setEditedProfile(prev => prev ? { ...prev, birthDate: e.target.value } : null)}
                      className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white"
                    />
                  ) : (
                    <span>{displayProfile.ageMonths} meses</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {isEditing ? (
                    <select
                      value={editedProfile?.gender || 'other'}
                      onChange={(e) => setEditedProfile(prev => prev ? { ...prev, gender: e.target.value as any } : null)}
                      className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-white"
                    >
                      <option value="boy">Menino</option>
                      <option value="girl">Menina</option>
                      <option value="other">Outro</option>
                    </select>
                  ) : (
                    <span>
                      {displayProfile.gender === 'boy' ? 'Menino' : displayProfile.gender === 'girl' ? 'Menina' : 'Outro'}
                    </span>
                  )}
                </div>
              </div>

              {/* Progresso de Milestones */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Marcos do Desenvolvimento</span>
                  <span className="text-sm font-bold">
                    {milestoneProgress.achieved}/{milestoneProgress.total}
                  </span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${milestoneProgress.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-white/80 mt-2">
                  {milestoneProgress.percentage.toFixed(0)}% dos marcos alcançados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seletor de Tema */}
        {isEditing && (
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Palette className={`w-6 h-6 ${currentTheme.textColor}`} />
              Escolha seu Tema
            </h2>
            <p className="text-gray-600 mb-6">
              Personalize as cores do aplicativo com gradientes suaves
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  className={`relative group rounded-2xl p-6 transition-all hover:scale-105 ${
                    editedProfile?.theme === theme.id ? `ring-4 ${theme.ringColor}` : ''
                  }`}
                >
                  <div className={`w-full h-24 rounded-xl bg-gradient-to-r ${theme.gradient} mb-3 shadow-lg`}></div>
                  <p className="text-sm font-semibold text-gray-800 text-center">{theme.name}</p>
                  {editedProfile?.theme === theme.id && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg">
                      <CheckCircle2 className={`w-5 h-5 ${theme.textColor}`} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Informações dos Pais */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
          <h2 className={`text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2`}>
            <User className={`w-6 h-6 ${currentTheme.textColor}`} />
            Informações dos Pais
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome do Responsável
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile?.parentName || ''}
                  onChange={(e) => setEditedProfile(prev => prev ? { ...prev, parentName: e.target.value } : null)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  placeholder="Seu nome"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-800">{displayProfile.parentName}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile?.parentEmail || ''}
                  onChange={(e) => setEditedProfile(prev => prev ? { ...prev, parentEmail: e.target.value } : null)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  placeholder="seu@email.com"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-800">{displayProfile.parentEmail || 'Não informado'}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preferências */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
          <h2 className={`text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2`}>
            <Bell className={`w-6 h-6 ${currentTheme.textColor}`} />
            Preferências
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-800">Notificações</h3>
                <p className="text-sm text-gray-600">Receber notificações sobre atividades</p>
              </div>
              <button
                onClick={() => isEditing && togglePreference('notifications')}
                disabled={!isEditing}
                className={`w-14 h-8 rounded-full transition-all ${
                  displayProfile.preferences.notifications
                    ? `bg-gradient-to-r ${currentTheme.gradient}`
                    : 'bg-gray-300'
                } ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                    displayProfile.preferences.notifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-800">Relatório Semanal</h3>
                <p className="text-sm text-gray-600">Receber resumo semanal por e-mail</p>
              </div>
              <button
                onClick={() => isEditing && togglePreference('weeklyReport')}
                disabled={!isEditing}
                className={`w-14 h-8 rounded-full transition-all ${
                  displayProfile.preferences.weeklyReport
                    ? `bg-gradient-to-r ${currentTheme.gradient}`
                    : 'bg-gray-300'
                } ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                    displayProfile.preferences.weeklyReport ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-800">Lembretes de Atividades</h3>
                <p className="text-sm text-gray-600">Receber lembretes diários</p>
              </div>
              <button
                onClick={() => isEditing && togglePreference('activityReminders')}
                disabled={!isEditing}
                className={`w-14 h-8 rounded-full transition-all ${
                  displayProfile.preferences.activityReminders
                    ? `bg-gradient-to-r ${currentTheme.gradient}`
                    : 'bg-gray-300'
                } ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${
                    displayProfile.preferences.activityReminders ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Marcos do Desenvolvimento */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2`}>
            <Award className={`w-6 h-6 ${currentTheme.textColor}`} />
            Marcos do Desenvolvimento
          </h2>
          <p className="text-gray-600 mb-6">
            Acompanhe os marcos importantes do desenvolvimento do seu bebê. Clique para marcar como alcançado!
          </p>

          {/* Motor */}
          {motorMilestones.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Desenvolvimento Motor
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {motorMilestones.map((milestone) => {
                  const isAchieved = !!milestone.achievedDate;
                  return (
                    <div
                      key={milestone.id}
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                        isAchieved ? 'ring-4 ring-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">{milestone.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold">
                            {milestone.ageRange}
                          </span>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {isAchieved ? (
                            <CheckCircle2 className="w-8 h-8 text-blue-500" />
                          ) : (
                            <Circle className="w-8 h-8 text-gray-300" />
                          )}
                        </div>
                      </div>
                      {isAchieved && milestone.achievedDate && (
                        <div className="text-xs text-blue-600 font-semibold">
                          ✓ Alcançado em {new Date(milestone.achievedDate).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cognitivo */}
          {cognitiveMilestones.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Desenvolvimento Cognitivo
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {cognitiveMilestones.map((milestone) => {
                  const isAchieved = !!milestone.achievedDate;
                  return (
                    <div
                      key={milestone.id}
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                        isAchieved ? 'ring-4 ring-purple-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">{milestone.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-xs font-semibold">
                            {milestone.ageRange}
                          </span>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {isAchieved ? (
                            <CheckCircle2 className="w-8 h-8 text-purple-500" />
                          ) : (
                            <Circle className="w-8 h-8 text-gray-300" />
                          )}
                        </div>
                      </div>
                      {isAchieved && milestone.achievedDate && (
                        <div className="text-xs text-purple-600 font-semibold">
                          ✓ Alcançado em {new Date(milestone.achievedDate).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Linguagem */}
          {languageMilestones.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                Desenvolvimento de Linguagem
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {languageMilestones.map((milestone) => {
                  const isAchieved = !!milestone.achievedDate;
                  return (
                    <div
                      key={milestone.id}
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                        isAchieved ? 'ring-4 ring-green-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">{milestone.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-semibold">
                            {milestone.ageRange}
                          </span>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {isAchieved ? (
                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                          ) : (
                            <Circle className="w-8 h-8 text-gray-300" />
                          )}
                        </div>
                      </div>
                      {isAchieved && milestone.achievedDate && (
                        <div className="text-xs text-green-600 font-semibold">
                          ✓ Alcançado em {new Date(milestone.achievedDate).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Social */}
          {socialMilestones.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Desenvolvimento Social
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {socialMilestones.map((milestone) => {
                  const isAchieved = !!milestone.achievedDate;
                  return (
                    <div
                      key={milestone.id}
                      onClick={() => toggleMilestone(milestone.id)}
                      className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                        isAchieved ? 'ring-4 ring-orange-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">{milestone.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-xs font-semibold">
                            {milestone.ageRange}
                          </span>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {isAchieved ? (
                            <CheckCircle2 className="w-8 h-8 text-orange-500" />
                          ) : (
                            <Circle className="w-8 h-8 text-gray-300" />
                          )}
                        </div>
                      </div>
                      {isAchieved && milestone.achievedDate && (
                        <div className="text-xs text-orange-600 font-semibold">
                          ✓ Alcançado em {new Date(milestone.achievedDate).toLocaleDateString('pt-BR')}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* CTA para ver progresso */}
        <div className={`bg-gradient-to-r ${currentTheme.gradient} rounded-3xl p-8 text-white text-center shadow-2xl`}>
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Continue Acompanhando!</h2>
          <p className="text-white/80 mb-6">
            Veja o progresso detalhado das atividades e desenvolvimento
          </p>
          <button
            onClick={() => router.push('/progress')}
            className="bg-white text-gray-800 px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Ver Progresso Completo
          </button>
        </div>
      </main>
    </div>
  );
}
