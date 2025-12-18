import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Test = {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: {
    text: string;
    options: { text: string; value: number }[];
  }[];
  interpretation: (score: number) => {
    level: string;
    description: string;
    recommendations: string[];
  };
};

const tests: Test[] = [
  {
    id: 'anxiety',
    title: 'Уровень тревожности',
    description: 'Оцените ваше состояние за последние 2 недели',
    icon: 'AlertCircle',
    questions: [
      {
        text: 'Как часто вы чувствуете беспокойство?',
        options: [
          { text: 'Редко', value: 0 },
          { text: 'Иногда', value: 1 },
          { text: 'Часто', value: 2 },
          { text: 'Постоянно', value: 3 },
        ],
      },
      {
        text: 'Насколько сложно контролировать волнение?',
        options: [
          { text: 'Легко', value: 0 },
          { text: 'Средне', value: 1 },
          { text: 'Сложно', value: 2 },
          { text: 'Очень сложно', value: 3 },
        ],
      },
      {
        text: 'Испытываете ли вы напряжение в мышцах?',
        options: [
          { text: 'Нет', value: 0 },
          { text: 'Редко', value: 1 },
          { text: 'Часто', value: 2 },
          { text: 'Постоянно', value: 3 },
        ],
      },
      {
        text: 'Как качество вашего сна?',
        options: [
          { text: 'Отличное', value: 0 },
          { text: 'Хорошее', value: 1 },
          { text: 'Плохое', value: 2 },
          { text: 'Очень плохое', value: 3 },
        ],
      },
    ],
    interpretation: (score) => {
      if (score <= 3) {
        return {
          level: 'Низкий уровень тревожности',
          description: 'Ваше состояние в пределах нормы. Вы хорошо справляетесь с волнением.',
          recommendations: [
            'Продолжайте практиковать техники релаксации',
            'Поддерживайте регулярный режим сна',
            'Занимайтесь физической активностью',
          ],
        };
      } else if (score <= 7) {
        return {
          level: 'Средний уровень тревожности',
          description: 'Вы испытываете умеренное беспокойство. Стоит обратить внимание на своё состояние.',
          recommendations: [
            'Начните вести дневник эмоций',
            'Попробуйте дыхательные практики',
            'Уделите время хобби и отдыху',
            'Рассмотрите консультацию специалиста',
          ],
        };
      } else {
        return {
          level: 'Высокий уровень тревожности',
          description: 'Вы испытываете значительное беспокойство. Рекомендуется обратиться к специалисту.',
          recommendations: [
            'Обратитесь к психологу или психотерапевту',
            'Практикуйте медитацию и mindfulness',
            'Избегайте кофеина и алкоголя',
            'Установите режим дня и сна',
          ],
        };
      }
    },
  },
  {
    id: 'stress',
    title: 'Уровень стресса',
    description: 'Определите ваш текущий уровень стресса',
    icon: 'Activity',
    questions: [
      {
        text: 'Насколько вы перегружены делами?',
        options: [
          { text: 'Не перегружен', value: 0 },
          { text: 'Немного', value: 1 },
          { text: 'Сильно', value: 2 },
          { text: 'Критически', value: 3 },
        ],
      },
      {
        text: 'Как часто вы чувствуете раздражение?',
        options: [
          { text: 'Редко', value: 0 },
          { text: 'Иногда', value: 1 },
          { text: 'Часто', value: 2 },
          { text: 'Постоянно', value: 3 },
        ],
      },
      {
        text: 'Испытываете ли вы усталость без причины?',
        options: [
          { text: 'Нет', value: 0 },
          { text: 'Редко', value: 1 },
          { text: 'Часто', value: 2 },
          { text: 'Всегда', value: 3 },
        ],
      },
    ],
    interpretation: (score) => {
      if (score <= 2) {
        return {
          level: 'Низкий уровень стресса',
          description: 'Вы хорошо справляетесь со стрессовыми ситуациями.',
          recommendations: [
            'Продолжайте поддерживать баланс работы и отдыха',
            'Занимайтесь профилактикой стресса',
          ],
        };
      } else if (score <= 5) {
        return {
          level: 'Умеренный стресс',
          description: 'Вы испытываете стресс, но пока справляетесь.',
          recommendations: [
            'Определите источники стресса',
            'Практикуйте техники расслабления',
            'Делегируйте задачи, если возможно',
          ],
        };
      } else {
        return {
          level: 'Высокий уровень стресса',
          description: 'Вы находитесь в состоянии значительного стресса.',
          recommendations: [
            'Возьмите перерыв или отпуск',
            'Обратитесь за профессиональной помощью',
            'Пересмотрите свои приоритеты',
            'Практикуйте глубокое дыхание ежедневно',
          ],
        };
      }
    },
  },
  {
    id: 'burnout',
    title: 'Эмоциональное выгорание',
    description: 'Проверьте признаки профессионального выгорания',
    icon: 'Flame',
    questions: [
      {
        text: 'Чувствуете ли вы эмоциональное истощение?',
        options: [
          { text: 'Нет', value: 0 },
          { text: 'Редко', value: 1 },
          { text: 'Часто', value: 2 },
          { text: 'Постоянно', value: 3 },
        ],
      },
      {
        text: 'Снизилась ли ваша продуктивность?',
        options: [
          { text: 'Нет', value: 0 },
          { text: 'Немного', value: 1 },
          { text: 'Значительно', value: 2 },
          { text: 'Сильно', value: 3 },
        ],
      },
      {
        text: 'Потеряли ли вы интерес к работе?',
        options: [
          { text: 'Нет', value: 0 },
          { text: 'Иногда', value: 1 },
          { text: 'Часто', value: 2 },
          { text: 'Полностью', value: 3 },
        ],
      },
      {
        text: 'Испытываете ли цинизм к работе?',
        options: [
          { text: 'Нет', value: 0 },
          { text: 'Редко', value: 1 },
          { text: 'Часто', value: 2 },
          { text: 'Постоянно', value: 3 },
        ],
      },
    ],
    interpretation: (score) => {
      if (score <= 3) {
        return {
          level: 'Нет признаков выгорания',
          description: 'Вы в хорошей форме и не испытываете выгорания.',
          recommendations: [
            'Поддерживайте work-life баланс',
            'Продолжайте заниматься тем, что приносит радость',
          ],
        };
      } else if (score <= 7) {
        return {
          level: 'Начальная стадия выгорания',
          description: 'У вас появились первые признаки выгорания.',
          recommendations: [
            'Определите источники стресса на работе',
            'Установите границы между работой и личной жизнью',
            'Найдите новые источники мотивации',
            'Больше отдыхайте и восстанавливайтесь',
          ],
        };
      } else {
        return {
          level: 'Выраженное выгорание',
          description: 'Вы находитесь в состоянии эмоционального выгорания.',
          recommendations: [
            'Обязательно обратитесь к психологу',
            'Рассмотрите возможность взять отпуск',
            'Переоцените свои карьерные цели',
            'Займитесь восстановлением энергии',
            'Обсудите с руководством возможность изменения нагрузки',
          ],
        };
      }
    },
  },
];

