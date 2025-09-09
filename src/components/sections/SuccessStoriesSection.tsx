import { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SuccessStoriesSectionProps {
  getAnimationClass: (id: string, animation: string) => string;
}

const SuccessStoriesSection = ({ getAnimationClass }: SuccessStoriesSectionProps) => {
  const stories = [
    {
      title: "Спасение Мурзика",
      description: "Тяжелое отравление превратилось в полное выздоровление за 5 дней",
      image: "/img/d406ab69-2638-499a-992c-46baccefa37f.jpg",
      duration: "5 дней лечения"
    },
    {
      title: "Операция Рекса", 
      description: "Сложный перелом лапы - успешная операция и полная реабилитация",
      image: "/img/f8094e65-4045-4516-a760-5941a040ed18.jpg",
      duration: "2 недели восстановления"
    },
    {
      title: "Лечение кролика Пушка",
      description: "Проблемы с пищеварением решены комплексной терапией",
      image: "/img/11d9e6f2-055a-493f-8cdb-edfa46aee1d9.jpg", 
      duration: "10 дней лечения"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div 
          id="success-title" 
          data-animate 
          className={`transition-all duration-700 ${getAnimationClass('success-title', 'animate-fade-in-up')}`}
        >
          <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-4">
            Истории выздоровления
          </h3>
          <p className="text-center text-gray-600 font-open-sans mb-12 max-w-2xl mx-auto">
            Реальные результаты нашей работы - до и после лечения
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story, index) => (
            <Card 
              key={index}
              id={`success-${index}`}
              data-animate
              className={`transition-all duration-700 delay-${index * 200} hover:shadow-xl hover:-translate-y-2 overflow-hidden ${getAnimationClass(`success-${index}`, 'animate-scale-in')}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">
                    <Icon name="Check" size={12} className="mr-1" />
                    Успех
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h4 className="text-lg font-montserrat font-bold text-secondary mb-2">{story.title}</h4>
                <p className="text-gray-600 font-open-sans text-sm mb-4">{story.description}</p>
                <div className="flex items-center text-primary">
                  <Icon name="Clock" size={16} className="mr-2" />
                  <span className="text-sm font-semibold">{story.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-green-100 rounded-full px-6 py-3 mb-4">
            <Icon name="TrendingUp" size={20} className="text-green-600 mr-2" />
            <span className="text-green-700 font-semibold">95% успешных случаев</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(SuccessStoriesSection);