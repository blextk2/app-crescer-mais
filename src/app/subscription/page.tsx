"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Crown, 
  Check, 
  ArrowLeft, 
  Sparkles,
  Video,
  TrendingUp,
  Zap,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const plans = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    period: 'para sempre',
    description: 'Perfeito para começar',
    features: [
      'Acesso limitado',
      'Acompanhamento básico',
      'Registro de marcos',
      'Suporte por email',
    ],
    notIncluded: [
      'Vídeos de evolução',
      'Relatórios avançados',
      'Suporte prioritário',
      'Atividades ilimitadas',
    ],
    highlighted: false,
  },
  {
    id: 'monthly',
    name: 'Premium Mensal',
    price: 29.90,
    period: '/mês',
    description: 'Flexibilidade total',
    features: [
      'Atividades ilimitadas',
      'Vídeos de evolução',
      'Relatórios avançados',
      'Suporte prioritário',
      'Análises detalhadas',
      'Sem compromisso',
    ],
    highlighted: false,
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID || '',
  },
  {
    id: 'yearly',
    name: 'Premium Anual',
    price: 299.90,
    period: '/ano',
    savings: 'Economize R$ 58,90',
    description: 'Melhor custo-benefício',
    features: [
      'Tudo do plano mensal',
      '2 meses grátis',
      'Prioridade máxima',
      'Acesso antecipado',
      'Conteúdo exclusivo',
      'Garantia de 30 dias',
    ],
    highlighted: true,
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID || '',
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      const authToken = localStorage.getItem('authToken');
      
      if (user || authToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handlePlanSelect = (planId: string) => {
    setError(null);
    setIsLoading(true);
    
    if (planId === 'free') {
      router.push('/cadastro');
      return;
    }

    // Verificar se usuário está logado antes de processar assinatura
    if (!isAuthenticated) {
      localStorage.setItem('selectedPlan', planId);
      router.push('/login');
      return;
    }

    const plan = plans.find(p => p.id === planId);
    
    if (!plan?.paypalPlanId) {
      setError('⚠️ Plan ID não configurado. Siga as instruções abaixo para configurar o PayPal.');
      setIsLoading(false);
      setShowPayPal(true); // Mostrar modal com instruções
      setSelectedPlan(planId);
      return;
    }
    
    setSelectedPlan(planId);
    
    // Simular pequeno delay para feedback visual
    setTimeout(() => {
      setShowPayPal(true);
      setIsLoading(false);
    }, 500);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  // Configuração do PayPal
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "AXQJylpPtp4HfXsy_fHPASmkma3jY72cgFr6rYUVpkMsrIrdTCPf0elBRKX3bWLGDelMGkVGU3Fzx1tJ";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
            <Crown className="w-4 h-4" />
            Planos e Preços
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Escolha o plano ideal para{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              sua família
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Comece grátis e faça upgrade quando quiser. Sem compromisso, cancele a qualquer momento.
          </p>
        </div>
      </section>

      {/* Error Alert */}
      {error && !showPayPal && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Erro ao processar assinatura</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Plans Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl shadow-xl p-8 transition-all hover:shadow-2xl ${
                  plan.highlighted ? 'ring-4 ring-purple-500 scale-105' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm">
                    Mais Popular
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute -top-4 right-4 bg-green-500 text-white px-4 py-1 rounded-full font-bold text-xs">
                    {plan.savings}
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2).replace('.', ',')}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600 text-lg">{plan.period}</span>
                    )}
                  </div>
                  {plan.price === 0 && (
                    <span className="text-gray-600 text-sm">{plan.period}</span>
                  )}
                </div>

                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isLoading && selectedPlan === plan.id}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all mb-6 flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl disabled:opacity-50'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:opacity-50'
                  }`}
                >
                  {isLoading && selectedPlan === plan.id ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    plan.price === 0 ? 'Começar Grátis' : 'Assinar Agora'
                  )}
                </button>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded && plan.notIncluded.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 opacity-40">
                      <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500 line-through">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PayPal Modal */}
      {showPayPal && selectedPlanData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Finalizar Assinatura
              </h2>
              <p className="text-gray-600">
                {selectedPlanData.name} - R$ {selectedPlanData.price.toFixed(2).replace('.', ',')}
                {selectedPlanData.period}
              </p>
            </div>

            {!selectedPlanData.paypalPlanId ? (
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 mb-4">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-orange-900 mb-2 text-lg">🔧 Configuração Necessária</h3>
                    <p className="text-orange-800 text-sm mb-4">
                      Para ativar este plano, você precisa criar os <strong>Plan IDs</strong> no PayPal e configurar as variáveis de ambiente.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 space-y-4 text-sm">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                      Acesse o PayPal Developer
                    </h4>
                    <p className="text-gray-700 ml-8">
                      Vá para <a href="https://developer.paypal.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">developer.paypal.com</a> e faça login
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                      Crie os Planos de Assinatura
                    </h4>
                    <p className="text-gray-700 ml-8 mb-2">
                      No menu lateral, vá em <strong>Apps & Credentials</strong> → <strong>Sandbox</strong> → <strong>Create App</strong> (se ainda não tiver)
                    </p>
                    <p className="text-gray-700 ml-8 mb-2">
                      Depois vá em <strong>Billing Plans</strong> e crie 2 planos:
                    </p>
                    <ul className="ml-12 space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">•</span>
                        <div>
                          <strong>Plano Mensal:</strong> R$ 29,90/mês
                          <br />
                          <span className="text-xs text-gray-500">Copie o Plan ID gerado (formato: P-XXXXXXXXXXXXX)</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600">•</span>
                        <div>
                          <strong>Plano Anual:</strong> R$ 299,90/ano
                          <br />
                          <span className="text-xs text-gray-500">Copie o Plan ID gerado (formato: P-XXXXXXXXXXXXX)</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                      Configure as Variáveis de Ambiente
                    </h4>
                    <p className="text-gray-700 ml-8 mb-2">
                      Clique no <strong>banner laranja</strong> no topo da página e adicione:
                    </p>
                    <div className="ml-8 bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                      <div>NEXT_PUBLIC_PAYPAL_CLIENT_ID=seu_client_id</div>
                      <div>NEXT_PUBLIC_PAYPAL_MONTHLY_PLAN_ID=P-XXX (mensal)</div>
                      <div>NEXT_PUBLIC_PAYPAL_YEARLY_PLAN_ID=P-XXX (anual)</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                      Teste a Integração
                    </h4>
                    <p className="text-gray-700 ml-8">
                      Após configurar, recarregue a página e tente assinar novamente. Use as <strong>contas sandbox</strong> do PayPal para testar.
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>💡 Dica:</strong> No modo sandbox, você pode usar contas de teste criadas no PayPal Developer para simular pagamentos sem cobranças reais.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {!paypalLoaded && (
                  <div className="flex items-center justify-center gap-2 text-gray-600 py-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Carregando PayPal...</span>
                  </div>
                )}
                
                <PayPalScriptProvider 
                  options={{
                    clientId: paypalClientId,
                    currency: "BRL",
                    intent: "subscription",
                    vault: true,
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: 'vertical',
                      color: 'blue',
                      shape: 'rect',
                      label: 'subscribe',
                    }}
                    createSubscription={(data, actions) => {
                      if (!selectedPlanData.paypalPlanId) {
                        throw new Error('Plan ID não configurado');
                      }
                      
                      console.log('Creating subscription with Plan ID:', selectedPlanData.paypalPlanId);
                      
                      return actions.subscription.create({
                        plan_id: selectedPlanData.paypalPlanId,
                      });
                    }}
                    onApprove={async (data, actions) => {
                      console.log('Subscription approved:', data);
                      
                      // Salvar informações da assinatura
                      localStorage.setItem('subscriptionId', data.subscriptionID);
                      localStorage.setItem('subscriptionPlan', selectedPlan || '');
                      localStorage.setItem('isPremium', 'true');
                      
                      // Mostrar mensagem de sucesso
                      alert('✅ Assinatura realizada com sucesso! Bem-vindo ao Premium!');
                      
                      // Redirecionar para página de progresso
                      router.push('/progresso');
                    }}
                    onError={(err) => {
                      console.error('PayPal error:', err);
                      
                      let errorMessage = 'Erro ao conectar com o PayPal.';
                      
                      if (err && typeof err === 'object' && 'message' in err) {
                        errorMessage = `Erro: ${err.message}`;
                      }
                      
                      setError(errorMessage);
                      setShowPayPal(false);
                      setSelectedPlan(null);
                    }}
                    onCancel={() => {
                      setShowPayPal(false);
                      setSelectedPlan(null);
                    }}
                    onInit={() => {
                      setPaypalLoaded(true);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}

            <button
              onClick={() => {
                setShowPayPal(false);
                setSelectedPlan(null);
                setError(null);
                setPaypalLoaded(false);
              }}
              className="w-full mt-4 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o Premium?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desbloqueie todo o potencial do Crescer+ e leve o desenvolvimento do seu bebê para o próximo nível
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Atividades Ilimitadas
              </h3>
              <p className="text-gray-600 text-sm">
                Acesso completo a todas as atividades e categorias
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Vídeos de Evolução
              </h3>
              <p className="text-gray-600 text-sm">
                Grave e salve momentos especiais do desenvolvimento
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Relatórios Avançados
              </h3>
              <p className="text-gray-600 text-sm">
                Análises detalhadas do progresso em todas as áreas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Suporte Prioritário
              </h3>
              <p className="text-gray-600 text-sm">
                Atendimento exclusivo e respostas rápidas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Posso cancelar a qualquer momento?
              </summary>
              <p className="text-gray-600 mt-3">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. 
                Seu acesso premium continuará até o final do período pago.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Como funciona o período de teste?
              </summary>
              <p className="text-gray-600 mt-3">
                Você pode começar com o plano gratuito e fazer upgrade quando quiser. 
                Não há período de teste, mas oferecemos garantia de 30 dias no plano anual.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Quais formas de pagamento são aceitas?
              </summary>
              <p className="text-gray-600 mt-3">
                Aceitamos pagamentos via PayPal, que permite cartão de crédito, débito e saldo PayPal.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg">
              <summary className="font-bold text-gray-900 cursor-pointer">
                Posso mudar de plano depois?
              </summary>
              <p className="text-gray-600 mt-3">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                As mudanças entram em vigor no próximo ciclo de cobrança.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se a milhares de famílias que já transformaram o desenvolvimento dos seus bebês
          </p>
          <button
            onClick={() => router.push('/cadastro')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all"
          >
            Começar Grátis Agora
          </button>
        </div>
      </section>
    </div>
  );
}
