import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Заявка отправлена:', formData);
    // Здесь будет логика отправки формы
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon name="Heart" className="text-primary" size={32} />
            <h1 className="text-2xl font-montserrat font-bold text-secondary">ВетДом НН</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-secondary font-open-sans">Нижний Новгород</span>
            <a href="tel:+78312234567" className="text-primary font-semibold">+7 (831) 223-45-67</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-orange-100">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-secondary mb-6 leading-tight">
              Ветеринарная помощь 
              <span className="text-primary"> на дому</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 font-open-sans">
              Профессиональная медицинская помощь вашим питомцам в комфортной домашней обстановке. 
              Опытные врачи, современное оборудование, доступные цены.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Icon name="Clock" size={16} className="mr-2" />
                Выезд за 1 час
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Icon name="Shield" size={16} className="mr-2" />
                Лицензированные врачи
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Icon name="Phone" size={16} className="mr-2" />
                Работаем 24/7
              </Badge>
            </div>

            <Button size="lg" className="text-lg px-8 py-6">
              <Icon name="Phone" size={20} className="mr-2" />
              Вызвать врача сейчас
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="/img/872752f1-24ec-4d2e-b728-1d046f13289f.jpg" 
              alt="Счастливые домашние животные" 
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
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

      {/* Call Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-8">
              Вызвать ветеринара на дом
            </h3>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ваше имя *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Как к вам обращаться?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон *
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Адрес *
                    </label>
                    <Input
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Куда приехать врачу?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Описание проблемы
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Опишите состояние питомца и симптомы"
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full text-lg py-6">
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Оставить заявку на вызов
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
            Наши услуги
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
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
          <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
            Прозрачные цены
          </h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-200">
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

            <Card className="border-2 border-primary shadow-lg scale-105">
              <CardHeader>
                <Badge className="w-fit mb-2">Популярно</Badge>
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

            <Card className="border-2 border-gray-200">
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

      {/* Reviews */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
            Отзывы клиентов
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index} className="bg-white">
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
          <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-12">
            Частые вопросы
          </h3>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="font-montserrat font-semibold">
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
                <Icon name="Heart" className="text-primary" size={24} />
                <h4 className="text-xl font-montserrat font-bold">ВетДом НН</h4>
              </div>
              <p className="text-gray-300 font-open-sans">
                Профессиональная ветеринарная помощь на дому в Нижнем Новгороде
              </p>
            </div>
            
            <div>
              <h5 className="font-montserrat font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 font-open-sans">
                <div className="flex items-center">
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
                <li>Консультации на дому</li>
                <li>Экстренная помощь</li>
                <li>Вакцинация</li>
                <li>Хирургические услуги</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center font-open-sans text-gray-300">
            <p>&copy; 2024 ВетДом НН. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}