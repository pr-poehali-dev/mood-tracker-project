import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

type StatisticsProps = {
  userEmail: string;
};

type Entry = {
  id: string;
  date: string;
  emotion: string;
  stress: number;
  note: string;
  trigger: string;
};

const Statistics = ({ userEmail }: StatisticsProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [testCount, setTestCount] = useState(0);

  useEffect(() => {
    const savedEntries = localStorage.getItem(`mindcare_entries_${userEmail}`);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }

    const savedTests = localStorage.getItem(`mindcare_tests_${userEmail}`);
    if (savedTests) {
      setTestCount(JSON.parse(savedTests).length);
    }
  }, [userEmail]);

  const calculateWeekData = () => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    const weekEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekAgo;
    });

    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const weekData = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayEntries = weekEntries.filter(
        (e) => new Date(e.date).toDateString() === date.toDateString()
      );

      const avgMood = dayEntries.length
        ? Math.round(dayEntries.reduce((sum, e) => sum + (10 - e.stress), 0) / dayEntries.length)
        : 5;
      const avgStress = dayEntries.length
        ? Math.round(dayEntries.reduce((sum, e) => sum + e.stress, 0) / dayEntries.length)
        : 5;

      weekData.push({
        day: days[date.getDay()],
        mood: avgMood,
        stress: avgStress,
      });
    }

    return weekData;
  };

  const calculateEmotionCounts = () => {
    const emotionMap: Record<string, number> = {};
    entries.forEach((entry) => {
      emotionMap[entry.emotion] = (emotionMap[entry.emotion] || 0) + 1;
    });

    const emotionColors: Record<string, string> = {
      'Радость': 'bg-yellow-500',
      'Спокойствие': 'bg-blue-500',
      'Грусть': 'bg-indigo-500',
      'Тревога': 'bg-orange-500',
      'Злость': 'bg-red-500',
      'Усталость': 'bg-purple-500',
    };

    return Object.entries(emotionMap).map(([emotion, count]) => ({
      emotion,
      count,
      color: emotionColors[emotion] || 'bg-gray-500',
    }));
  };

  const weekData = calculateWeekData();
  const monthEmotions = calculateEmotionCounts();
  const maxEmotionCount = Math.max(...monthEmotions.map((e) => e.count), 1);

  const avgMood = entries.length
    ? (entries.reduce((sum, e) => sum + (10 - e.stress), 0) / entries.length).toFixed(1)
    : '0';
  const avgStress = entries.length
    ? (entries.reduce((sum, e) => sum + e.stress, 0) / entries.length).toFixed(1)
    : '0';

  const calculateStreak = () => {
    if (entries.length === 0) return 0;
    
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      entryDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);
      
      if (entryDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };


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
                  <div className="text-3xl font-bold text-primary mb-1">{entries.length}</div>
                  <div className="text-sm text-muted-foreground">Записей</div>
                </div>
                <div className="p-4 rounded-xl bg-green-100 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{avgMood}</div>
                  <div className="text-sm text-muted-foreground">Ср. настроение</div>
                </div>
                <div className="p-4 rounded-xl bg-orange-100 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">{avgStress}</div>
                  <div className="text-sm text-muted-foreground">Ср. стресс</div>
                </div>
                <div className="p-4 rounded-xl bg-purple-100 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{testCount}</div>
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