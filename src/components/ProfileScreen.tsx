import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Edit3,
  Camera,
  Download,
  Share,
  Flame,
  Zap,
  Brain,
  Target
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const userInfo = {
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    phone: '+55 11 99999-9999',
    location: 'São Paulo, SP',
    joinDate: 'Janeiro 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c9dc?w=80&h=80&fit=crop&crop=face'
  };

  const stats = [
    { label: 'Cursos Concluídos', value: 12, color: 'text-green-600' },
    { label: 'Certificados', value: 8, color: 'text-blue-600' },
    { label: 'Horas de Estudo', value: '156h', color: 'text-purple-600' },
    { label: 'Sequência', value: '7 dias', color: 'text-orange-600' }
  ];

  const certificates = [
    {
      id: 1,
      title: 'React Native Fundamentals',
      date: '15 Jan 2024',
      instructor: 'Carlos Mendes'
    },
    {
      id: 2,
      title: 'UI/UX Design Essentials',
      date: '28 Dez 2023',
      instructor: 'Ana Costa'
    },
    {
      id: 3,
      title: 'JavaScript Avançado',
      date: '10 Dez 2023',
      instructor: 'Pedro Lima'
    }
  ];

  const achievements = [
    { title: 'Primeira Semana', icon: Flame, completed: true },
    { title: 'Maratonista', icon: Zap, completed: true },
    { title: 'Especialista', icon: Brain, completed: false, progress: 60 },
    { title: 'Dedicado', icon: Target, completed: false, progress: 23 }
  ];

  const menuItems = [
    {
      icon: Settings,
      title: 'Configurações da conta',
      subtitle: 'Gerenciar dados pessoais'
    },
    {
      icon: Bell,
      title: 'Notificações',
      subtitle: 'Configurar alertas',
      action: (
        <Switch
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      )
    },
    {
      icon: Shield,
      title: 'Privacidade e segurança',
      subtitle: 'Controlar dados e acesso'
    },
    {
      icon: Download,
      title: 'Downloads',
      subtitle: 'Gerenciar conteúdo offline'
    },
    {
      icon: HelpCircle,
      title: 'Ajuda e suporte',
      subtitle: 'Central de atendimento'
    }
  ];

  return (
    <div className="flex-1 bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Perfil</h1>
          <Button variant="ghost" size="icon">
            <Share className="w-5 h-5 text-gray-600" />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userInfo.avatar} />
              <AvatarFallback className="text-lg">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-green-500 hover:bg-green-600"
            >
              <Camera className="w-4 h-4 text-white" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-lg font-semibold text-gray-800">{userInfo.name}</h2>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Edit3 className="w-3 h-3 text-gray-600" />
              </Button>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{userInfo.email}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{userInfo.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Membro desde {userInfo.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <Button className="w-full bg-green-500 hover:bg-green-600 mb-4">
          <Award className="w-4 h-4 mr-2" />
          Ver todos os certificados
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Achievements */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Conquistas recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {achievements.slice(0, 4).map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`mb-2 p-2 rounded-full inline-flex ${
                      achievement.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        achievement.completed ? 'text-green-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="text-xs font-medium text-gray-800 mb-1">
                      {achievement.title}
                    </div>
                    {!achievement.completed && achievement.progress && (
                      <Progress value={achievement.progress} className="h-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Certificates */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Certificados recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {certificates.slice(0, 3).map((cert) => (
                <div key={cert.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm">{cert.title}</h4>
                    <p className="text-xs text-gray-600">{cert.instructor} • {cert.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings Menu */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index}>
                  <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                    <Icon className="w-5 h-5 text-gray-600 mr-3" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.subtitle}</p>
                    </div>
                    {item.action || <span className="text-gray-400">›</span>}
                  </div>
                  {index < menuItems.length - 1 && <Separator />}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair da conta
        </Button>
      </div>
    </div>
  );
}