import { useState, useEffect, useCallback } from 'react';

export const useExitIntent = (delay: number = 5000) => {
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const showPopup = useCallback(() => {
    if (!hasShown) {
      setIsExitPopupOpen(true);
      setHasShown(true);
      localStorage.setItem('exitPopupShown', 'true');
    }
  }, [hasShown]);

  useEffect(() => {
    const shown = localStorage.getItem('exitPopupShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        showPopup();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !hasShown) {
        showPopup();
      }
    };

    timeoutId = setTimeout(() => {
      if (!hasShown) {
        showPopup();
      }
    }, delay);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [delay, hasShown, showPopup]);

  const closePopup = useCallback(() => {
    setIsExitPopupOpen(false);
  }, []);

  const resetExitIntent = useCallback(() => {
    localStorage.removeItem('exitPopupShown');
    setHasShown(false);
    setIsExitPopupOpen(false);
  }, []);

  return {
    isExitPopupOpen,
    setIsExitPopupOpen,
    closePopup,
    resetExitIntent
  };
};