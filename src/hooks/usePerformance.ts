import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  connectionType: string;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0,
    memoryUsage: 0,
    connectionType: 'unknown'
  });

  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      const memory = (performance as any).memory;
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

      const loadTime = navigation?.loadEventEnd - navigation?.navigationStart || 0;
      const renderTime = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      
      setMetrics({
        loadTime: Math.round(loadTime),
        renderTime: Math.round(renderTime),
        interactionTime: 0, // Будет обновляться при взаимодействиях
        memoryUsage: memory ? Math.round(memory.usedJSHeapSize / 1048576) : 0, // MB
        connectionType: connection?.effectiveType || 'unknown'
      });
    };

    // Измеряем после полной загрузки
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Мониторинг взаимодействий
    let interactionStart = 0;
    const handleInteractionStart = () => {
      interactionStart = performance.now();
    };

    const handleInteractionEnd = () => {
      if (interactionStart > 0) {
        const interactionTime = performance.now() - interactionStart;
        setMetrics(prev => ({
          ...prev,
          interactionTime: Math.round(interactionTime)
        }));
        interactionStart = 0;
      }
    };

    document.addEventListener('click', handleInteractionStart);
    document.addEventListener('keydown', handleInteractionStart);
    document.addEventListener('touchstart', handleInteractionStart);
    
    // Используем setTimeout для измерения времени отклика
    document.addEventListener('click', () => {
      setTimeout(handleInteractionEnd, 0);
    });

    return () => {
      window.removeEventListener('load', measurePerformance);
      document.removeEventListener('click', handleInteractionStart);
      document.removeEventListener('keydown', handleInteractionStart);
      document.removeEventListener('touchstart', handleInteractionStart);
    };
  }, []);

  const logMetrics = () => {
    console.group('🚀 Performance Metrics');
    console.log(`⏱️ Load Time: ${metrics.loadTime}ms`);
    console.log(`🎨 Render Time: ${metrics.renderTime}ms`);
    console.log(`👆 Interaction Time: ${metrics.interactionTime}ms`);
    console.log(`🧠 Memory Usage: ${metrics.memoryUsage}MB`);
    console.log(`📡 Connection: ${metrics.connectionType}`);
    console.groupEnd();
  };

  const trackUserAction = (action: string, category: string = 'user') => {
    const timestamp = new Date().toISOString();
    const data = {
      action,
      category,
      timestamp,
      url: window.location.pathname,
      userAgent: navigator.userAgent,
      metrics: metrics
    };
    
    console.log('📊 User Action:', data);
    
    // В реальном приложении здесь была бы отправка в аналитику
    // analytics.track(data);
  };

  const measureComponentRender = (componentName: string) => {
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      const renderTime = Math.round(end - start);
      console.log(`🔄 ${componentName} render time: ${renderTime}ms`);
    };
  };

  return {
    metrics,
    logMetrics,
    trackUserAction,
    measureComponentRender
  };
};