type TestsProps = {
  userEmail: string;
};

type TestResult = {
  testId: string;
  testTitle: string;
  date: string;
  score: number;
  level: string;
  description: string;
  recommendations: string[];
};

const Tests = ({ userEmail }: TestsProps) => {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);

  useEffect(() => {
    const savedTests = localStorage.getItem(`mindcare_tests_${userEmail}`);
    if (savedTests) {
      setTestHistory(JSON.parse(savedTests));
    }
  }, [userEmail]);

  const handleStartTest = (test: Test) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < selectedTest!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const totalScore = newAnswers.reduce((sum, val) => sum + val, 0);
      const testResult = selectedTest!.interpretation(totalScore);
      setResult(testResult);

      const newTestResult: TestResult = {
        testId: selectedTest!.id,
        testTitle: selectedTest!.title,
        date: new Date().toISOString(),
        score: totalScore,
        level: testResult.level,
        description: testResult.description,
        recommendations: testResult.recommendations,
      };

      const updatedHistory = [newTestResult, ...testHistory];
      setTestHistory(updatedHistory);
      localStorage.setItem(`mindcare_tests_${userEmail}`, JSON.stringify(updatedHistory));
      toast.success('Результаты теста сохранены в ваш профиль');
    }
  };

  const handleReset = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (!selectedTest) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Card
            key={test.id}
            className="border-0 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer"
            onClick={() => handleStartTest(test)}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
                <Icon name={test.icon as any} size={24} className="text-primary" />
              </div>
              <CardTitle>{test.title}</CardTitle>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Пройти тест
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (result) {
    return (
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="CheckCircle" size={24} className="text-primary" />
            Результаты теста
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
            <h3 className="text-2xl font-bold text-primary mb-2">{result.level}</h3>
            <p className="text-foreground">{result.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Icon name="Lightbulb" size={20} className="text-primary" />
              Рекомендации:
            </h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-medium">{idx + 1}</span>
                  </div>
                  <span className="text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full">
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Вернуться к списку тестов
          </Button>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / selectedTest.questions.length) * 100;

  return (
    <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>{selectedTest.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        <Progress value={progress} className="h-2" />
        <CardDescription className="pt-2">
          Вопрос {currentQuestion + 1} из {selectedTest.questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">
            {selectedTest.questions[currentQuestion].text}
          </h3>

          <RadioGroup onValueChange={(value) => handleAnswer(Number(value))}>
            <div className="space-y-3">
              {selectedTest.questions[currentQuestion].options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-4 rounded-xl border-2 border-border hover:border-primary transition-colors cursor-pointer"
                >
                  <RadioGroupItem value={option.value.toString()} id={`option-${idx}`} />
                  <Label
                    htmlFor={`option-${idx}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default Tests;