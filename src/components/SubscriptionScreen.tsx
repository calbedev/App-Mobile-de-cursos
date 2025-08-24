import { ArrowLeft, Check, Crown, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface SubscriptionScreenProps {
  currentPlan: 'free' | 'pro' | 'pro-plus';
  onSubscriptionChange: (plan: 'free' | 'pro' | 'pro-plus') => void;
  onBack: () => void;
}

export function SubscriptionScreen({ currentPlan, onSubscriptionChange, onBack }: SubscriptionScreenProps) {
  const plans = [
    {
      id: 'free' as const,
      name: 'Gratuito',
      price: 'R$ 0',
      period: 'para sempre',
      icon: Star,
      color: 'bg-gray-500',
      features: [
        'Acesso limitado às explicações básicas',
        'Exercícios básicos',
        'Suporte da comunidade',
        'Progresso básico'
      ],
      limitations: [
        'Apenas conteúdo gratuito',
        'Exercícios limitados',
        'Sem certificados'
      ]
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      price: 'R$ 29,90',
      period: 'por mês',
      icon: Crown,
      color: 'bg-blue-500',
      popular: true,
      features: [
        'Acesso a explicações intermediárias',
        'Todos os exercícios básicos e intermediários',
        'Suporte prioritário',
        'Progresso detalhado',
        'Certificados de conclusão',
        'Download de materiais'
      ]
    },
    {
      id: 'pro-plus' as const,
      name: 'Pro Plus',
      price: 'R$ 49,90',
      period: 'por mês',
      icon: Zap,
      color: 'bg-purple-500',
      features: [
        'Acesso completo a todas as explicações',
        'Todos os exercícios disponíveis',
        'Suporte VIP',
        'Análise avançada de progresso',
        'Certificados premium',
        'Download ilimitado',
        'Acesso antecipado a novos conteúdos',
        'Sessões de mentoria mensais'
      ]
    }
  ];

  const handleSelectPlan = (planId: 'free' | 'pro' | 'pro-plus') => {
    if (planId === currentPlan) return;
    
    // Simulate payment/subscription process
    onSubscriptionChange(planId);
  };

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Escolha seu plano</h1>
            <p className="text-white/80">Desbloqueie todo o potencial do EduApp</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="font-semibold mb-2">✨ Oferta especial</h3>
          <p className="text-sm text-white/90">
            Primeira semana grátis em qualquer plano pago!
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="p-4 space-y-4 -mt-4">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = plan.id === currentPlan;
          
          return (
            <Card 
              key={plan.id}
              className={`border-2 transition-all relative overflow-hidden ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg' 
                  : isCurrentPlan
                  ? 'border-green-500 shadow-lg'
                  : 'border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium">
                  Mais popular
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs font-medium">
                  Plano atual
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${plan.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-sm text-gray-600">{plan.period}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations && (
                    <div className="border-t pt-3 mt-3">
                      <p className="text-xs text-gray-500 mb-2">Limitações:</p>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-xs text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrentPlan}
                  className={`w-full ${
                    isCurrentPlan
                      ? 'bg-green-500 hover:bg-green-500 cursor-default'
                      : plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : plan.id === 'pro-plus'
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {isCurrentPlan 
                    ? 'Plano atual' 
                    : plan.id === 'free' 
                    ? 'Continuar gratuito'
                    : `Assinar ${plan.name}`
                  }
                </Button>

                {plan.id !== 'free' && !isCurrentPlan && (
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Cancele a qualquer momento
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* FAQ Section */}
        <Card className="border-0 shadow-sm mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Perguntas frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Posso mudar de plano a qualquer momento?</h4>
              <p className="text-gray-600">Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Como funciona a primeira semana grátis?</h4>
              <p className="text-gray-600">Você tem 7 dias para testar qualquer plano pago sem custo. Cancele antes do fim do período se não gostar.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Os certificados são reconhecidos?</h4>
              <p className="text-gray-600">Nossos certificados são digitais e podem ser compartilhados em redes profissionais como LinkedIn.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}