"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/custom/navbar';
import { 
  getWeeklyPlayActivities, 
  getCognitiveActivities, 
  getLanguageActivities,
  PlayActivity 
} from '@/lib/play-activities';
import { isPremiumUser } from '@/lib/subscription';
import { getBabyProfile, getMilestoneProgress } from '@/lib/profile';
import { 
  TrendingUp, 
  Calendar, 
  Award,
  ChevronRight,
  CheckCircle2,
  Circle,
  Crown,
  ArrowRight,
  BarChart3,
  Target,
  Sparkles,
  Lightbulb,
  Heart,
  Zap,
  Star,
  Lock,
  Video,
  Play,
  StopCircle,
  Trash2,
  Download,
  Plus,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Period = 'weekly' | 'monthly';
type Tab = 'atividades' | 'videos';

interface VideoRecord {
  id: string;
  title: string;
  blob: Blob;
  thumbnail: string;
  duration: number;
  createdAt: number;
}

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [period, setPeriod] = useState<Period>('weekly');
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('atividades');
  
  // Estados para gravação de vídeo
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    setIsPremium(isPremiumUser());
    
    const saved = localStorage.getItem('completedActivities');
    if (saved) {
      setCompletedActivities(new Set(JSON.parse(saved)));
    }

    // Carregar vídeos salvos
    loadVideos();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, []);

  const loadVideos = () => {
    const savedVideos = localStorage.getItem('evolutionVideos');
    if (savedVideos) {
      const parsed = JSON.parse(savedVideos);
      // Reconstruir blobs
      const reconstructed = parsed.map((v: any) => ({
        ...v,
        blob: new Blob([new Uint8Array(v.blobData)], { type: 'video/webm' })
      }));
      setVideos(reconstructed);
    }
  };

  const saveVideos = (videosToSave: VideoRecord[]) => {
    // Converter blobs para array buffer para salvar
    const toSave = videosToSave.map(v => ({
      id: v.id,
      title: v.title,
      thumbnail: v.thumbnail,
      duration: v.duration,
      createdAt: v.createdAt,
      blobData: Array.from(new Uint8Array(v.blob as any))
    }));
    localStorage.setItem('evolutionVideos', JSON.stringify(toSave));
  };

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: true 
      });
      
      setStream(mediaStream);
      
      if (previewRef.current) {
        previewRef.current.srcObject = mediaStream;
      }

      const recorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });

      recordedChunks.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        saveRecordedVideo(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);

      // Timer de 30 segundos
      timerInterval.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 30) {
            stopRecording();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    setIsRecording(false);
    setMediaRecorder(null);
    setStream(null);
  };

  const saveRecordedVideo = (blob: Blob) => {
    // Gerar thumbnail
    const video = document.createElement('video');
    video.src = URL.createObjectURL(blob);
    video.currentTime = 1;
    
    video.onloadeddata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 240;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, 320, 240);
        const thumbnail = canvas.toDataURL('image/jpeg', 0.7);
        
        const newVideo: VideoRecord = {
          id: Date.now().toString(),
          title: videoTitle || `Vídeo ${videos.length + 1}`,
          blob,
          thumbnail,
          duration: recordingTime,
          createdAt: Date.now()
        };

        const updatedVideos = [...videos, newVideo];
        setVideos(updatedVideos);
        saveVideos(updatedVideos);
        setVideoTitle('');
        setShowRecordModal(false);
      }
    };
  };

  const deleteVideo = (id: string) => {
    const updatedVideos = videos.filter(v => v.id !== id);
    setVideos(updatedVideos);
    saveVideos(updatedVideos);
  };

  const downloadVideo = (video: VideoRecord) => {
    const url = URL.createObjectURL(video.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${video.title}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const playVideo = (video: VideoRecord) => {
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(video.blob);
      videoRef.current.play();
      setPlayingVideo(video.id);
    }
  };

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

  // Calcular estatísticas por categoria
  const categoryStats = {
    brincadeira: {
      total: weeklyActivities.length,
      completed: weeklyActivities.filter(a => completedActivities.has(a.id)).length,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
      icon: '🎮'
    },
    cognitivo: {
      total: cognitiveActivities.length,
      completed: cognitiveActivities.filter(a => completedActivities.has(a.id)).length,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      icon: '🧠'
    },
    linguagem: {
      total: languageActivities.length,
      completed: languageActivities.filter(a => completedActivities.has(a.id)).length,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      icon: '💬'
    }
  };

  // Encontrar categoria mais feita
  const mostCompletedCategory = Object.entries(categoryStats).reduce((prev, current) => {
    return current[1].completed > prev[1].completed ? current : prev;
  });

  // Encontrar atividade menos feita (não completada)
  const incompleteActivities = allActivities.filter(a => !completedActivities.has(a.id));
  const leastDoneActivity = incompleteActivities.length > 0 ? incompleteActivities[0] : null;

  // Calcular progresso geral
  const completedCount = allActivities.filter(a => completedActivities.has(a.id)).length;
  const totalCount = allActivities.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Obter informações do perfil
  const profile = getBabyProfile();
  const milestoneProgress = getMilestoneProgress();

  // Gerar insights personalizados
  const generateInsights = () => {
    const insights = [];

    // Insight sobre progresso geral
    if (progressPercentage >= 80) {
      insights.push({
        icon: Star,
        color: 'from-yellow-400 to-orange-500',
        title: 'Parabéns! Você está arrasando!',
        description: `${progressPercentage.toFixed(0)}% das atividades concluídas. Continue assim!`
      });
    } else if (progressPercentage >= 50) {
      insights.push({
        icon: Zap,
        color: 'from-purple-500 to-pink-500',
        title: 'Ótimo progresso!',
        description: `Você já completou ${completedCount} atividades. Está no caminho certo!`
      });
    } else {
      insights.push({
        icon: Target,
        color: 'from-blue-500 to-cyan-500',
        title: 'Vamos começar!',
        description: 'Ainda há muitas atividades incríveis para explorar com seu bebê.'
      });
    }

    // Insight sobre milestones
    if (milestoneProgress.percentage >= 70) {
      insights.push({
        icon: Award,
        color: 'from-green-500 to-emerald-500',
        title: 'Marcos do Desenvolvimento',
        description: `${milestoneProgress.achieved} de ${milestoneProgress.total} marcos alcançados! Seu bebê está se desenvolvendo muito bem.`
      });
    } else if (milestoneProgress.percentage >= 30) {
      insights.push({
        icon: TrendingUp,
        color: 'from-purple-500 to-pink-500',
        title: 'Desenvolvimento em Progresso',
        description: `${milestoneProgress.achieved} marcos alcançados. Continue estimulando seu bebê!`
      });
    }

    // Insight sobre categoria favorita
    if (mostCompletedCategory[1].completed > 0) {
      const categoryName = mostCompletedCategory[0] === 'brincadeira' ? 'Brincadeiras' : 
                          mostCompletedCategory[0] === 'cognitivo' ? 'Atividades Cognitivas' : 
                          'Atividades de Linguagem';
      insights.push({
        icon: Heart,
        color: 'from-pink-500 to-rose-500',
        title: 'Categoria Favorita',
        description: `${categoryName} é a categoria mais praticada! ${mostCompletedCategory[1].icon}`
      });
    }

    // Insight sobre consistência
    if (completedCount >= 5) {
      insights.push({
        icon: Sparkles,
        color: 'from-cyan-500 to-blue-500',
        title: 'Consistência é a chave!',
        description: 'Você está mantendo uma rotina consistente de atividades. Isso é ótimo para o desenvolvimento!'
      });
    }

    return insights;
  };

  const insights = generateInsights();

  // Atividades para exibir (apenas 4 ou todas)
  const activitiesToShow = showAllActivities ? allActivities : allActivities.slice(0, 4);

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

  // Se não for premium, mostrar apenas porcentagem semanal
  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <Navbar />

        <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  📊 Seu Progresso
                </h1>
                {profile && (
                  <p className="text-gray-600 text-lg mt-1">
                    Acompanhe o desenvolvimento de {profile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card de Progresso Semanal (apenas porcentagem) */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Progresso Semanal</h2>
                <p className="text-purple-100">Seu progresso básico</p>
              </div>
              <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>

            {/* Apenas Porcentagem */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
              <p className="text-6xl font-bold mb-2">{progressPercentage.toFixed(0)}%</p>
              <p className="text-purple-100">Atividades concluídas esta semana</p>
            </div>
          </div>

          {/* Conteúdo Bloqueado (fosco) */}
          <div className="relative">
            {/* Overlay fosco */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-10 rounded-3xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Conteúdo Premium
                </h3>
                <p className="text-gray-600 mb-6 max-w-md">
                  Desbloqueie análises detalhadas, insights personalizados, vídeos de evolução e muito mais!
                </p>
                <button
                  onClick={() => router.push('/premium')}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <Crown className="w-6 h-6" />
                  Assinar Premium
                </button>
              </div>
            </div>

            {/* Conteúdo fosco (preview) */}
            <div className="opacity-30 pointer-events-none">
              {/* Insights Personalizados */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  Insights Personalizados
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Análise por Categoria */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  Análise por Categoria
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-xl p-6">
                      <div className="h-20 bg-gray-300 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Conteúdo completo para usuários premium
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Navbar />

      <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                📊 Seu Progresso
              </h1>
              {profile && (
                <p className="text-gray-600 text-lg mt-1">
                  Acompanhe o desenvolvimento de {profile.name}
                </p>
              )}
            </div>
            <button
              onClick={() => router.push('/premium')}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Premium Ativo</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('atividades')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'atividades'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Atividades
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Video className="w-5 h-5" />
            Vídeos de Evolução
            {videos.length > 0 && (
              <span className="bg-white text-purple-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {videos.length}
              </span>
            )}
          </button>
        </div>

        {/* Conteúdo da Tab Atividades */}
        {activeTab === 'atividades' && (
          <>
            {/* Toggle Período */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => setPeriod('weekly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  period === 'weekly'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Semanal
              </button>
              <button
                onClick={() => setPeriod('monthly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  period === 'monthly'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Mensal
              </button>
            </div>

            {/* Card de Progresso Geral */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Progresso {period === 'weekly' ? 'Semanal' : 'Mensal'}</h2>
                  <p className="text-purple-100">Continue assim! Você está indo muito bem 🎉</p>
                </div>
                <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Atividades Concluídas</span>
                  <span className="text-sm font-bold">{completedCount}/{totalCount}</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-purple-100 mt-2">
                  {progressPercentage.toFixed(0)}% do total
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <Calendar className="w-5 h-5 mb-2" />
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-xs text-purple-100">Feitas</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <Target className="w-5 h-5 mb-2" />
                  <p className="text-2xl font-bold">{totalCount - completedCount}</p>
                  <p className="text-xs text-purple-100">Restantes</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <Award className="w-5 h-5 mb-2" />
                  <p className="text-2xl font-bold">{progressPercentage.toFixed(0)}%</p>
                  <p className="text-xs text-purple-100">Completo</p>
                </div>
              </div>
            </div>

            {/* Insights Personalizados */}
            {insights.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  Insights Personalizados
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {insights.map((insight, index) => {
                    const IconComponent = insight.icon;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${insight.color} rounded-xl flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-2">{insight.title}</h3>
                            <p className="text-gray-600 text-sm">{insight.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Análise por Categoria */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                Análise por Categoria
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(categoryStats).map(([key, stats]) => {
                  const percentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

                  return (
                    <div
                      key={key}
                      className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 ${stats.bgColor} rounded-xl flex items-center justify-center text-2xl`}>
                              {stats.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 capitalize">{key}</h3>
                              <p className="text-sm text-gray-600">{stats.completed}/{stats.total} feitas</p>
                            </div>
                          </div>
                        </div>

                        {/* Barra de Progresso */}
                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${stats.color} h-full rounded-full transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className={`text-xs ${stats.textColor} mt-2 font-semibold`}>
                            {percentage.toFixed(0)}% concluído
                          </p>
                        </div>

                        {/* Badge se for a mais feita */}
                        {mostCompletedCategory[0] === key && stats.completed > 0 && (
                          <div className={`${stats.bgColor} ${stats.textColor} px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2`}>
                            <Sparkles className="w-4 h-4" />
                            Categoria mais praticada!
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Atividade Menos Feita (Recomendação) */}
            {leastDoneActivity && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-orange-600" />
                  Atividade Recomendada
                </h2>
                <p className="text-gray-600 mb-4">
                  Que tal experimentar esta atividade? Ela ainda não foi feita!
                </p>

                <div
                  onClick={() => toggleActivity(leastDoneActivity.id)}
                  className="relative bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transition-all hover:shadow-3xl hover:scale-[1.02]"
                >
                  {/* Imagem */}
                  <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100">
                    {leastDoneActivity.imageUrl && leastDoneActivity.imageUrl.trim() !== '' ? (
                      <Image
                        src={leastDoneActivity.imageUrl}
                        alt={leastDoneActivity.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl">🎯</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Experimente!
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 text-2xl mb-2">
                      {leastDoneActivity.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {leastDoneActivity.description}
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg font-semibold text-sm">
                        {leastDoneActivity.ageRange}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold text-sm">
                        {leastDoneActivity.duration}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActivity(leastDoneActivity.id);
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Marcar como Feita
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de Atividades (apenas 4 inicialmente) */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                📋 Todas as Atividades
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {activitiesToShow.map((activity) => {
                  const isCompleted = completedActivities.has(activity.id);

                  return (
                    <div
                      key={activity.id}
                      onClick={() => toggleActivity(activity.id)}
                      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.02] ${
                        isCompleted ? 'ring-4 ring-green-500' : ''
                      }`}
                    >
                      {/* Imagem */}
                      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                        {activity.imageUrl && activity.imageUrl.trim() !== '' ? (
                          <Image
                            src={activity.imageUrl}
                            alt={activity.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl">
                              {activity.category === 'brincadeira' ? '🎮' : activity.category === 'cognitivo' ? '🧠' : '💬'}
                            </span>
                          </div>
                        )}

                        {isCompleted && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full shadow-lg">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      {/* Conteúdo */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-800 text-lg mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {activity.description}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg font-semibold text-xs">
                            {activity.ageRange}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-semibold text-xs">
                            {activity.duration}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleActivity(activity.id);
                          }}
                          className={`w-full py-2 rounded-lg font-semibold text-sm transition-all ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          }`}
                        >
                          {isCompleted ? (
                            <span className="flex items-center justify-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Concluída
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <Circle className="w-4 h-4" />
                              Marcar Feita
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botão Ver Mais */}
              {!showAllActivities && allActivities.length > 4 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllActivities(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                  >
                    Ver Mais Atividades
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-gray-600 mt-3 text-sm">
                    Ainda há {allActivities.length - 4} atividades para descobrir!
                  </p>
                </div>
              )}

              {/* Botão Ver Menos */}
              {showAllActivities && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllActivities(false)}
                    className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                  >
                    Ver Menos
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Conteúdo da Tab Vídeos */}
        {activeTab === 'videos' && (
          <div>
            {/* Header da seção de vídeos */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Video className="w-7 h-7 text-purple-600" />
                    Vídeos de Evolução
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Registre momentos especiais do desenvolvimento do seu bebê (máx. 30 segundos cada)
                  </p>
                </div>
                <button
                  onClick={() => setShowRecordModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Gravar Vídeo
                </button>
              </div>
            </div>

            {/* Grid de vídeos */}
            {videos.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Nenhum vídeo ainda
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Comece a registrar os momentos especiais do desenvolvimento do seu bebê. Cada vídeo pode ter até 30 segundos!
                </p>
                <button
                  onClick={() => setShowRecordModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <Plus className="w-6 h-6" />
                  Gravar Primeiro Vídeo
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gray-900 cursor-pointer" onClick={() => playVideo(video)}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-all">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-purple-600 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                        {video.duration}s
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 truncate">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {new Date(video.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>

                      {/* Ações */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => downloadVideo(video)}
                          className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg font-semibold text-sm hover:bg-purple-200 transition-all flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Baixar
                        </button>
                        <button
                          onClick={() => deleteVideo(video.id)}
                          className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Modal de Gravação */}
            {showRecordModal && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Gravar Vídeo de Evolução</h3>
                      <p className="text-purple-100 text-sm">Máximo de 30 segundos</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowRecordModal(false);
                        if (isRecording) stopRecording();
                      }}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    {/* Input de Título */}
                    {!isRecording && !stream && (
                      <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                          Título do Vídeo
                        </label>
                        <input
                          type="text"
                          value={videoTitle}
                          onChange={(e) => setVideoTitle(e.target.value)}
                          placeholder="Ex: Primeiros passos, Primeira palavra..."
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Preview da Câmera */}
                    <div className="relative bg-gray-900 rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
                      <video
                        ref={previewRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      
                      {isRecording && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 animate-pulse">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          REC {recordingTime}s / 30s
                        </div>
                      )}

                      {!stream && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg font-semibold">Câmera desligada</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Controles */}
                    <div className="flex items-center justify-center gap-4">
                      {!isRecording && !stream && (
                        <button
                          onClick={startRecording}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                        >
                          <Play className="w-6 h-6" />
                          Iniciar Gravação
                        </button>
                      )}

                      {isRecording && (
                        <button
                          onClick={stopRecording}
                          className="bg-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
                        >
                          <StopCircle className="w-6 h-6" />
                          Parar Gravação
                        </button>
                      )}
                    </div>

                    <p className="text-center text-gray-600 text-sm mt-4">
                      {isRecording 
                        ? `Gravando... ${30 - recordingTime}s restantes`
                        : 'Clique em "Iniciar Gravação" para começar'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal de Reprodução */}
            {playingVideo && (
              <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-2xl font-bold">
                      {videos.find(v => v.id === playingVideo)?.title}
                    </h3>
                    <button
                      onClick={() => {
                        setPlayingVideo(null);
                        if (videoRef.current) {
                          videoRef.current.pause();
                          videoRef.current.src = '';
                        }
                      }}
                      className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <video
                    ref={videoRef}
                    controls
                    className="w-full rounded-2xl shadow-2xl"
                    onEnded={() => setPlayingVideo(null)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
