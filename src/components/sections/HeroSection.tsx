import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { FormData, FormErrors } from '@/types';

interface HeroSectionProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  getAnimationClass: (id: string, animation: string) => string;
  errors?: FormErrors;
  isLoading?: boolean;
}

const HeroSection = memo(({
  formData,
  setFormData,
  isDialogOpen,
  setIsDialogOpen,
  handleSubmit,
  getAnimationClass,
  errors = {},
  isLoading = false
}: HeroSectionProps) => {
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center" aria-label="Главная навигация">
          <div className="flex items-center space-x-2">
            <Icon name="Heart" className="text-primary animate-pulse-soft" size={32} aria-hidden="true" />
            <h1 className="text-2xl font-montserrat font-bold text-secondary">ВетДом НН</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-secondary font-open-sans" aria-label="Город обслуживания">Нижний Новгород</span>
            <a 
              href="tel:+78312234567" 
              className="text-primary font-semibold hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 rounded"
              aria-label="Позвонить по номеру +7 (831) 223-45-67"
            >
              +7 (831) 223-45-67
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative py-20 bg-gradient-to-r from-primary/10 to-orange-100" aria-labelledby="hero-heading">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div 
              id="hero-text" 
              data-animate 
              className={`transition-all duration-700 ${getAnimationClass('hero-text', 'animate-fade-in-left')}`}
            >
              <h2 id="hero-heading" className="text-4xl md:text-5xl font-montserrat font-bold text-secondary mb-6 leading-tight">
                Ветеринарная помощь 
                <span className="text-primary"> на дому</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 font-open-sans">
                Профессиональная медицинская помощь вашим питомцам в комфортной домашней обстановке. 
                Опытные врачи, современное оборудование, доступные цены.
              </p>
            
            <div className="flex flex-wrap gap-4 mb-8" role="list" aria-label="Преимущества сервиса">
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:scale-105 transition-transform" role="listitem">
                <Icon name="Clock" size={16} className="mr-2" aria-hidden="true" />
                <span>Выезд за 1 час</span>
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:scale-105 transition-transform" role="listitem">
                <Icon name="Shield" size={16} className="mr-2" aria-hidden="true" />
                <span>Лицензированные врачи</span>
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:scale-105 transition-transform" role="listitem">
                <Icon name="Phone" size={16} className="mr-2" aria-hidden="true" />
                <span>Работаем 24/7</span>
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
    </>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;