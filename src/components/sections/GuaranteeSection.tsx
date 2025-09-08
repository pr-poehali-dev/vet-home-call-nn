import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const GuaranteeSection = () => {
  const guarantees = [
    {
      icon: "Calendar",
      title: "30 дней на возврат",
      description: "Если результат вас не устроит - вернем деньги полностью"
    },
    {
      icon: "FileText",
      title: "Без лишних вопросов", 
      description: "Простая процедура возврата без сложных условий"
    },
    {
      icon: "Banknote",
      title: "100% компенсация",
      description: "Возвращаем полную стоимость лечения на карту"
    }
  ];

  return (
    <section className="py-12 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-montserrat font-bold text-secondary mb-4">
              Гарантия возврата денег 100%
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы так уверены в качестве нашей работы, что предоставляем полную гарантию возврата средств
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <Card key={index} className="text-center border-green-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={guarantee.icon as any} size={24} className="text-green-600" />
                  </div>
                  <h4 className="font-montserrat font-bold text-secondary mb-2">{guarantee.title}</h4>
                  <p className="text-sm text-gray-600">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;