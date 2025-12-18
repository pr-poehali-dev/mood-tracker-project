import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

type MoodEntry = {
  id: string;
  date: string;
  mood: number;
  stress: number;
  sleep: number;
  activity: string;
  notes: string;
};

type HistoryProps = {
  userEmail: string;
};

const History = ({ userEmail }: HistoryProps) => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem(`mindcare_entries_${userEmail}`);
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setEntries(parsed.sort((a: MoodEntry, b: MoodEntry) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
  }, [userEmail]);

  const getRecommendations = (entry: MoodEntry) => {
    const recommendations: string[] = [];

    if (entry.mood < 4) {
      recommendations.push('Попробуйте технику дыхания 4-7-8 для успокоения');
      recommendations.push('Выйдите на короткую прогулку на свежем воздухе');
    }

    if (entry.stress > 7) {
      recommendations.push('Используйте прогрессивную мышечную релаксацию');
      recommendations.push('Попробуйте медитацию осознанности на 5-10 минут');
    }

    if (entry.sleep < 6) {
      recommendations.push('Соблюдайте режим сна - ложитесь в одно время');
      recommendations.push('Избегайте экранов за час до сна');
    }

    if (entry.mood >= 7 && entry.stress <= 4) {
      recommendations.push('Отличное состояние! Запишите, что помогло вам');
      recommendations.push('Подумайте о занятии, которое приносит радость');
    }

    return recommendations.length > 0 ? recommendations : ['Продолжайте отслеживать свое состояние'];
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return '😊';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    return '😔';
  };

  const getStressColor = (stress: number) => {
    if (stress <= 3) return 'bg-green-100 text-green-700';
    if (stress <= 6) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (entries.length === 0) {
    return (
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Clock" size={24} className="text-primary" />
            История записей
          </CardTitle>
          <CardDescription>Здесь будут отображаться все ваши записи</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              Вы еще не добавили ни одной записи
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Начните вести дневник настроения во вкладке "Дневник"
            </p>
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
            <Icon name="Clock" size={24} className="text-primary" />
            История записей
          </CardTitle>
          <CardDescription>
            Всего записей: {entries.length}
          </CardDescription>
        </CardHeader>
      </Card>

      {entries.map((entry) => (
        <Card key={entry.id} className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="text-3xl">{getMoodEmoji(entry.mood)}</span>
                  {formatDate(entry.date)}
                </CardTitle>
                <CardDescription className="mt-2">
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">
                      Настроение: {entry.mood}/10
                    </Badge>
                    <Badge className={getStressColor(entry.stress)}>
                      Стресс: {entry.stress}/10
                    </Badge>
                    <Badge variant="outline">
                      Сон: {entry.sleep}ч
                    </Badge>
                  </div>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {entry.activity && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <Icon name="Activity" size={16} />
                  Активность
                </div>
                <p className="text-foreground">{entry.activity}</p>
              </div>
            )}

            {entry.notes && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                  <Icon name="FileText" size={16} />
                  Заметки
                </div>
                <p className="text-foreground">{entry.notes}</p>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <div className="text-sm font-medium text-primary mb-3 flex items-center gap-2">
                <Icon name="Lightbulb" size={16} />
                Рекомендации
              </div>
              <ul className="space-y-2">
                {getRecommendations(entry).map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Icon name="CheckCircle2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default History;
