import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface UrgencySectionProps {
  setIsFormOpen: (open: boolean) => void;
}

const UrgencySection = ({ setIsFormOpen }: UrgencySectionProps) => {
  return (
    <section className="py-12 bg-gradient-to-r from-red-600 to-orange-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center bg-yellow-400 text-red-800 rounded-full px-4 py-2 mb-4 font-bold text-sm animate-pulse">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            СРОЧНОЕ ПРЕДЛОЖЕНИЕ
          </div>
          <h3 className="text-3xl font-montserrat font-bold mb-4">
            Только сегодня! Скидка 50% на первый визит
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Осталось мест: <span className="font-bold text-yellow-300">3 из 10</span>
          </p>
          
          {/* Countdown Timer */}
          <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-6 max-w-md mx-auto">
            <p className="text-sm mb-2 opacity-80">До окончания акции:</p>
            <div className="flex justify-center space-x-4 text-2xl font-bold">
              <div className="text-center">
                <div className="bg-white text-red-600 rounded px-3 py-2 min-w-[60px]">23</div>
                <div className="text-xs mt-1">часа</div>
              </div>
              <div className="text-center">
                <div className="bg-white text-red-600 rounded px-3 py-2 min-w-[60px]">59</div>
                <div className="text-xs mt-1">мин</div>
              </div>
              <div className="text-center">
                <div className="bg-white text-red-600 rounded px-3 py-2 min-w-[60px]">45</div>
                <div className="text-xs mt-1">сек</div>
              </div>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="bg-yellow-400 text-red-800 hover:bg-yellow-300 text-lg font-bold px-8 py-4 rounded-full animate-bounce"
            onClick={() => setIsFormOpen(true)}
          >
            <Icon name="Zap" size={20} className="mr-2" />
            ЗАПИСАТЬСЯ СО СКИДКОЙ 50%
          </Button>
          
          <p className="text-sm mt-4 opacity-80">
            *Акция действует только при записи через сайт
          </p>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;