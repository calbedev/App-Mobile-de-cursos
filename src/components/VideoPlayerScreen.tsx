import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Settings, Maximize, Volume2, VolumeX, FileText, Image, File, HelpCircle, CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface VideoPlayerScreenProps {
  course: any;
  lesson: any;
  onBack: () => void;
}

export function VideoPlayerScreen({ course, lesson, onBack }: VideoPlayerScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Mock data for support materials
  const supportMaterials = [
    {
      id: 1,
      title: 'Slides da aula',
      type: 'pdf',
      size: '2.3 MB',
      icon: FileText
    },
    {
      id: 2,
      title: 'Código de exemplo',
      type: 'zip',
      size: '1.2 MB',
      icon: File
    },
    {
      id: 3,
      title: 'Diagrama de arquitetura',
      type: 'png',
      size: '856 KB',
      icon: Image
    }
  ];

  // Mock quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: 'Qual é a principal vantagem do React Native?',
      options: [
        'Desenvolvimento apenas para iOS',
        'Desenvolvimento multiplataforma com código único',
        'Melhor performance que apps nativos',
        'Menor tamanho de arquivo'
      ],
      correctAnswer: 'Desenvolvimento multiplataforma com código único'
    },
    {
      id: 2,
      question: 'Qual componente é usado para navegação básica?',
      options: [
        'Navigator',
        'Router',
        'Stack.Navigator',
        'Tab.Navigator'
      ],
      correctAnswer: 'Stack.Navigator'
    },
    {
      id: 3,
      question: 'Como você declara um estado em React Native?',
      options: [
        'const [state, setState] = useState()',
        'state = new State()',
        'this.state = {}',
        'useState = state'
      ],
      correctAnswer: 'const [state, setState] = useState()'
    }
  ];

  // Simulate video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showControls && isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowControls(true);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
    setShowControls(true);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const handleSkip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(newTime);
    setShowControls(true);
  };

  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'png':
      case 'jpg':
      case 'jpeg':
        return Image;
      default:
        return File;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'text-red-600 bg-red-100';
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getQuizScore = () => {
    const correct = quizQuestions.filter(q => quizAnswers[q.id] === q.correctAnswer).length;
    return Math.round((correct / quizQuestions.length) * 100);
  };

  if (showQuiz) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Quiz da Aula</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowQuiz(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-gray-600 mt-1">Teste seus conhecimentos sobre {lesson.title}</p>
        </div>

        <div className="flex-1 p-4 space-y-6">
          {!quizSubmitted ? (
            <>
              {quizQuestions.map((question, index) => (
                <Card key={question.id} className="border-0 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">
                      {index + 1}. {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={quizAnswers[question.id] || ''}
                      onValueChange={(value) => handleQuizAnswer(question.id, value)}
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`q${question.id}-${optionIndex}`} />
                          <Label htmlFor={`q${question.id}-${optionIndex}`} className="text-sm">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}

              <Button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Enviar respostas
              </Button>
            </>
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quiz concluído!</h3>
                <p className="text-gray-600 mb-4">
                  Você acertou {quizQuestions.filter(q => quizAnswers[q.id] === q.correctAnswer).length} de {quizQuestions.length} questões
                </p>
                <div className="mb-6">
                  <Progress value={getQuizScore()} className="h-3" />
                  <p className="text-sm text-gray-600 mt-2">{getQuizScore()}% de aproveitamento</p>
                </div>
                <Button
                  onClick={() => setShowQuiz(false)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Continuar para próxima aula
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-black ${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'}`}>
      {/* Video Area */}
      <div 
        className="relative flex-1 bg-black flex items-center justify-center cursor-pointer"
        onClick={() => setShowControls(!showControls)}
      >
        {/* Placeholder Video */}
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              {isPlaying ? (
                <Pause className="w-10 h-10" />
              ) : (
                <Play className="w-10 h-10 ml-1" />
              )}
            </div>
            <h3 className="text-lg font-medium mb-2">{lesson.title}</h3>
            <p className="text-gray-300">{course.title}</p>
          </div>
        </div>

        {/* Controls Overlay */}
        <div 
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-center text-white">
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-300">{course.instructor}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Center Play/Pause */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-black/40 text-white hover:bg-black/60"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-white text-sm mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSkip(-10)}
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSkip(10)}
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  <div className="w-20 hidden sm:block">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      onValueChange={handleVolumeChange}
                    />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info (only in non-fullscreen mode) */}
      {!isFullscreen && (
        <div className="bg-white p-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{lesson.title}</h2>
            <p className="text-gray-600 mb-3">
              Nesta aula você aprenderá os conceitos fundamentais e como aplicá-los no desenvolvimento 
              de aplicações React Native.
            </p>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">{lesson.duration}</Badge>
              {lesson.free && <Badge className="bg-green-100 text-green-800">Grátis</Badge>}
            </div>
          </div>

          {/* Support Materials */}
          <Card className="border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Material de apoio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {supportMaterials.map((material) => {
                const Icon = getFileTypeIcon(material.type);
                return (
                  <div key={material.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getFileTypeColor(material.type)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">{material.title}</h4>
                        <p className="text-xs text-gray-500">{material.type.toUpperCase()} • {material.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quiz */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Quiz da aula</h4>
                    <p className="text-sm text-gray-600">Teste seus conhecimentos - 3 perguntas</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() => setShowQuiz(true)}
                >
                  Iniciar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Lesson */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Próxima aula</h4>
                  <p className="text-sm text-gray-600">Configurando o Ambiente</p>
                </div>
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  Assistir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}