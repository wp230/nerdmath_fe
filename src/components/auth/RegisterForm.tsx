'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input } from '@/components/common';
import {
  useRegisterMutation,
  useSendVerificationCodeMutation,
  useCheckUsernameMutation,
  useCheckEmailMutation,
} from '@/hooks/auth';
import { defaultValidationRules } from '@/types/auth';
import type { RegisterFormData } from '@/types/auth';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    verificationCode: '',
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [codeTimer, setCodeTimer] = useState(0);

  const registerMutation = useRegisterMutation();
  const sendCodeMutation = useSendVerificationCodeMutation();
  const checkUsernameMutation = useCheckUsernameMutation();
  const checkEmailMutation = useCheckEmailMutation();

  const handleInputChange =
    (field: keyof RegisterFormData) =>
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

  const validateField = async (
    field: keyof RegisterFormData,
    value: string
  ): Promise<string | undefined> => {
    const rules = defaultValidationRules;

    switch (field) {
      case 'username':
        if (!value.trim()) return '사용자명을 입력해주세요.';
        if (value.length < rules.username.minLength) {
          return `사용자명은 최소 ${rules.username.minLength}자 이상이어야 합니다.`;
        }
        if (value.length > rules.username.maxLength) {
          return `사용자명은 최대 ${rules.username.maxLength}자까지 가능합니다.`;
        }
        if (!rules.username.pattern.test(value)) {
          return '사용자명은 영문자, 숫자, 언더스코어만 사용 가능합니다.';
        }
        break;

      case 'email':
        if (!value.trim()) return '이메일을 입력해주세요.';
        if (!rules.email.pattern.test(value)) {
          return '올바른 이메일 형식이 아닙니다.';
        }
        break;

      case 'password':
        if (!value) return '비밀번호를 입력해주세요.';
        if (value.length < rules.password.minLength) {
          return `비밀번호는 최소 ${rules.password.minLength}자 이상이어야 합니다.`;
        }
        if (rules.password.requireUppercase && !/[A-Z]/.test(value)) {
          return '비밀번호에 대문자가 포함되어야 합니다.';
        }
        if (rules.password.requireLowercase && !/[a-z]/.test(value)) {
          return '비밀번호에 소문자가 포함되어야 합니다.';
        }
        if (rules.password.requireNumbers && !/\d/.test(value)) {
          return '비밀번호에 숫자가 포함되어야 합니다.';
        }
        break;

      case 'passwordConfirm':
        if (!value) return '비밀번호 확인을 입력해주세요.';
        if (value !== formData.password) {
          return '비밀번호가 일치하지 않습니다.';
        }
        break;

      case 'nickname':
        if (!value.trim()) return '닉네임을 입력해주세요.';
        if (value.length < rules.nickname.minLength) {
          return `닉네임은 최소 ${rules.nickname.minLength}자 이상이어야 합니다.`;
        }
        if (value.length > rules.nickname.maxLength) {
          return `닉네임은 최대 ${rules.nickname.maxLength}자까지 가능합니다.`;
        }
        break;

      case 'verificationCode':
        if (!value.trim()) return '인증 코드를 입력해주세요.';
        if (value.length !== 6) return '인증 코드는 6자리 숫자입니다.';
        break;
    }

    return undefined;
  };

  const handleSendVerificationCode = async () => {
    const emailError = await validateField('email', formData.email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    try {
      const result = await checkEmailMutation.mutateAsync({
        email: formData.email,
      });
      if (!result.isAvailable) {
        setErrors((prev) => ({
          ...prev,
          email: '이미 사용 중인 이메일입니다.',
        }));
        return;
      }

      await sendCodeMutation.mutateAsync({
        email: formData.email,
        type: 'REGISTER',
      });

      setIsCodeSent(true);
      setCodeTimer(300); // 5분 타이머

      // 타이머 시작
      const timer = setInterval(() => {
        setCodeTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCodeSent(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        email: '인증 코드 전송에 실패했습니다. 다시 시도해주세요.',
      }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    const newErrors: Partial<RegisterFormData> = {};

    // 모든 필드 검증
    for (const [field, value] of Object.entries(formData)) {
      const error = await validateField(field as keyof RegisterFormData, value);
      if (error) {
        newErrors[field as keyof RegisterFormData] = error;
      }
    }

    // 사용자명 중복 확인
    if (!newErrors.username) {
      try {
        const result = await checkUsernameMutation.mutateAsync({
          username: formData.username,
        });
        if (!result.isAvailable) {
          newErrors.username = '이미 사용 중인 사용자명입니다.';
        }
      } catch (error) {
        newErrors.username = '사용자명 확인 중 오류가 발생했습니다.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCodeSent) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: '먼저 인증 코드를 요청해주세요.',
      }));
      return;
    }

    if (!(await validateForm())) {
      return;
    }

    try {
      await registerMutation.mutateAsync(formData);
      onSuccess?.();
    } catch (error: any) {
      if (error.response?.data?.code === 'INVALID_VERIFICATION_CODE') {
        setErrors((prev) => ({
          ...prev,
          verificationCode: '인증 코드가 올바르지 않습니다.',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          username: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
        }));
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
          <p className="text-gray-600 mt-2">새 계정을 만드세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="사용자명"
            type="text"
            value={formData.username}
            onChange={handleInputChange('username')}
            error={errors.username}
            placeholder="영문자, 숫자, 언더스코어만 사용"
            autoComplete="username"
            required
          />

          <div className="space-y-2">
            <Input
              label="이메일"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={errors.email}
              placeholder="이메일 주소를 입력하세요"
              autoComplete="email"
              required
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSendVerificationCode}
              disabled={
                !formData.email || isCodeSent || sendCodeMutation.isPending
              }
              isLoading={sendCodeMutation.isPending}
            >
              {isCodeSent
                ? `재전송 (${formatTime(codeTimer)})`
                : sendCodeMutation.isPending
                  ? '전송 중...'
                  : '인증 코드 전송'}
            </Button>
          </div>

          <Input
            label="인증 코드"
            type="text"
            value={formData.verificationCode}
            onChange={handleInputChange('verificationCode')}
            error={errors.verificationCode}
            placeholder="6자리 인증 코드를 입력하세요"
            maxLength={6}
            disabled={!isCodeSent}
            required
          />

          <Input
            label="비밀번호"
            type="password"
            value={formData.password}
            onChange={handleInputChange('password')}
            error={errors.password}
            placeholder="8자 이상, 대소문자, 숫자 포함"
            autoComplete="new-password"
            required
          />

          <Input
            label="비밀번호 확인"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleInputChange('passwordConfirm')}
            error={errors.passwordConfirm}
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="new-password"
            required
          />

          <Input
            label="닉네임"
            type="text"
            value={formData.nickname}
            onChange={handleInputChange('nickname')}
            error={errors.nickname}
            placeholder="화면에 표시될 닉네임"
            autoComplete="nickname"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={registerMutation.isPending}
            disabled={!isCodeSent}
          >
            {registerMutation.isPending ? '회원가입 중...' : '회원가입'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
