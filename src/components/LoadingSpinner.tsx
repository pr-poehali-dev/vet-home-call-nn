import React from 'react';
import Icon from '@/components/ui/icon';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Загрузка...',
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeMap = {
    sm: { icon: 16, container: 'py-4' },
    md: { icon: 24, container: 'py-8' },
    lg: { icon: 32, container: 'py-12' }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${sizeMap[size].container} ${className}`}>
      <Icon 
        name="Loader2" 
        size={sizeMap[size].icon} 
        className="animate-spin text-primary mb-2" 
      />
      <p className="text-gray-600 font-open-sans text-sm">{text}</p>
    </div>
  );
};

export default LoadingSpinner;