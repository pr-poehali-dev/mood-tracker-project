import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type AuthProps = {
  onLogin: (name: string, email: string) => void;
};

const Auth = ({ onLogin }: AuthProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error('Заполните все поля');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Введите корректный email');
      return;
    }

    onLogin(name, email);
    toast.success(isRegistering ? 'Профиль создан!' : 'Добро пожаловать!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Sparkles" size={32} className="text-primary" />
          </div>
          <CardTitle className="text-3xl">MindCare</CardTitle>
          <CardDescription className="text-base">
            {isRegistering 
              ? 'Создайте профиль для сохранения ваших данных' 
              : 'Войдите или создайте новый профиль'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                placeholder="Александр"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base">
              {isRegistering ? (
                <>
                  <Icon name="UserPlus" size={20} className="mr-2" />
                  Создать профиль
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти
                </>
              )}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm"
              >
                {isRegistering ? 'Уже есть профиль? Войти' : 'Нет профиля? Создать'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Ваши данные хранятся локально в браузере и никуда не передаются
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
