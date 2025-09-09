import React, { memo, useCallback } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useAnimations } from '@/hooks/useAnimations';
import { useForm } from '@/hooks/useForm';
import { useExitIntent } from '@/hooks/useExitIntent';
import { FormData } from '@/types';
import SEO from '@/components/SEO';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';
import UrgencySection from '@/components/sections/UrgencySection';
import GuaranteeSection from '@/components/sections/GuaranteeSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FooterSection from '@/components/sections/FooterSection';
import ChatBot from '@/components/ChatBot';

const Index = memo(() => {
  const initialFormData: FormData = {
    name: '',
    phone: '',
    address: '',
    description: ''
  };

  const { getAnimationClass } = useAnimations();
  const { 
    formData, 
    setFormData, 
    errors, 
    isLoading, 
    submitForm 
  } = useForm(initialFormData);
  const { 
    isExitPopupOpen, 
    setIsExitPopupOpen 
  } = useExitIntent();
  
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(async (data) => {
      console.log('Заявка отправлена:', data);
      // Здесь будет API вызов
      await new Promise(resolve => setTimeout(resolve, 1000));
    });
    
    if (success) {
      setIsDialogOpen(false);
    }
  }, [submitForm]);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const closeExitPopup = useCallback(() => {
    setIsExitPopupOpen(false);
  }, [setIsExitPopupOpen]);

  return (
    <HelmetProvider>
      <SEO />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white custom-scrollbar">
        <HeroSection 
          formData={formData}
          setFormData={setFormData}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={openDialog}
          handleSubmit={handleSubmit}
          getAnimationClass={getAnimationClass}
          errors={errors}
          isLoading={isLoading}
        />
        
        <ServicesSection getAnimationClass={getAnimationClass} />
        
        <SuccessStoriesSection getAnimationClass={getAnimationClass} />
        
        <UrgencySection setIsFormOpen={openDialog} />
        
        <GuaranteeSection />
        
        <ReviewsSection getAnimationClass={getAnimationClass} />
        
        <FooterSection 
          formData={formData}
          setFormData={setFormData}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={closeDialog}
          handleSubmit={handleSubmit}
          isExitPopupOpen={isExitPopupOpen}
          setIsExitPopupOpen={closeExitPopup}
          getAnimationClass={getAnimationClass}
          errors={errors}
          isLoading={isLoading}
        />
        
        <ChatBot />
      </div>
    </HelmetProvider>
  );
});

Index.displayName = 'Index';

export default Index;