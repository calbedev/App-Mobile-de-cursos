import { useState } from 'react';
import { ArrowLeft, CheckCircle, X, RotateCcw, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Exercise } from '../data/explanationsData';

interface ExerciseScreenProps {
  exerciseData: Exercise;
  onBack: () => void;
}

export function ExerciseScreen({ exerciseData, onBack }: ExerciseScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentQuestion = exerciseData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exerciseData.questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }));
    setHasAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exerciseData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  const getScore = () => {
    const correctAnswers = exerciseData.questions.filter(question => 
      answers[question.id] === question.correctAnswer
    ).length;
    return Math.round((correctAnswers / exerciseData.questions.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (showResults) {
    const score = getScore();
    const correctAnswers = exerciseData.questions.filter(question => 
      answers[question.id] === question.correctAnswer
    ).length;

    return (
      <div className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-white px-4 py-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Resultados</h1>
              <p className="text-gray-600">{exerciseData.title}</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-4 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Exercício concluído!</h2>
              <div className={`text-3xl font-bold mb-2 ${getScoreColor(score)}`}>
                {score}%
              </div>
              <p className="text-gray-600 mb-4">
                Você acertou {correctAnswers} de {exerciseData.questions.length} questões
              </p>
              <Progress value={score} className="h-3 mb-4" />
              
              <div className="flex space-x-3 justify-center">
                <Button 
                  onClick={handleRestart}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Refazer</span>
                </Button>
                <Button onClick={onBack} className="bg-green-500 hover:bg-green-600">
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">Revisão das questões</h3>
            {exerciseData.questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">
                            <span className="font-medium">Sua resposta:</span> {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-600">
                              <span className="font-medium">Resposta correta:</span> {question.options[question.correctAnswer]}
                            </p>
                          )}
                          {question.explanation && (
                            <p className="text-blue-600 text-xs mt-2">
                              <span className="font-medium">Explicação:</span> {question.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">{exerciseData.title}</h1>
            <p className="text-gray-600">
              Questão {currentQuestionIndex + 1} de {exerciseData.questions.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Progress value={progress} className="flex-1 mr-4" />
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Question */}
      <div className="p-4">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer?.toString() || ''}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              disabled={hasAnswered}
            >
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrectAnswer = hasAnswered && isCorrect;
                const showIncorrectAnswer = hasAnswered && isSelected && !isCorrect;
                
                return (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                      showCorrectAnswer 
                        ? 'bg-green-50 border-green-300' 
                        : showIncorrectAnswer
                        ? 'bg-red-50 border-red-300'
                        : isSelected
                        ? 'bg-blue-50 border-blue-300'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {option}
                    </Label>
                    {showCorrectAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {showIncorrectAnswer && (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                );
              })}
            </RadioGroup>

            {hasAnswered && currentQuestion.explanation && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Explicação:</span> {currentQuestion.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {!hasAnswered ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="ml-auto bg-blue-500 hover:bg-blue-600"
                >
                  Confirmar resposta
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="ml-auto bg-green-500 hover:bg-green-600"
                >
                  {currentQuestionIndex < exerciseData.questions.length - 1 ? 'Próxima questão' : 'Ver resultados'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}