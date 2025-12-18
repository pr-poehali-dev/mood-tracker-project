import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type ProfileProps = {
  user: {
    name: string;
    email: string;
    createdAt: string;
  };
  onLogout: () => void;
};

const Profile = ({ user, onLogout }: ProfileProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [entries, setEntries] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem(`mindcare_entries_${user.email}`);
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }

    const savedTests = localStorage.getItem(`mindcare_tests_${user.email}`);
    if (savedTests) {
      setTests(JSON.parse(savedTests));
    }

    const savedFavorites = localStorage.getItem('favoriteTechniques');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [user.email]);

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
  const [notifications, setNotifications] = useState({
    daily: true,
    weekly: true,
    tests: false,
  });

  const handleSaveProfile = () => {
    const updatedUser = { ...user, name, email };
    localStorage.setItem('mindcare_user', JSON.stringify(updatedUser));
    toast.success('Профиль успешно обновлён');
  };

  const handleSaveNotifications = () => {
    toast.success('Настройки уведомлений сохранены');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="User" size={24} className="text-primary" />
            Личная информация
          </CardTitle>
          <CardDescription>Управляйте своим профилем и настройками</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={48} className="text-primary" />
              </div>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                variant="secondary"
              >
                <Icon name="Camera" size={16} />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <Button onClick={handleSaveProfile} className="w-full">
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Bell" size={24} className="text-primary" />
            Уведомления и напоминания
          </CardTitle>
          <CardDescription>
            Настройте напоминания для регулярных записей и тестирований
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/50 border border-border">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={18} className="text-primary" />
                  <Label htmlFor="daily" className="text-base font-medium">
                    Ежедневное напоминание
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Получать напоминание о записи в дневник каждый день в 21:00
                </p>
              </div>
              <Switch
                id="daily"
                checked={notifications.daily}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, daily: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/50 border border-border">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Icon name="CalendarCheck" size={18} className="text-primary" />
                  <Label htmlFor="weekly" className="text-base font-medium">
                    Еженедельная статистика
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Получать сводку за неделю каждое воскресенье
                </p>
              </div>
              <Switch
                id="weekly"
                checked={notifications.weekly}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weekly: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/50 border border-border">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Icon name="ClipboardList" size={18} className="text-primary" />
                  <Label htmlFor="tests" className="text-base font-medium">
                    Напоминания о тестах
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Напоминать пройти тесты раз в две недели
                </p>
              </div>
              <Switch
                id="tests"
                checked={notifications.tests}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, tests: checked })
                }
              />
            </div>
          </div>

          <Button onClick={handleSaveNotifications} className="w-full">
            <Icon name="Save" size={20} className="mr-2" />
            Сохранить настройки
          </Button>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={24} className="text-primary" />
            Статистика активности
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-primary/10 text-center">
              <Icon name="BookOpen" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary mb-1">{entries.length}</div>
              <div className="text-sm text-muted-foreground">Записей в дневнике</div>
            </div>
            <div className="p-4 rounded-xl bg-secondary/20 text-center">
              <Icon name="ClipboardCheck" size={24} className="text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-secondary mb-1">{tests.length}</div>
              <div className="text-sm text-muted-foreground">Тестов пройдено</div>
            </div>
            <div className="p-4 rounded-xl bg-green-100 text-center">
              <Icon name="Heart" size={24} className="text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">{calculateStreak()}</div>
              <div className="text-sm text-muted-foreground">Дней подряд</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-100 text-center">
              <Icon name="Star" size={24} className="text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 mb-1">{favorites.length}</div>
              <div className="text-sm text-muted-foreground">Избранных техник</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Icon name="Trash2" size={24} />
            Опасная зона
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Download" size={20} className="mr-2" />
            Экспортировать все данные
          </Button>
          <Button variant="destructive" className="w-full justify-start" onClick={onLogout}>
            <Icon name="Trash2" size={20} className="mr-2" />
            Удалить аккаунт
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;