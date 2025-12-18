import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Auth from '@/components/Auth';
import MoodDiary from '@/components/MoodDiary';
import Tests from '@/components/Tests';
import Techniques from '@/components/Techniques';
import History from '@/components/History';
import Favorites from '@/components/Favorites';
import Profile from '@/components/Profile';
import EmergencyHelp from '@/components/EmergencyHelp';

type UserProfile = {
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('diary');
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('mindcare_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (name: string, email: string, password: string) => {
    const newUser: UserProfile = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('mindcare_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('mindcare_user');
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-primary/10 rounded-3xl flex items-center justify-center">
                <Icon name="Sparkles" size={28} className="text-primary" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-foreground">Дневник настроения</h1>
                <p className="text-sm text-muted-foreground">Привет, {user.name}!</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
          <p className="text-muted-foreground text-lg">
            Ваше пространство для заботы о ментальном здоровье
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2 bg-card/50 backdrop-blur-sm p-2 rounded-2xl shadow-lg h-auto">
            <TabsTrigger 
              value="diary" 
              className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
            >
              <Icon name="BookOpen" size={20} />
              <span className="text-xs font-medium">Дневник</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
            >
              <Icon name="Clock" size={20} />
              <span className="text-xs font-medium">История</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tests"
              className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
            >
              <Icon name="ClipboardList" size={20} />
              <span className="text-xs font-medium">Тесты</span>
            </TabsTrigger>
            <TabsTrigger 
              value="techniques"
              className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
            >
              <Icon name="Heart" size={20} />
              <span className="text-xs font-medium">Техники</span>
            </TabsTrigger>
            <TabsTrigger 
              value="favorites"
              className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
            >
              <Icon name="Star" size={20} />
              <span className="text-xs font-medium">Избранное</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
            >
              <Icon name="User" size={20} />
              <span className="text-xs font-medium">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diary" className="animate-fade-in space-y-6">
            <MoodDiary userEmail={user.email} />
            <EmergencyHelp />
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in space-y-6">
            <History userEmail={user.email} />
            <EmergencyHelp />
          </TabsContent>

          <TabsContent value="tests" className="animate-fade-in space-y-6">
            <Tests userEmail={user.email} />
            <EmergencyHelp />
          </TabsContent>

          <TabsContent value="techniques" className="animate-fade-in space-y-6">
            <Techniques />
            <EmergencyHelp />
          </TabsContent>

          <TabsContent value="favorites" className="animate-fade-in space-y-6">
            <Favorites />
            <EmergencyHelp />
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in space-y-6">
            <Profile user={user} onLogout={handleLogout} />
            <EmergencyHelp />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;