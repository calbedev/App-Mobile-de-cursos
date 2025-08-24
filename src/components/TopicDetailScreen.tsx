import { ArrowLeft, Play, PenTool, Lock, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Class, Discipline, Topic, canAccessContent } from '../data/explanationsData';

interface TopicDetailScreenProps {
  topicData: {
    classData: Class;
    discipline: Discipline;
    topic: Topic;
    topicId: string;
  };
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  userSubscription: 'free' | 'pro' | 'pro-plus';
}

export function TopicDetailScreen({ topicData, onNavigate, onBack, userSubscription }: TopicDetailScreenProps) {
  const { classData, discipline, topic } = topicData;

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

  const accessibleLessons = topic.lessons.filter(lesson => 
    canAccessContent(lesson.requiredPlan, userSubscription)
  );

  const accessibleExercises = topic.exercises.filter(exercise => 
    canAccessContent(exercise.requiredPlan, userSubscription)
  );

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">{topic.name}</h1>
            <p className="text-gray-600">{discipline.name} • {classData.name}</p>
          </div>
          {getPlanBadge(topic.requiredPlan)}
        </div>

        {/* Topic Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-semibold text-blue-800">{accessibleLessons.length} aulas</div>
                <div className="text-xs text-blue-600">disponíveis</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <PenTool className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-semibold text-green-800">{accessibleExercises.length} exercícios</div>
                <div className="text-xs text-green-600">disponíveis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="p-4">
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
            <TabsTrigger value="lessons">Aulas</TabsTrigger>
            <TabsTrigger value="exercises">Exercícios</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-3 mt-4">
            {topic.lessons.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <Play className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-800 mb-1">Nenhuma aula disponível</h3>
                  <p className="text-gray-600 text-sm">As aulas para este tópico ainda não foram adicionadas.</p>
                </CardContent>
              </Card>
            ) : (
              topic.lessons.map((lesson, index) => {
                const canAccess = canAccessContent(lesson.requiredPlan, userSubscription);
                
                return (
                  <Card 
                    key={lesson.id}
                    className={`border-0 shadow-sm transition-all ${
                      canAccess 
                        ? 'hover:shadow-md cursor-pointer' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (canAccess) {
                        // Navigate to video player (reusing existing functionality)
                        onNavigate('videoPlayer', {
                          course: {
                            title: `${discipline.name} - ${topic.name}`,
                            instructor: 'Professor EduApp'
                          },
                          lesson: {
                            title: lesson.title,
                            duration: lesson.duration,
                            free: lesson.requiredPlan === 'free'
                          }
                        });
                      } else {
                        onNavigate('subscription');
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {canAccess ? (
                            <Play className="w-6 h-6 text-blue-600" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 text-sm">{lesson.title}</h3>
                            <div className="flex items-center space-x-2">
                              {getPlanBadge(lesson.requiredPlan)}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{lesson.duration}</span>
                            </div>
                            
                            {!canAccess && (
                              <span className="text-xs text-orange-600">
                                Requer upgrade
                              </span>
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
              })
            )}
          </TabsContent>

          <TabsContent value="exercises" className="space-y-3 mt-4">
            {topic.exercises.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <PenTool className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-800 mb-1">Nenhum exercício disponível</h3>
                  <p className="text-gray-600 text-sm">Os exercícios para este tópico ainda não foram adicionados.</p>
                </CardContent>
              </Card>
            ) : (
              topic.exercises.map((exercise, index) => {
                const canAccess = canAccessContent(exercise.requiredPlan, userSubscription);
                
                return (
                  <Card 
                    key={exercise.id}
                    className={`border-0 shadow-sm transition-all ${
                      canAccess 
                        ? 'hover:shadow-md cursor-pointer' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (canAccess) {
                        onNavigate('exercise', exercise);
                      } else {
                        onNavigate('subscription');
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {canAccess ? (
                            <PenTool className="w-6 h-6 text-green-600" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 text-sm">{exercise.title}</h3>
                            <div className="flex items-center space-x-2">
                              {getPlanBadge(exercise.requiredPlan)}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                              {exercise.questions.length} questões
                            </span>
                            
                            {!canAccess && (
                              <span className="text-xs text-orange-600">
                                Requer upgrade
                              </span>
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
              })
            )}
          </TabsContent>
        </Tabs>

        {/* Upgrade Prompt */}
        {userSubscription === 'free' && (topic.lessons.some(l => l.requiredPlan !== 'free') || topic.exercises.some(e => e.requiredPlan !== 'free')) && (
          <Card className="border-2 border-dashed border-orange-300 bg-orange-50 mt-6">
            <CardContent className="p-4 text-center">
              <Lock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Conteúdo premium disponível</h3>
              <p className="text-gray-600 text-sm mb-3">
                Faça upgrade para acessar todas as aulas e exercícios deste tópico
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