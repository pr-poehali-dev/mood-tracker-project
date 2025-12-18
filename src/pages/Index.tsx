import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import MoodDiary from '@/components/MoodDiary';
import Tests from '@/components/Tests';
import Techniques from '@/components/Techniques';
import Statistics from '@/components/Statistics';
import Favorites from '@/components/Favorites';
import Profile from '@/components/Profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState('diary');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-secondary/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-3xl flex items-center justify-center">
              <Icon name="Sparkles" size={28} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">MindCare</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Ваше пространство для заботы о ментальном здоровье
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 bg-card/50 backdrop-blur-sm p-2 rounded-2xl shadow-lg h-auto">
            <TabsTrigger 
              value="diary" 
              className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
            >
              <Icon name="BookOpen" size={20} />
              <span className="text-xs font-medium">Дневник</span>
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
              value="statistics"
              className="flex flex-col gap-1 py-3 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
            >
              <Icon name="BarChart3" size={20} />
              <span className="text-xs font-medium">Статистика</span>
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

          <TabsContent value="diary" className="animate-fade-in">
            <MoodDiary />
          </TabsContent>

          <TabsContent value="tests" className="animate-fade-in">
            <Tests />
          </TabsContent>

          <TabsContent value="techniques" className="animate-fade-in">
            <Techniques />
          </TabsContent>

          <TabsContent value="statistics" className="animate-fade-in">
            <Statistics />
          </TabsContent>

          <TabsContent value="favorites" className="animate-fade-in">
            <Favorites />
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Profile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
