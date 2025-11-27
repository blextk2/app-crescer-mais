"use client";

import { CheckCircle2, Circle } from 'lucide-react';
import { Milestone } from '@/lib/types';

interface MilestoneTrackerProps {
  milestones: Milestone[];
  onToggle?: (id: string) => void;
}

const categoryColors = {
  cognitivo: 'text-purple-600 bg-purple-50',
  fisico: 'text-blue-600 bg-blue-50',
  linguagem: 'text-orange-600 bg-orange-50',
  'socio-emocional': 'text-green-600 bg-green-50'
};

export default function MilestoneTracker({ milestones, onToggle }: MilestoneTrackerProps) {
  const achievedCount = milestones.filter(m => m.achieved).length;
  const totalCount = milestones.length;
  const percentage = Math.round((achievedCount / totalCount) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            Marcos de Desenvolvimento
          </h2>
          <p className="text-sm text-gray-500">
            {achievedCount} de {totalCount} alcançados
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {percentage}%
          </div>
          <p className="text-xs text-gray-500">Progresso</p>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Lista de Marcos */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 ${
              milestone.achieved
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200 hover:border-purple-200'
            }`}
          >
            <button
              onClick={() => onToggle?.(milestone.id)}
              className="flex-shrink-0 mt-1 transition-transform hover:scale-110"
            >
              {milestone.achieved ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className={`font-semibold ${milestone.achieved ? 'text-gray-700 line-through' : 'text-gray-800'}`}>
                  {milestone.title}
                </h3>
                <span className="flex-shrink-0 text-xs font-medium text-gray-500">
                  {milestone.ageInMonths} meses
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {milestone.description}
              </p>
              {milestone.achieved && milestone.achievedDate && (
                <p className="text-xs text-green-600 font-medium">
                  Alcançado em {new Date(milestone.achievedDate).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
