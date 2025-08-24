import { Calendar, Trophy, Target, Clock, TrendingUp, Award, BookOpen, CheckCircle, Flame, Zap, Brain, Dumbbell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function ActivityScreen() {
  const stats = [
    { label: 'Cursos Concluídos', value: '12', icon: Trophy, color: 'text-green-600' },
    { label: 'Horas Estudadas', value: '156h', icon: Clock, color: 'text-blue-600' },
    { label: 'Sequência', value: '7 dias', icon: Target, color: 'text-orange-600' },
    { label: 'Certificados', value: '8', icon: Award, color: 'text-purple-600' },
  ];

  const weeklyProgress = [
    { day: 'Dom', hours: 2, completed: true },
    { day: 'Seg', hours: 3, completed: true },
    { day: 'Ter', hours: 1.5, completed: true },
    { day: 'Qua', hours: 2.5, completed: true },
    { day: 'Qui', hours: 4, completed: true },
    { day: 'Sex', hours: 2, completed: true },
    { day: 'Sáb', hours: 3, completed: true },
  ];

  const achievements = [
    {
      id: 1,
      title: 'Primeira Semana',
      description: 'Complete 7 dias consecutivos de estudo',
      icon: Flame,
      completed: true,
      progress: 100
    },
    {
      id: 2,
      title: 'Maratonista',
      description: 'Estude por mais de 50 horas',
      icon: Dumbbell,
      completed: true,
      progress: 100
    },
    {
      id: 3,
      title: 'Colecionador',
      description: 'Complete 10 cursos diferentes',
      icon: BookOpen,
      completed: true,
      progress: 100
    },
    {
      id: 4,
      title: 'Especialista',
      description: 'Complete um curso avançado',
      icon: Brain,
      completed: false,
      progress: 60
    },
    {
      id: 5,
      title: 'Dedicado',
      description: 'Mantenha uma sequência de 30 dias',
      icon: Zap,
      completed: false,
      progress: 23
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'completed',
      title: 'Concluiu: React Native Avançado',
      time: '2 horas atrás',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'started',
      title: 'Iniciou: Design System UI/UX',
      time: '1 dia atrás',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Conquistou: Primeira Semana',
      time: '2 dias atrás',
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'completed',
      title: 'Concluiu aula: Gerenciamento de Estado',
      time: '3 dias atrás',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ];

  const currentCourses = [
    {
      id: 1,
      title: 'Design System UI/UX',
      progress: 45,
      totalLessons: 24,
      completedLessons: 11,
      lastAccessed: '2 horas atrás'
    },
    {
      id: 2,
      title: 'Flutter para Iniciantes',
      progress: 78,
      totalLessons: 18,
      completedLessons: 14,
      lastAccessed: '1 dia atrás'
    },
    {
      id: 3,
      title: 'Marketing Digital 2024',
      progress: 23,
      totalLessons: 32,
      completedLessons: 7,
      lastAccessed: '3 dias atrás'
    }
  ];

  const maxHours = Math.max(...weeklyProgress.map(day => day.hours));

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">Suas atividades</h1>
        <p className="text-gray-600">Acompanhe seu progresso e conquistas</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Weekly Progress */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Progresso semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between space-x-2 mb-4">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex-1 text-center">
                  <div 
                    className={`bg-green-500 rounded-t-lg mb-2 transition-all duration-300 ${
                      day.completed ? 'opacity-100' : 'opacity-40'
                    }`}
                    style={{ 
                      height: `${(day.hours / maxHours) * 60}px`,
                      minHeight: '8px'
                    }}
                  ></div>
                  <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                  <div className="text-xs font-medium text-gray-800">{day.hours}h</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Meta diária: 2h</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span>+15% esta semana</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger value="progress">Progresso</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4 mt-4">
            <h3 className="font-semibold text-gray-800">Cursos em andamento</h3>
            {currentCourses.map((course) => (
              <Card key={course.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800">{course.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {course.progress}%
                    </Badge>
                  </div>
                  <Progress value={course.progress} className="h-2 mb-3" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{course.completedLessons}/{course.totalLessons} aulas</span>
                    <span>Último acesso: {course.lastAccessed}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 mt-4">
            <h3 className="font-semibold text-gray-800">Suas conquistas</h3>
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <Card key={achievement.id} className={`border-0 shadow-sm ${
                  achievement.completed ? 'bg-green-50 border-green-200' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          achievement.completed ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                          {achievement.completed && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        {!achievement.completed && (
                          <div>
                            <Progress value={achievement.progress} className="h-2 mb-1" />
                            <span className="text-xs text-gray-500">{achievement.progress}% concluído</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-4">
            <h3 className="font-semibold text-gray-800">Atividade recente</h3>
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <Card key={activity.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-5 h-5 ${activity.color} mt-0.5`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}