import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const emotions = [
  { name: 'Радость', icon: 'Smile', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' },
  { name: 'Спокойствие', icon: 'CloudSun', color: 'bg-blue-100 hover:bg-blue-200 text-blue-700' },
  { name: 'Грусть', icon: 'CloudRain', color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700' },
  { name: 'Тревога', icon: 'AlertCircle', color: 'bg-orange-100 hover:bg-orange-200 text-orange-700' },
  { name: 'Злость', icon: 'Flame', color: 'bg-red-100 hover:bg-red-200 text-red-700' },
  { name: 'Усталость', icon: 'Moon', color: 'bg-purple-100 hover:bg-purple-200 text-purple-700' },
];

type Entry = {
  id: string;
  date: Date;
  emotion: string;
  stress: number;
  note: string;
  trigger: string;
};

const MoodDiary = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [stressLevel, setStressLevel] = useState([5]);
  const [note, setNote] = useState('');
  const [trigger, setTrigger] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleSave = () => {
    if (!selectedEmotion) return;

    const newEntry: Entry = {
      id: Date.now().toString(),
      date: new Date(),
      emotion: selectedEmotion,
      stress: stressLevel[0],
      note,
      trigger,
    };

    setEntries([newEntry, ...entries]);
    setSelectedEmotion(null);
    setStressLevel([5]);
    setNote('');
    setTrigger('');
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="PenLine" size={24} className="text-primary" />
            Новая запись
          </CardTitle>
          <CardDescription>Как вы себя чувствуете сегодня?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base mb-3 block">Выберите эмоцию</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {emotions.map((emotion) => (
                <Button
                  key={emotion.name}
                  variant={selectedEmotion === emotion.name ? 'default' : 'outline'}
                  className={`h-auto py-4 flex flex-col gap-2 ${
                    selectedEmotion === emotion.name 
                      ? 'bg-primary text-primary-foreground' 
                      : emotion.color
                  }`}
                  onClick={() => setSelectedEmotion(emotion.name)}
                >
                  <Icon name={emotion.icon as any} size={28} />
                  <span className="text-sm font-medium">{emotion.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base mb-3 block">
              Уровень стресса: {stressLevel[0]}/10
            </Label>
            <Slider
              value={stressLevel}
              onValueChange={setStressLevel}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Спокоен</span>
              <span>Высокий стресс</span>
            </div>
          </div>

          <div>
            <Label htmlFor="trigger" className="text-base">Триггеры (что вызвало эмоцию?)</Label>
            <Textarea
              id="trigger"
              placeholder="Например: встреча с другом, рабочий дедлайн..."
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="mt-2 min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="note" className="text-base">Заметки</Label>
            <Textarea
              id="note"
              placeholder="Опишите свои мысли и чувства..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-2 min-h-[120px]"
            />
          </div>

          <Button 
            onClick={handleSave} 
            disabled={!selectedEmotion}
            className="w-full h-12 text-base"
          >
            <Icon name="Save" size={20} className="mr-2" />
            Сохранить запись
          </Button>
        </CardContent>
      </Card>

      {entries.length > 0 && (
        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Calendar" size={24} className="text-primary" />
              История записей
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-xl bg-accent/50 border border-border space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{entry.emotion}</span>
                  <span className="text-sm text-muted-foreground">
                    {entry.date.toLocaleDateString('ru-RU')} {entry.date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Стресс: {entry.stress}/10
                </div>
                {entry.trigger && (
                  <div className="text-sm">
                    <span className="font-medium">Триггеры:</span> {entry.trigger}
                  </div>
                )}
                {entry.note && (
                  <div className="text-sm">
                    <span className="font-medium">Заметки:</span> {entry.note}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MoodDiary;
