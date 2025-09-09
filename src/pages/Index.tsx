import React, { memo, useCallback, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useAnimations } from '@/hooks/useAnimations';
import { useForm } from '@/hooks/useForm';
import { useExitIntent } from '@/hooks/useExitIntent';
import { usePerformance } from '@/hooks/usePerformance';
import { FormData } from '@/types';
import SEO from '@/components/SEO';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import HeroSection from '@/components/sections/HeroSection';

// Lazy loaded components
const ServicesSection = lazy(() => import('@/components/sections/ServicesSection'));
const SuccessStoriesSection = lazy(() => import('@/components/sections/SuccessStoriesSection'));
const UrgencySection = lazy(() => import('@/components/sections/UrgencySection'));
const GuaranteeSection = lazy(() => import('@/components/sections/GuaranteeSection'));
const ReviewsSection = lazy(() => import('@/components/sections/ReviewsSection'));
const FooterSection = lazy(() => import('@/components/sections/FooterSection'));
const ChatBot = lazy(() => import('@/components/ChatBot'));

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
  const { trackUserAction, logMetrics } = usePerformance();
  
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
    trackUserAction('open_dialog', 'form');
  }, [trackUserAction]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    trackUserAction('close_dialog', 'form');
  }, [trackUserAction]);

  const closeExitPopup = useCallback(() => {
    setIsExitPopupOpen(false);
  }, [setIsExitPopupOpen]);

  // Performance logging для разработки
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setTimeout(logMetrics, 2000);
    }
  }, [logMetrics]);

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
        
        <ErrorBoundary fallback="Ошибка загрузки услуг">
          <Suspense fallback={<LoadingSpinner />}>
            <ServicesSection getAnimationClass={getAnimationClass} />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback="Ошибка загрузки историй">
          <Suspense fallback={<LoadingSpinner />}>
            <SuccessStoriesSection getAnimationClass={getAnimationClass} />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback="Ошибка загрузки предложения">
          <Suspense fallback={<LoadingSpinner />}>
            <UrgencySection setIsFormOpen={openDialog} />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback="Ошибка загрузки гарантий">
          <Suspense fallback={<LoadingSpinner />}>
            <GuaranteeSection />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback="Ошибка загрузки отзывов">
          <Suspense fallback={<LoadingSpinner />}>
            <ReviewsSection getAnimationClass={getAnimationClass} />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback="Ошибка загрузки футера">
          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback="Ошибка загрузки чата">
          <Suspense fallback={<LoadingSpinner />}>
            <ChatBot />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HelmetProvider>
  );
});

Index.displayName = 'Index';

export default Index;