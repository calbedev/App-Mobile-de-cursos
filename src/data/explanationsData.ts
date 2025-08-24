export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Exercise {
  id: string;
  title: string;
  questions: Question[];
  requiredPlan: 'free' | 'pro' | 'pro-plus';
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  requiredPlan: 'free' | 'pro' | 'pro-plus';
}

export interface Topic {
  id: string;
  name: string;
  lessons: Lesson[];
  exercises: Exercise[];
  requiredPlan: 'free' | 'pro' | 'pro-plus';
}

export interface Discipline {
  id: string;
  name: string;
  icon: string;
  topics: Topic[];
  color: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  disciplines: Discipline[];
}

export const classes: Class[] = [
  {
    id: '1',
    name: '9º Ano',
    grade: '9',
    disciplines: [
      {
        id: '1-1',
        name: 'Matemática',
        icon: 'calculator',
        color: 'bg-blue-500',
        topics: [
          {
            id: '1-1-1',
            name: 'Equações do 1º Grau',
            requiredPlan: 'free',
            lessons: [
              {
                id: '1-1-1-1',
                title: 'Introdução às Equações',
                duration: '20min',
                videoUrl: 'https://example.com/math-video1',
                description: 'Conceitos básicos de equações do primeiro grau.',
                requiredPlan: 'free',
              },
              {
                id: '1-1-1-2',
                title: 'Resolução de Equações',
                duration: '25min',
                videoUrl: 'https://example.com/math-video2',
                description: 'Métodos para resolver equações do primeiro grau.',
                requiredPlan: 'free',
              },
            ],
            exercises: [
              {
                id: '1-1-1-e1',
                title: 'Exercícios - Equações Básicas',
                requiredPlan: 'free',
                questions: [
                  {
                    id: 'eq1',
                    question: 'Resolva a equação: 2x + 5 = 15',
                    options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'],
                    correctAnswer: 0,
                    explanation: 'Para resolver: 2x + 5 = 15, subtraímos 5 dos dois lados: 2x = 10, depois dividimos por 2: x = 5'
                  },
                  {
                    id: 'eq2',
                    question: 'Qual é o valor de x na equação: 3x - 7 = 8?',
                    options: ['x = 3', 'x = 5', 'x = 15', 'x = 1'],
                    correctAnswer: 1,
                    explanation: '3x - 7 = 8, somamos 7: 3x = 15, dividimos por 3: x = 5'
                  },
                ],
              },
            ],
          },
          {
            id: '1-1-2',
            name: 'Sistemas de Equações',
            requiredPlan: 'pro',
            lessons: [
              {
                id: '1-1-2-1',
                title: 'Método da Substituição',
                duration: '30min',
                videoUrl: 'https://example.com/math-video3',
                description: 'Aprender a resolver sistemas pelo método da substituição.',
                requiredPlan: 'pro',
              },
              {
                id: '1-1-2-2',
                title: 'Método da Adição',
                duration: '28min',
                videoUrl: 'https://example.com/math-video4',
                description: 'Resolver sistemas usando o método da adição.',
                requiredPlan: 'pro',
              },
            ],
            exercises: [
              {
                id: '1-1-2-e1',
                title: 'Exercícios - Sistemas',
                requiredPlan: 'pro',
                questions: [
                  {
                    id: 'sys1',
                    question: 'No sistema x + y = 10 e x - y = 2, qual é o valor de x?',
                    options: ['4', '6', '8', '12'],
                    correctAnswer: 1,
                    explanation: 'Somando as equações: 2x = 12, logo x = 6'
                  },
                ],
              },
            ],
          },
          {
            id: '1-1-3',
            name: 'Funções Quadráticas',
            requiredPlan: 'pro-plus',
            lessons: [
              {
                id: '1-1-3-1',
                title: 'Conceitos de Parábola',
                duration: '35min',
                videoUrl: 'https://example.com/math-video5',
                description: 'Entendendo o gráfico de funções quadráticas.',
                requiredPlan: 'pro-plus',
              },
            ],
            exercises: [
              {
                id: '1-1-3-e1',
                title: 'Exercícios - Funções Quadráticas',
                requiredPlan: 'pro-plus',
                questions: [
                  {
                    id: 'quad1',
                    question: 'Na função f(x) = x² - 4x + 3, qual é o vértice da parábola?',
                    options: ['(2, -1)', '(2, 1)', '(-2, -1)', '(-2, 1)'],
                    correctAnswer: 0,
                    explanation: 'O vértice é em x = -b/2a = 4/2 = 2, e f(2) = 4 - 8 + 3 = -1'
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '1-2',
        name: 'Português',
        icon: 'book-open',
        color: 'bg-red-500',
        topics: [
          {
            id: '1-2-1',
            name: 'Análise Sintática',
            requiredPlan: 'free',
            lessons: [
              {
                id: '1-2-1-1',
                title: 'Sujeito e Predicado',
                duration: '25min',
                videoUrl: 'https://example.com/port-video1',
                description: 'Identificação do sujeito e predicado em orações.',
                requiredPlan: 'free',
              },
            ],
            exercises: [
              {
                id: '1-2-1-e1',
                title: 'Exercícios - Análise Sintática',
                requiredPlan: 'free',
                questions: [
                  {
                    id: 'sint1',
                    question: 'Na frase "O gato subiu no telhado", o sujeito é:',
                    options: ['O gato', 'subiu', 'no telhado', 'telhado'],
                    correctAnswer: 0,
                    explanation: 'O sujeito é quem pratica a ação: "O gato" é quem subiu.'
                  },
                ],
              },
            ],
          },
          {
            id: '1-2-2',
            name: 'Figuras de Linguagem',
            requiredPlan: 'pro',
            lessons: [
              {
                id: '1-2-2-1',
                title: 'Metáfora e Comparação',
                duration: '22min',
                videoUrl: 'https://example.com/port-video2',
                description: 'Diferenças entre metáfora e comparação.',
                requiredPlan: 'pro',
              },
            ],
            exercises: [
              {
                id: '1-2-2-e1',
                title: 'Exercícios - Figuras de Linguagem',
                requiredPlan: 'pro',
                questions: [
                  {
                    id: 'fig1',
                    question: 'Identifique a metáfora: "Seus olhos são duas estrelas brilhantes"',
                    options: ['olhos', 'são', 'duas estrelas brilhantes', 'brilhantes'],
                    correctAnswer: 2,
                    explanation: 'A metáfora compara olhos com estrelas sem usar conectivo de comparação.'
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '1-3',
        name: 'Ciências',
        icon: 'microscope',
        color: 'bg-green-500',
        topics: [
          {
            id: '1-3-1',
            name: 'Sistema Digestório',
            requiredPlan: 'free',
            lessons: [
              {
                id: '1-3-1-1',
                title: 'Órgãos do Sistema Digestório',
                duration: '28min',
                videoUrl: 'https://example.com/science-video1',
                description: 'Conhecendo os órgãos e suas funções.',
                requiredPlan: 'free',
              },
            ],
            exercises: [
              {
                id: '1-3-1-e1',
                title: 'Exercícios - Sistema Digestório',
                requiredPlan: 'free',
                questions: [
                  {
                    id: 'dig1',
                    question: 'Qual órgão produz a bile?',
                    options: ['Estômago', 'Fígado', 'Pâncreas', 'Intestino'],
                    correctAnswer: 1,
                    explanation: 'O fígado produz a bile, que ajuda na digestão das gorduras.'
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: '1º Ano - Ensino Médio',
    grade: '10',
    disciplines: [
      {
        id: '2-1',
        name: 'Física',
        icon: 'zap',
        color: 'bg-purple-500',
        topics: [
          {
            id: '2-1-1',
            name: 'Cinemática',
            requiredPlan: 'free',
            lessons: [
              {
                id: '2-1-1-1',
                title: 'Movimento Uniforme',
                duration: '28min',
                videoUrl: 'https://example.com/physics-video1',
                description: 'Estudo do movimento retilíneo uniforme.',
                requiredPlan: 'free',
              },
              {
                id: '2-1-1-2',
                title: 'Movimento Uniformemente Variado',
                duration: '32min',
                videoUrl: 'https://example.com/physics-video2',
                description: 'MUV e suas aplicações.',
                requiredPlan: 'pro',
              },
            ],
            exercises: [
              {
                id: '2-1-1-e1',
                title: 'Exercícios - Cinemática',
                requiredPlan: 'free',
                questions: [
                  {
                    id: 'cin1',
                    question: 'Um carro percorre 100m em 10s. Sua velocidade é:',
                    options: ['5 m/s', '10 m/s', '15 m/s', '20 m/s'],
                    correctAnswer: 1,
                    explanation: 'Velocidade = distância/tempo = 100m/10s = 10 m/s'
                  },
                ],
              },
            ],
          },
          {
            id: '2-1-2',
            name: 'Dinâmica',
            requiredPlan: 'pro-plus',
            lessons: [
              {
                id: '2-1-2-1',
                title: 'Leis de Newton',
                duration: '45min',
                videoUrl: 'https://example.com/physics-video3',
                description: 'As três leis fundamentais da dinâmica.',
                requiredPlan: 'pro-plus',
              },
            ],
            exercises: [
              {
                id: '2-1-2-e1',
                title: 'Exercícios - Dinâmica',
                requiredPlan: 'pro-plus',
                questions: [
                  {
                    id: 'din1',
                    question: 'Qual é a segunda lei de Newton?',
                    options: ['F = ma', 'v = v₀ + at', 'E = mc²', 'P = mv'],
                    correctAnswer: 0,
                    explanation: 'A segunda lei de Newton estabelece que F = ma (Força = massa × aceleração)'
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '2-2',
        name: 'Química',
        icon: 'flask-conical',
        color: 'bg-orange-500',
        topics: [
          {
            id: '2-2-1',
            name: 'Tabela Periódica',
            requiredPlan: 'free',
            lessons: [
              {
                id: '2-2-1-1',
                title: 'Organização da Tabela Periódica',
                duration: '30min',
                videoUrl: 'https://example.com/chemistry-video1',
                description: 'Como os elementos estão organizados.',
                requiredPlan: 'free',
              },
            ],
            exercises: [
              {
                id: '2-2-1-e1',
                title: 'Exercícios - Tabela Periódica',
                requiredPlan: 'free',
                questions: [
                  {
                    id: 'tab1',
                    question: 'Qual é o símbolo do elemento Sódio?',
                    options: ['So', 'Sd', 'Na', 'S'],
                    correctAnswer: 2,
                    explanation: 'O símbolo do Sódio é Na, derivado do latim Natrium.'
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: '2º Ano - Ensino Médio',
    grade: '11',
    disciplines: [
      {
        id: '3-1',
        name: 'Biologia',
        icon: 'leaf',
        color: 'bg-emerald-500',
        topics: [
          {
            id: '3-1-1',
            name: 'Genética',
            requiredPlan: 'pro',
            lessons: [
              {
                id: '3-1-1-1',
                title: 'Leis de Mendel',
                duration: '40min',
                videoUrl: 'https://example.com/biology-video1',
                description: 'Primeira e segunda lei de Mendel.',
                requiredPlan: 'pro',
              },
            ],
            exercises: [
              {
                id: '3-1-1-e1',
                title: 'Exercícios - Genética',
                requiredPlan: 'pro',
                questions: [
                  {
                    id: 'gen1',
                    question: 'No cruzamento Aa x Aa, qual a probabilidade de descendente aa?',
                    options: ['25%', '50%', '75%', '100%'],
                    correctAnswer: 0,
                    explanation: 'No quadrado de Punnett: AA(25%), Aa(50%), aa(25%)'
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Helper functions
export function getClassById(id: string): Class | undefined {
  return classes.find(cls => cls.id === id);
}

export function getDisciplineById(classId: string, disciplineId: string): Discipline | undefined {
  const cls = getClassById(classId);
  return cls?.disciplines.find(disc => disc.id === disciplineId);
}

export function getTopicById(classId: string, disciplineId: string, topicId: string): Topic | undefined {
  const discipline = getDisciplineById(classId, disciplineId);
  return discipline?.topics.find(topic => topic.id === topicId);
}

export function canAccessContent(requiredPlan: 'free' | 'pro' | 'pro-plus', userPlan: 'free' | 'pro' | 'pro-plus'): boolean {
  const planLevels = { 'free': 0, 'pro': 1, 'pro-plus': 2 };
  return planLevels[userPlan] >= planLevels[requiredPlan];
}