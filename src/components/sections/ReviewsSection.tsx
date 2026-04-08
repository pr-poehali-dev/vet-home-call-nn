import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ReviewsSectionProps {
  getAnimationClass: (id: string, animation: string) => string;
}

const ReviewsSection = ({ getAnimationClass }: ReviewsSectionProps) => {
  const reviews = [
    {
      name: "Анна Петрова",
      text: "Спасибо огромное! Мурзик был очень болен, но врачи поставили его на ноги за несколько дней. Профессионализм на высшем уровне!",
      rating: 5,
      date: "2 дня назад",
      photo: "/img/2766dfa5-0de8-407e-b886-56847eed852d.jpg",
      petName: "Мурзик (кот)"
    },
    {
      name: "Дмитрий Смирнов", 
      text: "Рекс попал под машину, думали все кончено. Но здесь творят чудеса! Операция прошла отлично, собака снова бегает как ни в чем не бывало.",
      rating: 5,
      date: "5 дней назад",
      photo: "/img/f508f102-8ae4-4e3d-8d7a-9777ee6b7d9d.jpg",
      petName: "Рекс (собака)"
    },
    {
      name: "Семья Ивановых",
      text: "Привели Белку с проблемами пищеварения. Врач очень внимательно осмотрел, назначил лечение. Через неделю питомец здоров!",
      rating: 5, 
      date: "1 неделю назад",
      photo: "/img/5c44ef27-fb2b-46ce-9e5d-021bd49799fd.jpg",
      petName: "Белка (собака)"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div 
          id="reviews-title" 
          data-animate 
          className={`transition-all duration-700 ${getAnimationClass('reviews-title', 'animate-fade-in-up')}`}
        >
          <h3 className="text-3xl font-montserrat font-bold text-center text-secondary mb-4">
            Отзывы наших клиентов
          </h3>
          <p className="text-center text-gray-600 font-open-sans mb-12 max-w-2xl mx-auto">
            Более 2000 счастливых питомцев и их владельцев доверяют нам здоровье своих любимцев
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card 
              key={index} 
              id={`review-${index}`}
              data-animate
              className={`bg-white transition-all duration-700 delay-${index * 200} hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-primary ${getAnimationClass(`review-${index}`, 'animate-fade-in-up')}`}
            >
              <CardContent className="p-6">
                {/* Photo Section */}
                <div className="mb-4">
                  <img 
                    src={review.photo} 
                    alt={`${review.name} с ${review.petName}`}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 font-open-sans">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {review.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-secondary">{review.name}</p>
                    <p className="text-xs text-gray-500">Владелец: {review.petName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <Icon name="Users" size={20} className="text-primary mr-2" />
            <span className="text-primary font-semibold">Более 2000 довольных клиентов</span>
          </div>
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-montserrat font-bold text-primary">4.9</div>
              <div className="text-sm text-gray-600">Рейтинг</div>
            </div>
            <div>
              <div className="text-2xl font-montserrat font-bold text-primary">500+</div>
              <div className="text-sm text-gray-600">Отзывов</div>
            </div>
            <div>
              <div className="text-2xl font-montserrat font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-600">Поддержка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;