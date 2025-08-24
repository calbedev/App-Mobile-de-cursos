import { Bell, Search, Play, Clock, Star, Users, Code, Palette, TrendingUp, Briefcase } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const continueCourses = [
    {
      id: 1,
      title: 'React Native Avançado',
      instructor: 'Maria Silva',
      progress: 75,
      duration: '4h 30min',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Design System UI/UX',
      instructor: 'João Santos',
      progress: 45,
      duration: '6h 15min',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=200&fit=crop'
    }
  ];

  const categories = [
    { id: 1, name: 'Programação', icon: Code, courses: 142, color: 'bg-blue-500' },
    { id: 2, name: 'Design', icon: Palette, courses: 89, color: 'bg-purple-500' },
    { id: 3, name: 'Marketing', icon: TrendingUp, courses: 67, color: 'bg-orange-500' },
    { id: 4, name: 'Negócios', icon: Briefcase, courses: 54, color: 'bg-green-500' },
  ];

  const popularCourses = [
    {
      id: 3,
      title: 'Flutter para Iniciantes',
      instructor: 'Ana Costa',
      rating: 4.8,
      students: 1234,
      price: 'R$ 89,90',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Figma Masterclass',
      instructor: 'Pedro Lima',
      rating: 4.9,
      students: 2156,
      price: 'R$ 129,90',
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612c9dc?w=48&h=48&fit=crop&crop=face" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Olá, Ana!</h1>
              <p className="text-gray-600 text-sm">Pronta para aprender hoje?</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onNavigate('explore')}>
              <Search className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Continue Assistindo */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Continue assistindo</h2>
            <Button variant="ghost" size="sm" className="text-green-600">
              Ver todos
            </Button>
          </div>
          
          <div className="space-y-3">
            {continueCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="relative w-24 h-20 flex-shrink-0">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 p-3">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1">{course.title}</h3>
                      <p className="text-gray-600 text-xs mb-2">{course.instructor}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-3">
                          <Progress value={course.progress} className="h-1" />
                          <span className="text-xs text-gray-500 mt-1 block">{course.progress}% concluído</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="text-xs">{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categorias */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Categorias</h2>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div 
                  key={category.id} 
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => onNavigate('explore', { category: category.name })}
                >
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-2 hover:scale-105 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-800 text-center leading-tight">
                    {category.name}
                  </span>
                  <span className="text-xs text-gray-500">{category.courses}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cursos Populares */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Cursos populares</h2>
            <Button variant="ghost" size="sm" className="text-green-600">
              Ver todos
            </Button>
          </div>
          
          <div className="space-y-4">
            {popularCourses.map((course) => (
              <Card 
                key={course.id} 
                className="overflow-hidden border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onNavigate('courseDetail', course)}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-20 flex-shrink-0">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm flex-1">{course.title}</h3>
                        <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                          {course.price}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-xs mb-2">{course.instructor}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{course.students.toLocaleString()} alunos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}