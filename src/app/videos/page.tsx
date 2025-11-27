"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/custom/navbar';
import { isPremiumUser } from '@/lib/subscription';
import { 
  Video, 
  Play, 
  Pause, 
  Trash2, 
  Crown,
  Clock,
  Calendar,
  Download,
  Upload
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface VideoRecord {
  id: string;
  url: string;
  thumbnail: string;
  duration: number;
  date: string;
  title: string;
}

export default function VideosPage() {
  const [mounted, setMounted] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoRecord | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const MAX_RECORDING_TIME = 30; // 30 segundos

  useEffect(() => {
    setMounted(true);
    setIsPremium(isPremiumUser());
    
    // Carregar vídeos salvos do localStorage
    const savedVideos = localStorage.getItem('babyVideos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    if (!isPremium) {
      router.push('/subscription');
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: true 
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Criar thumbnail (primeiro frame)
        const video = document.createElement('video');
        video.src = url;
        video.currentTime = 0.1;
        
        video.onloadeddata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0);
          const thumbnail = canvas.toDataURL('image/jpeg');
          
          const newVideo: VideoRecord = {
            id: Date.now().toString(),
            url,
            thumbnail,
            duration: recordingTime,
            date: new Date().toISOString(),
            title: `Vídeo ${new Date().toLocaleDateString('pt-BR')}`
          };

          const updatedVideos = [newVideo, ...videos];
          setVideos(updatedVideos);
          localStorage.setItem('babyVideos', JSON.stringify(updatedVideos));
          
          setRecordingTime(0);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Timer de gravação
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= MAX_RECORDING_TIME) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);

    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      alert('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const deleteVideo = (id: string) => {
    const updatedVideos = videos.filter(v => v.id !== id);
    setVideos(updatedVideos);
    localStorage.setItem('babyVideos', JSON.stringify(updatedVideos));
    if (selectedVideo?.id === id) {
      setSelectedVideo(null);
    }
  };

  const downloadVideo = (video: VideoRecord) => {
    const a = document.createElement('a');
    a.href = video.url;
    a.download = `${video.title}.webm`;
    a.click();
  };

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

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <Navbar />
        <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 rounded-3xl p-12 shadow-2xl">
              <Crown className="w-24 h-24 text-white mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">
                Recurso Premium
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Grave momentos especiais do seu bebê com vídeos de até 30 segundos!
              </p>
              <button
                onClick={() => router.push('/subscription')}
                className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Assinar Agora
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Navbar />

      <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-2">
                  <Video className="w-8 h-8" />
                  Vídeos do Bebê
                </h1>
                <p className="text-purple-100 text-sm sm:text-base">
                  Grave momentos especiais (até 30 segundos cada)
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                <Crown className="w-6 h-6 text-yellow-300 mx-auto mb-1" />
                <span className="text-xs font-semibold">PREMIUM</span>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total de Vídeos</span>
                <span className="text-2xl font-bold">{videos.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Área de Gravação */}
        <div className="mb-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative bg-black aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {isRecording && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="font-bold">GRAVANDO</span>
                </div>
              )}

              {isRecording && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono font-bold">
                    {recordingTime}s / {MAX_RECORDING_TIME}s
                  </span>
                </div>
              )}

              {!isRecording && !stream && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-semibold opacity-75">
                      Pronto para gravar
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-center gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Play className="w-6 h-6" />
                    Iniciar Gravação
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <Pause className="w-6 h-6" />
                    Parar Gravação
                  </button>
                )}
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Limite de gravação: <span className="font-bold text-purple-600">30 segundos</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Vídeos */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Seus Vídeos ({videos.length})
          </h2>

          {videos.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Nenhum vídeo gravado ainda
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Comece gravando momentos especiais do seu bebê!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="relative aspect-video bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-semibold">
                      {video.duration}s
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2">{video.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(video.date).toLocaleDateString('pt-BR')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => downloadVideo(video)}
                        className="flex-1 bg-purple-100 text-purple-600 px-4 py-2 rounded-xl font-semibold hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Baixar
                      </button>
                      <button
                        onClick={() => deleteVideo(video.id)}
                        className="bg-red-100 text-red-600 p-2 rounded-xl hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Reprodução */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-black aspect-video">
                <video
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 text-xl mb-2">
                  {selectedVideo.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedVideo.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedVideo.duration}s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
