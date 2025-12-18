import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type ProfileProps = {
  user: {
    name: string;
    email: string;
    password: string;
    createdAt: string;
  };
  onLogout: () => void;
};

const Profile = ({ user, onLogout }: ProfileProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSaveProfile = () => {
    const updatedUser = { ...user, name, email };
    localStorage.setItem('mindcare_user', JSON.stringify(updatedUser));
    
    const existingUsers = JSON.parse(localStorage.getItem('mindcare_users') || '[]');
    const userIndex = existingUsers.findIndex((u: any) => u.email === user.email);
    if (userIndex !== -1) {
      existingUsers[userIndex] = { ...existingUsers[userIndex], name, email };
      localStorage.setItem('mindcare_users', JSON.stringify(existingUsers));
    }
    
    toast.success('Профиль успешно обновлён');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Вы уверены, что хотите удалить аккаунт? Все данные будут безвозвратно потеряны.')) {
      localStorage.removeItem('mindcare_user');
      localStorage.removeItem(`mindcare_entries_${user.email}`);
      localStorage.removeItem(`mindcare_tests_${user.email}`);
      
      const existingUsers = JSON.parse(localStorage.getItem('mindcare_users') || '[]');
      const filteredUsers = existingUsers.filter((u: any) => u.email !== user.email);
      localStorage.setItem('mindcare_users', JSON.stringify(filteredUsers));
      
      toast.success('Аккаунт удалён');
      onLogout();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="User" size={24} className="text-primary" />
            Личная информация
          </CardTitle>
          <CardDescription>Управляйте своим профилем</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={48} className="text-primary" />
              </div>
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

      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <Icon name="AlertTriangle" size={24} />
            Удаление аккаунта
          </CardTitle>
          <CardDescription>
            Удалить аккаунт и все связанные с ним данные
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            className="w-full justify-start" 
            onClick={handleDeleteAccount}
          >
            <Icon name="Trash2" size={20} className="mr-2" />
            Удалить аккаунт
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
