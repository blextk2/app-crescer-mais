"use client";

import { PlayActivity } from '@/lib/play-activities';
import { Clock, Users, Lightbulb, CheckCircle2 } from 'lucide-react';

interface PlayActivityCardProps {
  activity: PlayActivity;
  isLocked?: boolean;
  onUnlock?: () => void;
}

const categoryColors = {
  sensorial: 'from-blue-500 to-cyan-500',
  motor: 'from-green-500 to-emerald-500',
  cognitivo: 'from-purple-500 to-pink-500',
  social: 'from-orange-500 to-yellow-500'
};

const categoryLabels = {
  sensorial: 'Sensorial',
  motor: 'Motor',
  cognitivo: 'Cognitivo',
  social: 'Social'
};

export default function PlayActivityCard({ activity, isLocked = false, onUnlock }: PlayActivityCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
      {/* Header */}
      <div className={`bg-gradient-to-r ${categoryColors[activity.category]} p-4 text-white relative`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold flex-1">{activity.title}</h3>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            {categoryLabels[activity.category]}
          </span>
        </div>
        <p className="text-white/90 text-sm">{activity.description}</p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Info Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{activity.ageRange}</span>
          </div>
        </div>

        {/* Materials */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            Materiais Necessários:
          </h4>
          <div className="flex flex-wrap gap-2">
            {activity.materials.map((material, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium"
              >
                {material}
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Como Fazer:</h4>
          <ol className="space-y-2">
            {activity.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="flex-1">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Benefícios:</h4>
          <div className="space-y-2">
            {activity.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Conteúdo Premium</h3>
              <p className="text-gray-600 text-sm mb-4">
                Assine o plano Premium para desbloquear esta atividade
              </p>
              <button
                onClick={onUnlock}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Ver Planos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
