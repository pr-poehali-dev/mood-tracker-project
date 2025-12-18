import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Statistics = () => {
  const weekData = [
    { day: 'Пн', mood: 7, stress: 4 },
    { day: 'Вт', mood: 6, stress: 5 },
    { day: 'Ср', mood: 8, stress: 3 },
    { day: 'Чт', mood: 5, stress: 7 },
    { day: 'Пт', mood: 9, stress: 2 },
    { day: 'Сб', mood: 8, stress: 3 },
    { day: 'Вс', mood: 9, stress: 2 },
  ];

  const monthEmotions = [
    { emotion: 'Радость', count: 12, color: 'bg-yellow-500' },
    { emotion: 'Спокойствие', count: 18, color: 'bg-blue-500' },
    { emotion: 'Грусть', count: 5, color: 'bg-indigo-500' },
    { emotion: 'Тревога', count: 8, color: 'bg-orange-500' },
    { emotion: 'Злость', count: 3, color: 'bg-red-500' },
    { emotion: 'Усталость', count: 10, color: 'bg-purple-500' },
  ];

  const maxEmotionCount = Math.max(...monthEmotions.map((e) => e.count));

  const insights = [
    {
      icon: 'TrendingUp',
      title: 'Улучшение настроения',
      description: 'Ваше настроение улучшилось на 23% за последнюю неделю',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: 'TrendingDown',
      title: 'Снижение стресса',
      description: 'Уровень стресса снизился в выходные дни',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: 'Calendar',
      title: 'Лучший день',
      description: 'Пятница — ваш самый позитивный день недели',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={24} className="text-primary" />
            Статистика и аналитика
          </CardTitle>
          <CardDescription>Визуализация вашего эмоционального состояния</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {insights.map((insight, idx) => (
          <Card key={idx} className={`border-0 shadow-lg ${insight.bg}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl ${insight.bg} flex items-center justify-center`}>
                  <Icon name={insight.icon as any} size={24} className={insight.color} />
                </div>
                <div>
                  <h3 className={`font-semibold mb-1 ${insight.color}`}>{insight.title}</h3>
                  <p className="text-sm text-foreground/80">{insight.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="week" className="space-y-6">
        <TabsList className="grid grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="week">Неделя</TabsTrigger>
          <TabsTrigger value="month">Месяц</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-6">
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>График настроения за неделю</CardTitle>
              <CardDescription>Отслеживайте изменения настроения и уровня стресса</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Smile" size={20} className="text-primary" />
                    <span className="font-medium">Настроение</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {weekData.map((day, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="w-full bg-accent rounded-t-lg overflow-hidden h-32 flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-primary to-primary/70 rounded-t-lg transition-all"
                            style={{ height: `${(day.mood / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">{day.day}</span>
                        <span className="text-xs text-primary font-semibold">{day.mood}/10</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Activity" size={20} className="text-orange-500" />
                    <span className="font-medium">Уровень стресса</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {weekData.map((day, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <div className="w-full bg-accent rounded-t-lg overflow-hidden h-32 flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all"
                            style={{ height: `${(day.stress / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">{day.day}</span>
                        <span className="text-xs text-orange-500 font-semibold">{day.stress}/10</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-6">
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Распределение эмоций за месяц</CardTitle>
              <CardDescription>Какие эмоции вы испытывали чаще всего</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthEmotions.map((emotion, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{emotion.emotion}</span>
                      <span className="text-sm text-muted-foreground">{emotion.count} раз</span>
                    </div>
                    <div className="relative h-8 bg-accent rounded-full overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full ${emotion.color} transition-all duration-500 rounded-full flex items-center justify-end pr-3`}
                        style={{ width: `${(emotion.count / maxEmotionCount) * 100}%` }}
                      >
                        {emotion.count >= maxEmotionCount / 2 && (
                          <span className="text-xs font-semibold text-white">{emotion.count}</span>
                        )}
                      </div>
                      {emotion.count < maxEmotionCount / 2 && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                          {emotion.count}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Сводка за месяц</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-primary/10 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">56</div>
                  <div className="text-sm text-muted-foreground">Записей</div>
                </div>
                <div className="p-4 rounded-xl bg-green-100 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">7.2</div>
                  <div className="text-sm text-muted-foreground">Ср. настроение</div>
                </div>
                <div className="p-4 rounded-xl bg-orange-100 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">4.1</div>
                  <div className="text-sm text-muted-foreground">Ср. стресс</div>
                </div>
                <div className="p-4 rounded-xl bg-purple-100 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">3</div>
                  <div className="text-sm text-muted-foreground">Тестов пройдено</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
