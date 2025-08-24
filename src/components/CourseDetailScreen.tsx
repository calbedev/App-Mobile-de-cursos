import { useState } from 'react';
import { ArrowLeft, Star, Users, Clock, Play, Download, Share, Heart, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseDetailScreenProps {
  course: any;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function CourseDetailScreen({ course, onNavigate, onBack }: CourseDetailScreenProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const lessons = [
    { id: 1, title: 'Introdução ao Curso', duration: '5:30', completed: true, free: true },
    { id: 2, title: 'Configurando o Ambiente', duration: '12:45', completed: true, free: true },
    { id: 3, title: 'Primeiros Passos', duration: '18:20', completed: true, free: false },
    { id: 4, title: 'Componentes Básicos', duration: '25:15', completed: false, free: false },
    { id: 5, title: 'Navegação entre Telas', duration: '22:10', completed: false, free: false },
    { id: 6, title: 'Gerenciamento de Estado', duration: '30:45', completed: false, free: false },
    { id: 7, title: 'Integração com APIs', duration: '28:30', completed: false, free: false },
    { id: 8, title: 'Publicação na Store', duration: '15:20', completed: false, free: false },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Marina Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c9dc?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2 dias atrás',
      comment: 'Excelente curso! O instrutor explica de forma muito clara e os exercícios são práticos.'
    },
    {
      id: 2,
      name: 'Pedro Lima',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      date: '1 semana atrás',
      comment: 'Muito bom conteúdo, me ajudou bastante no meu projeto atual.'
    },
    {
      id: 3,
      name: 'Julia Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2 semanas atrás',
      comment: 'Recomendo para todos que querem aprender React Native!'
    }
  ];

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header with Image */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-600">
          <ImageWithFallback
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Navigation */}
        <div className="absolute top-6 left-4 right-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button 
            size="lg"
            className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            onClick={() => onNavigate('videoPlayer', { course, lesson: lessons.find(l => l.free) })}
          >
            <Play className="w-8 h-8 text-white fill-current" />
          </Button>
        </div>
      </div>

      {/* Course Info */}
      <div className="px-4 py-6 bg-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h1>
            <p className="text-gray-600 mb-3">por {course.instructor}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                <span className="text-sm font-medium">{course.rating}</span>
                <span className="text-sm text-gray-500 ml-1">(248 avaliações)</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">{course.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{course.duration}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800">{course.level}</Badge>
              <Badge variant="outline">{course.category}</Badge>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 mb-2">{course.price}</div>
            <Button className="w-full bg-green-500 hover:bg-green-600 mb-2">
              Comprar agora
            </Button>
            <Button variant="outline" className="w-full text-sm">
              Adicionar ao carrinho
            </Button>
          </div>
        </div>

        {/* Progress (if enrolled) */}
        {progressPercentage > 0 && (
          <Card className="mb-4 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">Seu progresso</span>
                <span className="text-sm text-green-600">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-green-700 mt-2">
                {completedLessons} de {lessons.length} aulas concluídas
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mx-4 mb-0 bg-gray-100">
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="lessons">Aulas</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="px-4 py-6 space-y-6 mt-0">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Descrição do curso</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Aprenda React Native do zero ao avançado com este curso completo. Você irá dominar todos os conceitos 
                fundamentais e avançados para criar aplicativos móveis profissionais para iOS e Android.
              </p>
              <p className="text-gray-600 leading-relaxed">
                O curso inclui projetos práticos, exercícios e tudo que você precisa para se tornar um desenvolvedor 
                React Native profissional.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">O que você vai aprender</h3>
              <div className="space-y-2">
                {[
                  'Fundamentos do React Native',
                  'Navegação entre telas',
                  'Gerenciamento de estado',
                  'Integração com APIs REST',
                  'Publicação nas lojas',
                  'Boas práticas de desenvolvimento'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Sobre o instrutor</h3>
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
                  <AvatarFallback>{course.instructor.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{course.instructor}</h4>
                  <p className="text-sm text-gray-600 mb-2">Desenvolvedor Mobile Sênior</p>
                  <p className="text-sm text-gray-600">
                    Mais de 8 anos de experiência em desenvolvimento mobile. Já criou mais de 50 aplicativos 
                    e ensina para milhares de alunos ao redor do mundo.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="px-4 py-6 mt-0">
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <Card 
                  key={lesson.id}
                  className={`cursor-pointer transition-all ${
                    lesson.free || lesson.completed 
                      ? 'hover:shadow-md' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (lesson.free || lesson.completed) {
                      onNavigate('videoPlayer', { course, lesson });
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : lesson.free ? (
                          <Play className="w-4 h-4 text-gray-600" />
                        ) : (
                          <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                          <div className="flex items-center space-x-2">
                            {lesson.free && (
                              <Badge variant="outline" className="text-xs">Grátis</Badge>
                            )}
                            <div className="flex items-center text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              <span className="text-sm">{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="px-4 py-6 mt-0">
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">{review.name}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? 'text-yellow-500 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}