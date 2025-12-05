// src/features/auth/hooks/usePasswordReset.ts
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
;
import { PasswordResetFormData, passwordResetSchema } from '../schemas/passwordResetSchema';
import { loginApi } from '../api/loginApi';

export const usePasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi.requestPasswordReset(data);
      
      if (response.status === 'success') {
        setIsSuccess(true);
        reset();
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    isSuccess,
    error,
  };
};