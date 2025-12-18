import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Technique = {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: string;
  icon: string;
  description: string;
  steps: string[];
  tips: string[];
};

const allTechniques: Technique[] = [
  {
    id: '1',
    title: 'Дыхание 4-7-8',
    category: 'Дыхательные практики',
    duration: '5 минут',
    difficulty: 'Легко',
    icon: 'Wind',
    description: 'Эффективная техника для быстрого снижения тревожности и подготовки ко сну.',
    steps: [
      'Сядьте удобно, выпрямите спину',
      'Полностью выдохните через рот со свистящим звуком',
      'Закройте рот, вдохните через нос, считая до 4',
      'Задержите дыхание на счет 7',
      'Выдохните полностью через рот на счет 8',
      'Повторите цикл 3-4 раза',
    ],
    tips: [
      'Практикуйте дважды в день',
      'Не переживайте, если сначала сложно — это нормально',
      'Можно замедлить счет, если некомфортно',
    ],
  },
  {
    id: '2',
    title: 'Прогрессивная мышечная релаксация',
    category: 'Физические упражнения',
    duration: '15 минут',
    difficulty: 'Средне',
    icon: 'Zap',
    description: 'Техника для снятия физического напряжения через последовательное расслабление мышц.',
    steps: [
      'Лягте в тихом месте, закройте глаза',
      'Начните с пальцев ног — напрягите их на 5 секунд',
      'Резко расслабьте и почувствуйте разницу',
      'Двигайтесь вверх: икры, бедра, живот, грудь',
      'Продолжайте с руками, плечами, шеей, лицом',
      'В конце полежите спокойно 2-3 минуты',
    ],
    tips: [
      'Не напрягайте мышцы слишком сильно',
      'Дышите равномерно во время упражнения',
      'Особое внимание уделите плечам и челюсти',
    ],
  },
  {
    id: '3',
    title: '5-4-3-2-1: Заземление',
    category: 'Психологические приёмы',
    duration: '3 минуты',
    difficulty: 'Легко',
    icon: 'Eye',
    description: 'Техника для возврата в настоящий момент при тревоге или панической атаке.',
    steps: [
      'Назовите 5 вещей, которые вы ВИДИТЕ вокруг',
      'Назовите 4 вещи, которые вы можете ПОТРОГАТЬ',
      'Назовите 3 звука, которые вы СЛЫШИТЕ',
      'Назовите 2 запаха, которые вы ЧУВСТВУЕТЕ',
      'Назовите 1 вкус, который вы ОЩУЩАЕТЕ',
    ],
    tips: [
      'Говорите вслух или про себя',
      'Не спешите, уделите время каждому чувству',
      'Эффективно при панических атаках',
    ],
  },
  {
    id: '4',
    title: 'Коробочное дыхание',
    category: 'Дыхательные практики',
    duration: '5 минут',
    difficulty: 'Легко',
    icon: 'Square',
    description: 'Простая техника для концентрации и снижения стресса.',
    steps: [
      'Вдохните через нос на 4 счета',
      'Задержите дыхание на 4 счета',
      'Выдохните через рот на 4 счета',
      'Задержите дыхание на 4 счета',
      'Повторите 5-10 циклов',
    ],
    tips: [
      'Визуализируйте квадрат при выполнении',
      'Используйте в стрессовых ситуациях',
      'Помогает быстро успокоиться',
    ],
  },
  {
    id: '5',
    title: 'Ходьба осознанности',
    category: 'Физические упражнения',
    duration: '10 минут',
    difficulty: 'Легко',
    icon: 'Footprints',
    description: 'Медитация в движении для снижения стресса и улучшения настроения.',
    steps: [
      'Найдите спокойное место для прогулки',
      'Идите медленно, концентрируясь на каждом шаге',
      'Чувствуйте, как стопа касается земли',
      'Замечайте ощущения в теле при движении',
      'Если отвлеклись — мягко верните внимание к шагам',
      'Заметьте окружение: звуки, запахи, визуальные детали',
    ],
    tips: [
      'Не обязательно идти быстро',
      'Можно практиковать где угодно',
      'Отличная альтернатива сидячей медитации',
    ],
  },
  {
    id: '6',
    title: 'Техника "STOP"',
    category: 'Психологические приёмы',
    duration: '2 минуты',
    difficulty: 'Легко',
    icon: 'Hand',
    description: 'Быстрая техника для прерывания негативных мыслей.',
    steps: [
      'S (Stop) — Остановитесь, замрите на месте',
      'T (Take a breath) — Сделайте глубокий вдох',
      'O (Observe) — Понаблюдайте за своими мыслями, чувствами, телом',
      'P (Proceed) — Продолжайте действовать осознанно',
    ],
    tips: [
      'Используйте в момент стресса',
      'Помогает не действовать импульсивно',
      'Создает паузу между эмоцией и реакцией',
    ],
  },
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteTechniques');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favoriteTechniques', JSON.stringify(newFavorites));
  };

  const favoriteTechniques = allTechniques.filter((t) => favorites.includes(t.id));

  if (favoriteTechniques.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardContent className="py-16">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="Star" size={40} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Нет избранных техник</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Добавьте техники в избранное, чтобы быстро находить их и практиковать регулярно
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Star" size={24} className="text-yellow-500 fill-yellow-500" />
            Избранные техники
          </CardTitle>
          <CardDescription>
            Ваши любимые практики для быстрого доступа ({favoriteTechniques.length})
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {favoriteTechniques.map((technique) => (
          <Card
            key={technique.id}
            className="border-0 shadow-xl bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon name={technique.icon as any} size={24} className="text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{technique.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {technique.description}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(technique.id)}
                  className="flex-shrink-0"
                >
                  <Icon
                    name="Star"
                    size={20}
                    className="fill-yellow-500 text-yellow-500"
                  />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="gap-1">
                  <Icon name="Clock" size={14} />
                  {technique.duration}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Icon name="TrendingUp" size={14} />
                  {technique.difficulty}
                </Badge>
                <Badge variant="outline">{technique.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="steps" className="border-0">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2 font-semibold">
                      <Icon name="ListOrdered" size={18} />
                      Пошаговая инструкция
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="space-y-3 mt-3">
                      {technique.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 w-7 h-7 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold text-sm">
                            {idx + 1}
                          </span>
                          <span className="text-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tips" className="border-0">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2 font-semibold">
                      <Icon name="Lightbulb" size={18} />
                      Советы
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 mt-3">
                      {technique.tips.map((tip, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-1" />
                          <span className="text-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
