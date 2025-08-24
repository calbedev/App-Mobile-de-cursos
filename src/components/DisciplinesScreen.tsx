import { ArrowLeft, Lock, Calculator, BookOpen, Microscope, Zap, FlaskConical, Leaf } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Class, canAccessContent } from '../data/explanationsData';

interface DisciplinesScreenProps {
  classData: Class;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  userSubscription: 'free' | 'pro' | 'pro-plus';
}

export function DisciplinesScreen({ classData, onNavigate, onBack, userSubscription }: DisciplinesScreenProps) {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      'calculator': Calculator,
      'book-open': BookOpen,
      'microscope': Microscope,
      'zap': Zap,
      'flask-conical': FlaskConical,
      'leaf': Leaf,
    };
    return icons[iconName] || BookOpen;
  };

  const getDisciplineStats = (discipline: any) => {
    const totalTopics = discipline.topics.length;
    const accessibleTopics = discipline.topics.filter((topic: any) => 
      canAccessContent(topic.requiredPlan, userSubscription)
    ).length;
    const freeTopics = discipline.topics.filter((topic: any) => topic.requiredPlan === 'free').length;
    
    return { totalTopics, accessibleTopics, freeTopics };
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">{classData.name}</h1>
            <p className="text-gray-600">Escolha uma disciplina</p>
          </div>
        </div>
      </div>

      {/* Disciplines Grid */}
      <div className="p-4">
        <div className="grid gap-4">
          {classData.disciplines.map((discipline) => {
            const Icon = getIcon(discipline.icon);
            const stats = getDisciplineStats(discipline);
            const hasAccessibleContent = stats.accessibleTopics > 0;
            
            return (
              <Card 
                key={discipline.id}
                className={`border-0 shadow-sm transition-all ${
                  hasAccessibleContent 
                    ? 'hover:shadow-md cursor-pointer' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (hasAccessibleContent) {
                    onNavigate('topics', { 
                      classData, 
                      discipline,
                      disciplineId: discipline.id 
                    });
                  } else {
                    onNavigate('subscription');
                  }
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${discipline.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg">{discipline.name}</h3>
                        {!hasAccessibleContent && (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {stats.totalTopics} tópicos disponíveis
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className="text-xs bg-green-50 text-green-700 border-green-300"
                        >
                          {stats.accessibleTopics} acessíveis
                        </Badge>
                        
                        {userSubscription === 'free' && stats.freeTopics < stats.totalTopics && (
                          <Badge 
                            variant="outline" 
                            className="text-xs text-orange-600 border-orange-300"
                          >
                            <Lock className="w-3 h-3 mr-1" />
                            {stats.totalTopics - stats.freeTopics} premium
                          </Badge>
                        )}
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

        {/* Upgrade Prompt */}
        {userSubscription === 'free' && (
          <Card className="border-2 border-dashed border-blue-300 bg-blue-50 mt-6">
            <CardContent className="p-4 text-center">
              <Lock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Acesse mais conteúdo</h3>
              <p className="text-gray-600 text-sm mb-3">
                Upgrade para Pro e tenha acesso a tópicos avançados de todas as disciplinas
              </p>
              <Button 
                onClick={() => onNavigate('subscription')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Fazer upgrade
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}