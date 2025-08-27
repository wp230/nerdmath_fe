'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@/components/common';
import { useLoginMutation } from '@/hooks/auth';
import type { LoginFormData } from '@/types/auth';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const loginMutation = useLoginMutation();

  const handleInputChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // 에러 메시지 클리어
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = '사용자명을 입력해주세요.';
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await loginMutation.mutateAsync({
        username: formData.username.trim(),
        password: formData.password,
      });
      onSuccess?.();
    } catch (error: any) {
      // API 에러 처리
      if (error.response?.data?.code === 'INVALID_CREDENTIALS') {
        setErrors({
          username: '사용자명 또는 비밀번호가 올바르지 않습니다.',
          password: '사용자명 또는 비밀번호가 올바르지 않습니다.',
        });
      } else {
        setErrors({
          username: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
          <p className="text-gray-600 mt-2">계정에 로그인하세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="사용자명"
            type="text"
            value={formData.username}
            onChange={handleInputChange('username')}
            error={errors.username}
            placeholder="사용자명을 입력하세요"
            autoComplete="username"
            required
          />

          <Input
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleInputChange('password')}
            error={errors.password}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={loginMutation.isPending}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              회원가입
            </Link>
          </p>

          <Link
            href="/reset-password"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
