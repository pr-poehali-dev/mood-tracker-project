import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const EmergencyHelp = () => {
  const services = [
    {
      name: 'Телефон доверия',
      number: '8-800-2000-122',
      description: 'Бесплатная психологическая помощь 24/7',
      icon: 'Phone',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      name: 'Служба экстренной помощи',
      number: '112',
      description: 'Экстренные службы (полиция, скорая, пожарные)',
      icon: 'AlertCircle',
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600',
    },
    {
      name: 'Центр кризисной помощи',
      number: '8-495-051',
      description: 'Поддержка в кризисных ситуациях',
      icon: 'Heart',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <Card className="border-2 border-orange-200 bg-orange-50/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-200 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="AlertTriangle" size={20} className="text-orange-700" />
          </div>
          <div>
            <h3 className="font-semibold text-orange-900 mb-1">
              Нужна экстренная помощь?
            </h3>
            <p className="text-sm text-orange-800">
              Если вы чувствуете, что находитесь в кризисной ситуации — обратитесь за профессиональной помощью
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border-2 ${service.color} flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${service.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={service.icon as any} size={20} className={service.iconColor} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{service.name}</div>
                  <div className="text-xs text-muted-foreground">{service.description}</div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0"
                asChild
              >
                <a href={`tel:${service.number.replace(/[^0-9]/g, '')}`}>
                  <Icon name="Phone" size={16} className="mr-2" />
                  {service.number}
                </a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-orange-200">
          <div className="flex flex-wrap gap-2">
            <Button variant="link" size="sm" className="h-auto py-1 px-2 text-xs" asChild>
              <a href="https://www.who.int/mental_health/suicide-prevention/en/" target="_blank" rel="noopener noreferrer">
                <Icon name="ExternalLink" size={14} className="mr-1" />
                ВОЗ: Профилактика суицидов
              </a>
            </Button>
            <Button variant="link" size="sm" className="h-auto py-1 px-2 text-xs" asChild>
              <a href="https://psychiatr.ru" target="_blank" rel="noopener noreferrer">
                <Icon name="ExternalLink" size={14} className="mr-1" />
                Российское общество психиатров
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyHelp;
