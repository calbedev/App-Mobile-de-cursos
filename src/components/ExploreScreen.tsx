import { useState } from 'react';
import { Search, Filter, Star, Clock, Users, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ExploreScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  initialCategory?: string;
}

export function ExploreScreen({ onNavigate, initialCategory }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Todos');
  const [sortBy, setSortBy] = useState('Mais populares');

  const categories = ['Todos', 'Programação', 'Design', 'Marketing', 'Negócios', 'Fotografia', 'Música'];
  const sortOptions = ['Mais populares', 'Avaliação', 'Preço: menor', 'Preço: maior', 'Mais recentes'];

  const courses = [
    {
      id: 1,
      title: 'React Native do Zero ao Avançado',
      instructor: 'Carlos Mendes',
      category: 'Programação',
      rating: 4.8,
      students: 3245,
      duration: '12h 30min',
      price: 'R$ 149,90',
      level: 'Intermediário',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'UI/UX Design Completo',
      instructor: 'Juliana Ferreira',
      category: 'Design',
      rating: 4.9,
      students: 2156,
      duration: '8h 45min',
      price: 'R$ 129,90',
      level: 'Iniciante',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Marketing Digital 2024',
      instructor: 'Roberto Silva',
      category: 'Marketing',
      rating: 4.7,
      students: 1876,
      duration: '10h 20min',
      price: 'R$ 199,90',
      level: 'Intermediário',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Flutter para Iniciantes',
      instructor: 'Ana Costa',
      category: 'Programação',
      rating: 4.8,
      students: 1234,
      duration: '6h 15min',
      price: 'R$ 89,90',
      level: 'Iniciante',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Fotografia com Smartphone',
      instructor: 'Marcos Oliveira',
      category: 'Fotografia',
      rating: 4.6,
      students: 987,
      duration: '4h 30min',
      price: 'R$ 79,90',
      level: 'Iniciante',
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'Produção Musical Digital',
      instructor: 'Lucas Santos',
      category: 'Música',
      rating: 4.9,
      students: 654,
      duration: '15h 10min',
      price: 'R$ 249,90',
      level: 'Avançado',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Explorar cursos</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar cursos, instrutores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-gray-200 focus:border-green-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtrar</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={sortBy === option ? 'bg-green-50 text-green-700' : ''}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            {filteredCourses.length} cursos encontrados
          </p>
          <p className="text-sm text-gray-500">
            Ordenar por: {sortBy}
          </p>
        </div>

        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <Card 
              key={course.id} 
              className="overflow-hidden border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('courseDetail', course)}
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-28 h-24 flex-shrink-0">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-2">{course.instructor}</p>
                      </div>
                      <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                        {course.price}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                        <span className="text-xs text-gray-600">{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 text-gray-500 mr-1" />
                        <span className="text-xs text-gray-600">{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 text-gray-500 mr-1" />
                        <span className="text-xs text-gray-600">{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={`text-xs ${getLevelColor(course.level)}`}>
                        {course.level}
                      </Badge>
                      <span className="text-xs text-gray-500">{course.category}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}