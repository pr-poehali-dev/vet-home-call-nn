import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useForm } from '@/hooks/useForm';
import { FormData } from '@/types';

describe('useForm', () => {
  const initialFormData: FormData = {
    name: '',
    phone: '',
    address: '',
    description: ''
  };

  it('should initialize with provided initial data', () => {
    const { result } = renderHook(() => useForm(initialFormData));
    
    expect(result.current.formData).toEqual(initialFormData);
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it('should update field correctly', () => {
    const { result } = renderHook(() => useForm(initialFormData));
    
    act(() => {
      result.current.updateField('name', 'Иван Петров');
    });
    
    expect(result.current.formData.name).toBe('Иван Петров');
  });

  it('should validate required fields', () => {
    const { result } = renderHook(() => useForm(initialFormData));
    
    act(() => {
      const isValid = result.current.validate();
      expect(isValid).toBe(false);
    });
    
    expect(result.current.errors.name).toBe('Имя обязательно');
    expect(result.current.errors.phone).toBe('Телефон обязателен');
    expect(result.current.errors.address).toBe('Адрес обязателен');
  });

  it('should validate phone format', () => {
    const { result } = renderHook(() => useForm(initialFormData));
    
    act(() => {
      result.current.updateField('phone', '123');
      result.current.validate();
    });
    
    expect(result.current.errors.phone).toBe('Неверный формат телефона');
    
    act(() => {
      result.current.updateField('phone', '+7 (831) 223-45-67');
      result.current.validate();
    });
    
    expect(result.current.errors.phone).toBeUndefined();
  });

  it('should clear error when field is updated', () => {
    const { result } = renderHook(() => useForm(initialFormData));
    
    // Создаем ошибку
    act(() => {
      result.current.validate();
    });
    
    expect(result.current.errors.name).toBe('Имя обязательно');
    
    // Обновляем поле
    act(() => {
      result.current.updateField('name', 'Иван');
    });
    
    expect(result.current.errors.name).toBeUndefined();
  });

  it('should reset form correctly', () => {
    const { result } = renderHook(() => useForm(initialFormData));
    
    // Заполняем форму
    act(() => {
      result.current.updateField('name', 'Иван');
      result.current.updateField('phone', '+7 (831) 223-45-67');
    });
    
    // Создаем ошибки
    act(() => {
      result.current.validate();
    });
    
    // Сбрасываем
    act(() => {
      result.current.resetForm();
    });
    
    expect(result.current.formData).toEqual(initialFormData);
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle form submission correctly', async () => {
    const { result } = renderHook(() => useForm(initialFormData));
    let submittedData: FormData | null = null;
    
    // Заполняем валидные данные
    act(() => {
      result.current.updateField('name', 'Иван Петров');
      result.current.updateField('phone', '+7 (831) 223-45-67');
      result.current.updateField('address', 'ул. Ленина, 1');
    });
    
    // Отправляем форму
    await act(async () => {
      const success = await result.current.submitForm(async (data) => {
        submittedData = data;
      });
      expect(success).toBe(true);
    });
    
    expect(submittedData).toEqual({
      name: 'Иван Петров',
      phone: '+7 (831) 223-45-67',
      address: 'ул. Ленина, 1',
      description: ''
    });
  });

  it('should not submit form with validation errors', async () => {
    const { result } = renderHook(() => useForm(initialFormData));
    
    await act(async () => {
      const success = await result.current.submitForm();
      expect(success).toBe(false);
    });
    
    expect(result.current.errors.name).toBe('Имя обязательно');
  });
});