import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface FooterSectionProps {
  formData: {
    name: string;
    phone: string;
    address: string;
    description: string;
  };
  setFormData: (data: any) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isExitPopupOpen: boolean;
  setIsExitPopupOpen: (open: boolean) => void;
  getAnimationClass: (id: string, animation: string) => string;
}

const FooterSection = ({
  formData,
  setFormData,
  isDialogOpen,
  setIsDialogOpen,
  handleSubmit,
  isExitPopupOpen,
  setIsExitPopupOpen,
  getAnimationClass
}: FooterSectionProps) => {
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
    <>
      {/* FAQ */}
      <section className="py-16 bg-gray-50">
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Вызов ветеринара на дом</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                placeholder="Ваше имя" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
              <Input 
                placeholder="Номер телефона" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
              <Input 
                placeholder="Адрес" 
                value={formData.address} 
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required 
              />
              <Textarea 
                placeholder="Опишите состояние питомца"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <Button type="submit" className="w-full">Вызвать врача</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Exit Intent Popup */}
      <Dialog open={isExitPopupOpen} onOpenChange={setIsExitPopupOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Не уходите! 🎉</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="text-4xl">🐾</div>
            <h3 className="text-xl font-bold text-primary">Специальное предложение!</h3>
            <p className="text-gray-600">Первый осмотр на дому со скидкой <span className="text-2xl font-bold text-red-500">30%</span></p>
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm text-gray-700">
                <strong>Только сегодня:</strong> Комплексный осмотр + консультация всего за 1400₽ вместо 2000₽
              </p>
            </div>
            <div className="space-y-2">
              <Button 
                className="w-full" 
                onClick={() => {
                  setIsExitPopupOpen(false);
                  setIsDialogOpen(true);
                }}
              >
                <Icon name="Phone" size={16} className="mr-2" />
                Получить скидку
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setIsExitPopupOpen(false)}
              >
                Может быть, позже
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FooterSection;