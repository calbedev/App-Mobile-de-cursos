import { ArrowLeft, Lock, Play, PenTool, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Class, Discipline, canAccessContent } from '../data/explanationsData';

interface TopicsScreenProps {
  disciplineData: {
    classData: Class;
    discipline: Discipline;
    disciplineId: string;
  };
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  userSubscription: 'free' | 'pro' | 'pro-plus';
}

export function TopicsScreen({ disciplineData, onNavigate, onBack, userSubscription }: TopicsScreenProps) {
  const { classData, discipline } = disciplineData;

  const getTopicStats = (topic: any) => {
    const totalLessons = topic.lessons.length;
    const totalExercises = topic.exercises.length;
    const accessibleLessons = topic.lessons.filter((lesson: any) => 
      canAccessContent(lesson.requiredPlan, userSubscription)
    ).length;
    const accessibleExercises = topic.exercises.filter((exercise: any) => 
      canAccessContent(exercise.requiredPlan, userSubscription)
    ).length;
    
    return { totalLessons, totalExercises, accessibleLessons, accessibleExercises };
  };

  const getPlanBadge = (requiredPlan: 'free' | 'pro' | 'pro-plus') => {
    switch (requiredPlan) {
      case 'pro':
        return <Badge className="bg-blue-500 text-white text-xs">Pro</Badge>;
      case 'pro-plus':
        return <Badge className="bg-purple-500 text-white text-xs">Pro Plus</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Gratuito</Badge>;
    }
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
            <h1 className="text-xl font-semibold text-gray-800">{discipline.name}</h1>
            <p className="text-gray-600">{classData.name} • Tópicos disponíveis</p>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="p-4 space-y-4">
        {discipline.topics.map((topic, index) => {
          const stats = getTopicStats(topic);
          const canAccess = canAccessContent(topic.requiredPlan, userSubscription);
          const hasContent = stats.totalLessons > 0 || stats.totalExercises > 0;
          
          return (
            <Card 
              key={topic.id}
              className={`border-0 shadow-sm transition-all ${
                canAccess && hasContent
                  ? 'hover:shadow-md cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => {
                if (canAccess && hasContent) {
                  onNavigate('topicDetail', {
                    classData,
                    discipline,
                    topic,
                    topicId: topic.id
                  });
                } else if (!canAccess) {
                  onNavigate('subscription');
                }
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-gray-600">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 text-base">{topic.name}</h3>
                      <div className="flex items-center space-x-2">
                        {getPlanBadge(topic.requiredPlan)}
                        {!canAccess && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          {canAccess ? stats.accessibleLessons : 0}/{stats.totalLessons} aulas
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <PenTool className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">
                          {canAccess ? stats.accessibleExercises : 0}/{stats.totalExercises} exercícios
                        </span>
                      </div>
                    </div>
                    
                    {canAccess && topic.lessons.length > 0 && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>
                          {topic.lessons.reduce((total, lesson) => {
                            const minutes = parseInt(lesson.duration.replace('min', ''));
                            return total + minutes;
                          }, 0)} min total
                        </span>
                      </div>
                    )}
                    
                    {!canAccess && (
                      <p className="text-sm text-gray-500 mt-2">
                        Faça upgrade para acessar este conteúdo
                      </p>
                    )}
                  </div>
                  
                  <div className="text-gray-400">
                    <span>›</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Upgrade Prompt */}
        {userSubscription !== 'pro-plus' && (
          <Card className="border-2 border-dashed border-purple-300 bg-purple-50">
            <CardContent className="p-4 text-center">
              <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">
                {userSubscription === 'free' ? 'Acesse conteúdo premium' : 'Acesse conteúdo Pro Plus'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {userSubscription === 'free' 
                  ? 'Desbloqueie tópicos avançados e exercícios extras'
                  : 'Acesse os tópicos mais avançados com Pro Plus'
                }
              </p>
              <Button 
                onClick={() => onNavigate('subscription')}
                className="bg-purple-500 hover:bg-purple-600"
              >
                {userSubscription === 'free' ? 'Ver planos' : 'Upgrade para Pro Plus'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}