import { GraduationCap, Crown, Lock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { classes } from '../data/explanationsData';

interface ExplanationsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  userSubscription: 'free' | 'pro' | 'pro-plus';
}

export function ExplanationsScreen({ onNavigate, userSubscription }: ExplanationsScreenProps) {
  const getSubscriptionBadge = () => {
    switch (userSubscription) {
      case 'pro':
        return <Badge className="bg-blue-500 text-white">Pro</Badge>;
      case 'pro-plus':
        return <Badge className="bg-purple-500 text-white">Pro Plus</Badge>;
      default:
        return <Badge variant="outline">Gratuito</Badge>;
    }
  };

  const getSubscriptionColor = () => {
    switch (userSubscription) {
      case 'pro':
        return 'from-blue-500 to-blue-600';
      case 'pro-plus':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getSubscriptionColor()} px-4 py-8 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Explicações</h1>
              <p className="text-white/80">Conteúdo organizado por série</p>
            </div>
          </div>
          {getSubscriptionBadge()}
        </div>

        {/* Subscription Info */}
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">
                {userSubscription === 'free' && 'Plano Gratuito'}
                {userSubscription === 'pro' && 'Plano Pro'}
                {userSubscription === 'pro-plus' && 'Plano Pro Plus'}
              </h3>
              <p className="text-sm text-white/80">
                {userSubscription === 'free' && 'Acesso limitado ao conteúdo básico'}
                {userSubscription === 'pro' && 'Acesso a conteúdo intermediário e avançado'}
                {userSubscription === 'pro-plus' && 'Acesso completo a todo conteúdo'}
              </p>
            </div>
            {userSubscription === 'free' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onNavigate('subscription')}
                className="bg-white text-gray-800 hover:bg-gray-100"
              >
                <Crown className="w-4 h-4 mr-1" />
                Upgrade
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Selecione sua série</h2>
        </div>

        <div className="space-y-3">
          {classes.map((classItem) => {
            const totalDisciplines = classItem.disciplines.length;
            const freeDisciplines = classItem.disciplines.filter(d => 
              d.topics.some(t => t.requiredPlan === 'free')
            ).length;
            
            return (
              <Card 
                key={classItem.id}
                className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate('disciplines', classItem)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{classItem.grade}º</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">{classItem.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {totalDisciplines} disciplinas disponíveis
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {freeDisciplines} gratuitas
                          </Badge>
                          {userSubscription === 'free' && totalDisciplines > freeDisciplines && (
                            <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                              <Lock className="w-3 h-3 mr-1" />
                              {totalDisciplines - freeDisciplines} premium
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <span>›</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upgrade Prompt for Free Users */}
        {userSubscription === 'free' && (
          <Card className="border-2 border-dashed border-orange-300 bg-orange-50">
            <CardContent className="p-4 text-center">
              <Crown className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Desbloqueie todo o conteúdo</h3>
              <p className="text-gray-600 text-sm mb-3">
                Acesse explicações avançadas, exercícios extras e muito mais
              </p>
              <Button 
                onClick={() => onNavigate('subscription')}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Ver planos
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}