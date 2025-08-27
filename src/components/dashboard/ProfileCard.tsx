import React from 'react';
import { Spinner } from '@/components/common';
import type {
  UserProfile,
  MyCharacter,
  OverallProgress,
} from '@/types/dashboard';

interface ProfileCardProps {
  profile?: UserProfile;
  character?: MyCharacter;
  overallProgress?: OverallProgress;
  isLoading?: boolean;
  error?: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  character,
  overallProgress,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center h-64">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-red-600">
          <p>프로필을 불러올 수 없습니다.</p>
          <p className="text-sm text-gray-500 mt-2">
            잠시 후 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* 프로필 헤더 */}
      <div className="flex items-center space-x-4 mb-6">
        {/* 캐릭터 이미지 */}
        <div className="relative">
          {character?.equippedCharacter?.imageUrl ? (
            <img
              src={character.equippedCharacter.imageUrl}
              alt={character.equippedCharacter.name || '캐릭터'}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">👤</span>
            </div>
          )}
          {/* 레벨 배지 */}
          {character?.gamificationState?.level && (
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {character.gamificationState.level}
            </div>
          )}
        </div>

        {/* 사용자 정보 */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">
            {profile?.nickname || profile?.username || '사용자'}
          </h2>
          <p className="text-gray-600">
            {character?.equippedCharacter?.name || '학습자'}
          </p>
          {character?.gamificationState?.xp !== undefined && (
            <p className="text-sm text-blue-600 font-medium">
              XP: {character.gamificationState.xp.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* 레벨 진행바 */}
      {character?.gamificationState && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Level {character.gamificationState.level}
            </span>
            <span className="text-sm text-gray-500">
              {character.gamificationState.xp} XP
            </span>
          </div>
          {/* XP 진행바 - 실제로는 다음 레벨까지 필요한 XP 계산이 필요함 */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  ((character.gamificationState.xp % 100) / 100) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* 전체 진행률 */}
      {overallProgress && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">학습 진행률</h3>

          {/* 개념 학습 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                개념 학습
              </span>
              <span className="text-sm text-gray-500">
                {overallProgress.totalConceptProgress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress.totalConceptProgress}%` }}
              />
            </div>
          </div>

          {/* 문제 풀이 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                문제 풀이
              </span>
              <span className="text-sm text-gray-500">
                {overallProgress.totalProblemProgress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress.totalProblemProgress}%` }}
              />
            </div>
          </div>

          {/* 어휘 학습 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                어휘 학습
              </span>
              <span className="text-sm text-gray-500">
                {overallProgress.totalVocabProgress.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress.totalVocabProgress}%` }}
              />
            </div>
          </div>

          {/* 전체 완성도 */}
          <div className="pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-gray-900">
                전체 완성도
              </span>
              <span className="text-sm font-bold text-gray-900">
                {overallProgress.completedAllUnitsRatio.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress.completedAllUnitsRatio}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
