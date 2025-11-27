"use client";

import { Clock, CheckCircle2, Circle } from 'lucide-react';
import { Activity } from '@/lib/types';

interface ActivityCardProps {
  activity: Activity;
  onToggle?: (id: string) => void;
}

const categoryColors = {
  cognitivo: 'from-purple-500 to-pink-500',
  fisico: 'from-blue-500 to-cyan-500',
  linguagem: 'from-orange-500 to-yellow-500',
  'socio-emocional': 'from-green-500 to-emerald-500'
};

const categoryLabels = {
  cognitivo: 'Cognitivo',
  fisico: 'Físico',
  linguagem: 'Linguagem',
  'socio-emocional': 'Sócio-emocional'
};

export default function ActivityCard({ activity, onToggle }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header com gradiente */}
      <div className={`h-2 bg-gradient-to-r ${categoryColors[activity.category]}`} />
      
      <div className="p-5">
        {/* Título e Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-gray-800 flex-1">
            {activity.title}
          </h3>
          <button
            onClick={() => onToggle?.(activity.id)}
            className="flex-shrink-0 transition-transform hover:scale-110"
          >
            {activity.completed ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {activity.description}
        </p>

        {/* Metadados */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColors[activity.category]}`}>
            {categoryLabels[activity.category]}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {activity.ageRange}
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            <Clock className="w-3 h-3" />
            {activity.duration}
          </span>
        </div>

        {/* Materiais */}
        {activity.materials && activity.materials.length > 0 && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-2">Materiais:</p>
            <div className="flex flex-wrap gap-1">
              {activity.materials.map((material, index) => (
                <span key={index} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                  {material}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
