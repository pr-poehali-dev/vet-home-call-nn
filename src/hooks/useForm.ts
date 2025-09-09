import { useState, useCallback } from 'react';

export interface FormData {
  name: string;
  phone: string;
  address: string;
  description: string;
}

export const useForm = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязательен';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Неверный формат телефона';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Адрес обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setIsLoading(false);
  }, [initialData]);

  const submitForm = useCallback(async (onSubmit?: (data: FormData) => Promise<void>) => {
    if (!validate()) return false;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      resetForm();
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [formData, validate, resetForm]);

  return {
    formData,
    setFormData,
    updateField,
    errors,
    isLoading,
    validate,
    resetForm,
    submitForm
  };
};