import { useState, useEffect, useRef } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';
import UrgencySection from '@/components/sections/UrgencySection';
import GuaranteeSection from '@/components/sections/GuaranteeSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FooterSection from '@/components/sections/FooterSection';
import ChatBot from '@/components/ChatBot';

export default function Index() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
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

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsExitPopupOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getAnimationClass = (id: string, animation: string) => {
    return visibleElements.has(id) ? animation : 'opacity-0';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <HeroSection 
        formData={formData}
        setFormData={setFormData}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleSubmit={handleSubmit}
        getAnimationClass={getAnimationClass}
      />
      
      <ServicesSection getAnimationClass={getAnimationClass} />
      
      <SuccessStoriesSection getAnimationClass={getAnimationClass} />
      
      <UrgencySection setIsFormOpen={setIsDialogOpen} />
      
      <GuaranteeSection />
      
      <ReviewsSection getAnimationClass={getAnimationClass} />
      
      <FooterSection 
        formData={formData}
        setFormData={setFormData}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleSubmit={handleSubmit}
        isExitPopupOpen={isExitPopupOpen}
        setIsExitPopupOpen={setIsExitPopupOpen}
        getAnimationClass={getAnimationClass}
      />
      
      <ChatBot />
    </div>
  );
}