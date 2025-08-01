import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Заявка отправлена:', formData);
    setIsDialogOpen(false);
    // Здесь будет логика отправки формы
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getAnimationClass = (id: string, animation: string) => {
    return visibleElements.has(id) ? animation : 'opacity-0';
  };

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

  const reviews = [
    {
      name: 'Анна Смирнова',
      text: 'Спасибо огромное за спасение нашего кота! Приехали быстро, врач очень опытный.',
      rating: 5,
      date: '2 дня назад'
    },
    {
      name: 'Михаил Петров',
      text: 'Профессиональный подход, доступные цены. Рекомендую всем владельцам животных!',
      rating: 5,
      date: '1 неделю назад'
    },
    {
      name: 'Елена Волкова',
      text: 'Врач приехал в течение часа, провел полный осмотр собаки. Очень довольны!',
      rating: 5,
      date: '2 недели назад'
    }
  ];

  const faqData = [
    {
      question: 'Как быстро приедет врач?',
      answer: 'В экстренных случаях - в течение 1 часа. Плановый вызов - в течение 2-4 часов в удобное для вас время.'
    },
    {
      question: 'Какие районы обслуживаете?',
      answer: 'Мы работаем по всему Нижнему Новгороду и ближайшим районам. Выезд в область обсуждается индивидуально.'
    },
    {
      question: 'Есть ли лицензия?',
      answer: 'Да, все наши врачи имеют лицензии и сертификаты. Мы работаем официально и предоставляем документы.'
    },
    {
      question: 'Можно ли вызвать врача ночью?',
      answer: 'Экстренная помощь оказывается круглосуточно. За ночные вызовы действует наценка 50%.'
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon name="Heart" className="text-primary animate-pulse-soft" size={32} />
            <h1 className="text-2xl font-montserrat font-bold text-secondary">ВетДом НН</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-secondary font-open-sans">Нижний Новгород</span>
            <a href="tel:+78312234567" className="text-primary font-semibold hover:scale-105 transition-transform">
              +7 (831) 223-45-67
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-orange-100">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div 
            id="hero-text" 
            data-animate 
            className={`transition-all duration-700 ${getAnimationClass('hero-text', 'animate-fade-in-left')}`}
          >
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-secondary mb-6 leading-tight">
              Ветеринарная помощь 
              <span className="text-primary"> на дому</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 font-open-sans">
              Профессиональная медицинская помощь вашим питомцам в комфортной домашней обстановке. 
              Опытные врачи, современное оборудование, доступные цены.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:scale-105 transition-transform">
                <Icon name="Clock" size={16} className="mr-2" />
                Выезд за 1 час
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:scale-105 transition-transform">
                <Icon name="Shield" size={16} className="mr-2" />
                Лицензированные врачи
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:scale-105 transition-transform">
                <Icon name="Phone" size={16} className="mr-2" />
                Работаем 24/7
              </Badge>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform animate-pulse-soft">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Вызвать врача сейчас
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-montserrat">Быстрый вызов ветеринара</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ваше имя"
                  />
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Телефон"
                  />
                  <Input
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Адрес"
                  />
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Описание проблемы"
                    rows={3}
                  />
                  <Button type="submit" className="w-full">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div 
            id="hero-image" 
            data-animate 
            className={`relative transition-all duration-700 ${getAnimationClass('hero-image', 'animate-fade-in-right')}`}
          >
            <img 
              src="/img/872752f1-24ec-4d2e-b728-1d046f13289f.jpg" 
              alt="Счастливые домашние животные" 
              className="rounded-2xl shadow-2xl w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg animate-scale-in">
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600 font-open-sans">
                  Счастливых<br />питомцев
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div 
            id="reviews-title" 
            data-animate 
            className={`transition-all duration-700 ${getAnimationClass('reviews-title', 'animate-fade-in-up')}`}
          >
            <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
              Отзывы клиентов
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card 
                key={index} 
                id={`review-${index}`}
                data-animate
                className={`bg-white transition-all duration-700 delay-${index * 200} hover:shadow-lg hover:scale-105 ${getAnimationClass(`review-${index}`, 'animate-fade-in-up')}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700 mb-4 font-open-sans">"{review.text}"</p>
                  <div className="font-semibold text-secondary">{review.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div 
            id="faq-title" 
            data-animate 
            className={`transition-all duration-700 ${getAnimationClass('faq-title', 'animate-fade-in-up')}`}
          >
            <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
              Частые вопросы
            </h3>
          </div>
          <div 
            id="faq-content" 
            data-animate 
            className={`max-w-3xl mx-auto transition-all duration-700 ${getAnimationClass('faq-content', 'animate-scale-in')}`}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 hover:shadow-md transition-shadow">
                  <AccordionTrigger className="font-montserrat font-semibold hover:text-primary transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-open-sans text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Heart" className="text-primary animate-pulse-soft" size={24} />
                <h4 className="text-xl font-montserrat font-bold">ВетДом НН</h4>
              </div>
              <p className="text-gray-300 font-open-sans">
                Профессиональная ветеринарная помощь на дому в Нижнем Новгороде
              </p>
            </div>
            
            <div>
              <h5 className="font-montserrat font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 font-open-sans">
                <div className="flex items-center hover:text-primary transition-colors">
                  <Icon name="Phone" size={16} className="mr-2 text-primary" />
                  <a href="tel:+78312234567">+7 (831) 223-45-67</a>
                </div>
                <div className="flex items-center">
                  <Icon name="MapPin" size={16} className="mr-2 text-primary" />
                  <span>Нижний Новгород</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={16} className="mr-2 text-primary" />
                  <span>Круглосуточно</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-montserrat font-semibold mb-4">Услуги</h5>
              <ul className="space-y-2 font-open-sans text-gray-300">
                <li className="hover:text-white transition-colors cursor-pointer">Консультации на дому</li>
                <li className="hover:text-white transition-colors cursor-pointer">Экстренная помощь</li>
                <li className="hover:text-white transition-colors cursor-pointer">Вакцинация</li>
                <li className="hover:text-white transition-colors cursor-pointer">Хирургические услуги</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center font-open-sans text-gray-300">
            <p>&copy; 2024 ВетДом НН. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full shadow-2xl animate-pulse-soft hover:scale-110 transition-transform"
            >
              <Icon name="Phone" size={24} className="mr-2" />
              Вызов
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
}