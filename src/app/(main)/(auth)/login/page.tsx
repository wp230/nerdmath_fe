'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  // 로그인 성공 후 콜백
  const handleLoginSuccess = () => {
    // 이전 페이지로 돌아가거나 기본 대시보드로 이동
    const returnUrl = new URLSearchParams(window.location.search).get(
      'returnUrl'
    );
    router.push(returnUrl || '/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NerdMath</h1>
          <p className="text-gray-600">수학 실력을 키우는 가장 스마트한 방법</p>
        </div>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}
