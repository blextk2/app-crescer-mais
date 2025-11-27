"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Crown, 
  CreditCard, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  X,
  ArrowLeft
} from 'lucide-react';

export default function ManageSubscriptionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Simulação de dados de assinatura (em produção, buscar do backend)
  const subscription = {
    id: 'SUB-123456789',
    plan: 'Premium Anual',
    status: 'active',
    price: 299.90,
    nextBilling: '2024-12-15',
    startDate: '2023-12-15',
  };

  const handleCancelSubscription = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/paypal/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          reason: 'Customer requested cancellation',
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Assinatura cancelada com sucesso!');
        setShowCancelModal(false);
        router.push('/dashboard');
      } else {
        alert('Erro ao cancelar assinatura: ' + data.error);
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Erro ao cancelar assinatura. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar ao Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gerenciar Assinatura
            </h1>
            <p className="text-xl text-gray-600">
              Visualize e gerencie sua assinatura Premium
            </p>
          </div>

          {/* Subscription Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Ativa
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {subscription.plan}
                </h2>
                <p className="text-gray-600">
                  R$ {subscription.price.toFixed(2).replace('.', ',')} por ano
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Próxima cobrança</p>
                  <p className="font-bold text-gray-900">
                    {new Date(subscription.nextBilling).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Método de pagamento</p>
                  <p className="font-bold text-gray-900">PayPal</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data de início</p>
                  <p className="font-bold text-gray-900">
                    {new Date(subscription.startDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID da assinatura</p>
                  <p className="font-bold text-gray-900 text-sm">{subscription.id}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-gray-900 mb-4">Benefícios Ativos</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Atividades Ilimitadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Vídeos de Evolução</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Relatórios Avançados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Suporte Prioritário</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/subscription')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all"
            >
              Mudar de Plano
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="bg-white text-red-600 border-2 border-red-200 px-6 py-4 rounded-xl font-bold hover:bg-red-50 transition-all"
            >
              Cancelar Assinatura
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Informações Importantes</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Ao cancelar, você manterá acesso até o fim do período pago</li>
                  <li>• Você pode reativar sua assinatura a qualquer momento</li>
                  <li>• Seus dados e progresso serão mantidos por 90 dias</li>
                  <li>• Para dúvidas, entre em contato com nosso suporte</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Cancelar Assinatura?
              </h2>
              <p className="text-gray-600">
                Você perderá acesso aos benefícios Premium após o fim do período atual.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Você perderá acesso a:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Atividades ilimitadas</li>
                <li>• Vídeos de evolução</li>
                <li>• Relatórios avançados</li>
                <li>• Suporte prioritário</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={isLoading}
                className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Manter Assinatura
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={isLoading}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Cancelando...' : 'Confirmar Cancelamento'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
