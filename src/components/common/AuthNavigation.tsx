'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth.store';
import { useLogoutMutation } from '@/hooks/auth';
import Button from './Button';

export const AuthNavigation: React.FC = () => {
  const { isLoggedIn, user, isLoading } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex space-x-4">
        <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (isLoggedIn && user) {
    return (
      <div className="flex items-center space-x-4">
        {/* 사용자 정보 */}
        <Link
          href="/profile/settings"
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {user.nickname || user.name}님
        </Link>

        {/* 대시보드 링크 */}
        <Link
          href="/dashboard"
          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          대시보드
        </Link>

        {/* 로그아웃 버튼 */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          isLoading={logoutMutation.isPending}
          className="text-gray-600 hover:text-gray-900 border-gray-300"
        >
          {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
        </Button>
      </div>
    );
  }

  // 로그인하지 않은 상태
  return (
    <div className="flex space-x-4">
      <Link
        href="/login"
        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="text-white bg-gray-900 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        회원가입
      </Link>
    </div>
  );
};
