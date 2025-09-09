import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ServicesSectionProps {
  getAnimationClass: (id: string, animation: string) => string;
}

const ServicesSection = memo(({ getAnimationClass }: ServicesSectionProps) => {
  const services = [
    {
      icon: 'Stethoscope',
      title: 'Общий осмотр',
      description: 'Полная диагностика состояния здоровья вашего питомца',
      price: 'от 1500 ₽'
    },
    {
      icon: 'Syringe',
      title: 'Вакцинация',
      description: 'Профилактические прививки по графику',
      price: 'от 800 ₽'
    },
    {
      icon: 'Heart',
      title: 'Экстренная помощь',
      description: 'Срочная медицинская помощь 24/7',
      price: 'от 2500 ₽'
    },
    {
      icon: 'Scissors',
      title: 'Хирургия',
      description: 'Операции любой сложности на дому',
      price: 'от 5000 ₽'
    }
  ];

  const zones = [
    { name: 'Нижегородский район', time: '20-40 мин', color: 'bg-green-400' },
    { name: 'Автозаводский район', time: '30-50 мин', color: 'bg-yellow-400' },
    { name: 'Ленинский район', time: '25-45 мин', color: 'bg-blue-400' },
    { name: 'Советский район', time: '35-55 мин', color: 'bg-purple-400' },
    { name: 'Канавинский район', time: '15-35 мин', color: 'bg-green-400' },
    { name: 'Московский район', time: '40-60 мин', color: 'bg-orange-400' }
  ];

  const doctors = [
    {
      name: 'Елена Михайловна Соколова',
      specialization: 'Главный ветеринар, терапевт',
      experience: '15 лет опыта',
      description: 'Специализируется на комплексной диагностике и лечении домашних животных. Эксперт по внутренним болезням кошек и собак.',
      image: '/img/bf07cebe-5bbd-4978-8918-41e033828f0d.jpg'
    },
    {
      name: 'Александр Петрович Волков',
      specialization: 'Хирург-ортопед',
      experience: '20 лет опыта',
      description: 'Проводит сложные хирургические операции, специалист по травматологии и ортопедии. Опыт работы с экзотическими животными.',
      image: '/img/a0306b70-5843-42ea-92ab-671d0caf3ca1.jpg'
    },
    {
      name: 'Мария Сергеевна Лебедева',
      specialization: 'Терапевт, дерматолог',
      experience: '8 лет опыта',
      description: 'Эксперт по кожным заболеваниям и аллергиям у животных. Специализируется на работе с грызунами и кроликами.',
      image: '/img/dbf00f78-6e44-4997-ba57-248f8b058533.jpg'
    }
  ];

  return (
    <>
      {/* Service Zones Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div 
            id="zones-title" 
            data-animate 
            className={`transition-all duration-700 ${getAnimationClass('zones-title', 'animate-fade-in-up')}`}
          >
            <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
              Зоны обслуживания
            </h3>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {zones.map((zone, index) => (
                <Card 
                  key={index} 
                  id={`zone-${index}`}
                  data-animate
                  className={`transition-all duration-700 delay-${index * 100} hover:shadow-lg hover:scale-105 ${getAnimationClass(`zone-${index}`, 'animate-scale-in')}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${zone.color}`}></div>
                      <div>
                        <h4 className="font-montserrat font-semibold">{zone.name}</h4>
                        <p className="text-sm text-gray-600 font-open-sans">Время прибытия: {zone.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 font-open-sans mb-4">
                Работаем по всему Нижнему Новгороду и ближайшим районам
              </p>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Icon name="MapPin" size={16} className="mr-2" />
                Уточнить время для вашего адреса
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div 
            id="services-title" 
            data-animate 
            className={`transition-all duration-700 ${getAnimationClass('services-title', 'animate-fade-in-up')}`}
          >
            <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
              Наши услуги
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                id={`service-${index}`}
                data-animate
                className={`transition-all duration-700 delay-${index * 150} hover:shadow-lg hover:scale-105 ${getAnimationClass(`service-${index}`, 'animate-scale-in')}`}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Icon name={service.icon as any} size={32} className="text-primary" />
                  </div>
                  <CardTitle className="font-montserrat">{service.title}</CardTitle>
                  <CardDescription className="font-open-sans">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-xl font-bold text-primary">{service.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div 
            id="pricing-title" 
            data-animate 
            className={`transition-all duration-700 ${getAnimationClass('pricing-title', 'animate-fade-in-up')}`}
          >
            <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
              Прозрачные цены
            </h3>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <Card 
              id="price-1" 
              data-animate 
              className={`border-2 border-gray-200 transition-all duration-700 hover:shadow-lg hover:scale-105 ${getAnimationClass('price-1', 'animate-fade-in-left')}`}
            >
              <CardHeader>
                <CardTitle className="font-montserrat">Консультация</CardTitle>
                <div className="text-3xl font-bold text-primary">1500 ₽</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-open-sans text-sm">
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Осмотр питомца</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Консультация врача</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Рекомендации по уходу</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              id="price-2" 
              data-animate 
              className={`border-2 border-primary shadow-lg scale-105 transition-all duration-700 hover:scale-110 ${getAnimationClass('price-2', 'animate-scale-in')}`}
            >
              <CardHeader>
                <Badge className="w-fit mb-2 animate-pulse-soft">Популярно</Badge>
                <CardTitle className="font-montserrat">Полный осмотр</CardTitle>
                <div className="text-3xl font-bold text-primary">2500 ₽</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-open-sans text-sm">
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Детальный осмотр</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Измерение температуры</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />План лечения</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Рецепты препаратов</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              id="price-3" 
              data-animate 
              className={`border-2 border-gray-200 transition-all duration-700 hover:shadow-lg hover:scale-105 ${getAnimationClass('price-3', 'animate-fade-in-right')}`}
            >
              <CardHeader>
                <CardTitle className="font-montserrat">Экстренный вызов</CardTitle>
                <div className="text-3xl font-bold text-primary">3500 ₽</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 font-open-sans text-sm">
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Срочный выезд</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Экстренная помощь</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Стабилизация состояния</li>
                  <li className="flex items-center"><Icon name="Check" size={16} className="text-green-500 mr-2" />Круглосуточно</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div 
            id="doctors-title" 
            data-animate 
            className={`transition-all duration-700 ${getAnimationClass('doctors-title', 'animate-fade-in-up')}`}
          >
            <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-4">
              Наши врачи
            </h3>
            <p className="text-center text-gray-600 font-open-sans mb-12 max-w-2xl mx-auto">
              Опытные специалисты с любовью к животным и профессиональным подходом к лечению
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {doctors.map((doctor, index) => (
              <Card 
                key={index} 
                id={`doctor-${index}`}
                data-animate
                className={`bg-white transition-all duration-700 delay-${index * 150} hover:shadow-xl hover:-translate-y-2 ${getAnimationClass(`doctor-${index}`, 'animate-scale-in')}`}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-montserrat font-bold text-secondary mb-2">{doctor.name}</h4>
                  <Badge variant="secondary" className="mb-3">{doctor.specialization}</Badge>
                  <div className="flex items-center text-primary font-semibold text-sm mb-3">
                    <Icon name="Award" size={16} className="mr-1" />
                    {doctor.experience}
                  </div>
                  <p className="text-gray-600 font-open-sans text-sm">{doctor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;