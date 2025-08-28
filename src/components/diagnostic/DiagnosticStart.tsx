'use client';

import { useRouter } from 'next/navigation';
import { useCheckEligibilityQuery } from '@/hooks/diagnostic/useDiagnosticQueries';
import { useStartTestMutation } from '@/hooks/diagnostic/useDiagnosticMutations';
import { Spinner, Button, Modal, FullScreenError } from '@/components/common';
import { useState, useEffect } from 'react';
import { useDiagnosticStore } from '@/stores/diagnostic.store';
import { useCurrentUser } from '@/stores/auth.store';
import { StartTestResponse, GradeRange } from '@/types/diagnostic';
import GradeSelector from './GradeSelector';

export default function DiagnosticStart() {
  const router = useRouter();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGradeSelector, setShowGradeSelector] = useState(false);
  const [selectedGradeRange, setSelectedGradeRange] =
    useState<GradeRange | null>(null);

  const { setFromStartResponse, setGradeRange, hydrateFromSession, testId } =
    useDiagnosticStore();

  // 현재 로그인한 사용자 정보 가져오기
  const currentUser = useCurrentUser();

  // 페이지 로드 시 세션 복구 시도
  useEffect(() => {
    const restored = hydrateFromSession();
    if (restored && testId) {
      // 진행 중인 테스트가 있으면 테스트 페이지로 이동
      router.push('/diagnostic/test');
    }
  }, [hydrateFromSession, testId, router]);

  const {
    data: eligibility,
    isLoading: isEligibilityLoading,
    isError: isEligibilityError,
    error: eligibilityError,
    refetch: refetchEligibility,
  } = useCheckEligibilityQuery(currentUser?.userId || 0);

  const { mutate: startTest, isPending: isStartingTest } = useStartTestMutation(
    {
      userId: currentUser?.userId || 0,
    }
  );

  const handleGradeSelection = (gradeRange: GradeRange) => {
    setSelectedGradeRange(gradeRange);
    setGradeRange(gradeRange);
    setShowGradeSelector(false);
  };

  const handleStartTest = () => {
    if (!selectedGradeRange) {
      setShowGradeSelector(true);
      return;
    }

    // 개발 중 디버깅 로그
    if (process.env.NODE_ENV === 'development') {
      console.log('진단 테스트 시작:', {
        userId: currentUser?.userId,
        gradeRange: selectedGradeRange,
        userInfo: {
          name: currentUser?.name,
          email: currentUser?.email,
        },
      });
    }

    startTest(
      { gradeRange: selectedGradeRange },
      {
        onSuccess: (data: StartTestResponse) => {
          // 개발 중 디버깅 로그
          if (process.env.NODE_ENV === 'development') {
            console.log('진단 테스트 시작 성공:', data);
          }

          // Zustand 스토어에 테스트 정보 저장
          setFromStartResponse({
            testId: data.testId,
            firstProblemId: data.firstProblemId,
            totalProblems: data.totalProblems,
            startedAt: data.startedAt,
            gradeRange: data.gradeRange,
            shuffleSeed: data.shuffleSeed,
          });
          router.push('/diagnostic/test');
        },
        onError: (error: Error) => {
          console.error('진단 테스트 시작 실패:', error);
          setErrorMessage(
            error.message || '테스트를 시작하는 중 오류가 발생했습니다.'
          );
          setErrorModalOpen(true);
        },
      }
    );
  };

  const handleContinueTest = () => {
    if (eligibility?.existingTestId) {
      router.push(`/diagnostic/test?testId=${eligibility.existingTestId}`);
    }
  };

  const handleViewResults = () => {
    router.push('/dashboard');
  };

  if (isEligibilityLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isEligibilityError) {
    return (
      <FullScreenError
        message={
          eligibilityError?.message ||
          '자격 여부를 확인하는 중 문제가 발생했습니다.'
        }
        onRetry={refetchEligibility}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">진단 테스트</h1>
          <p className="text-xl text-gray-600">
            현재 수학 실력을 정확히 진단하고 맞춤형 학습 경로를 제공받으세요
          </p>
        </div>

        {/* 사용자 정보 카드 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                안녕하세요, {currentUser?.nickname || currentUser?.name}님! 👋
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>사용자 ID: {currentUser?.userId}</span>
                <span>•</span>
                <span>{currentUser?.email}</span>
                {/* 개발 중 디버깅 정보 */}
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600">진단 테스트</span>
                  </>
                )}
              </div>
            </div>
            {/* 프로필 이미지는 향후 추가 예정 */}
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          {eligibility?.eligible ? (
            <div className="text-center">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  진단 테스트 시작
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      총 20문제
                    </h3>
                    <p className="text-sm text-gray-600">
                      선택한 학년 범위의 핵심 문제들
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">⏰</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      60분 제한
                    </h3>
                    <p className="text-sm text-gray-600">
                      충분히 생각할 수 있는 시간
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      맞춤 분석
                    </h3>
                    <p className="text-sm text-gray-600">
                      개인별 학습 계획 제공
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedGradeRange ? (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-800 font-medium">
                          선택된 범위: 중학교 1학년 ~ {selectedGradeRange.max}
                          학년
                        </p>
                        <p className="text-blue-600 text-sm mt-1">
                          이 범위의 문제들로 진단 테스트를 진행합니다
                        </p>
                      </div>
                      <Button
                        onClick={() => setShowGradeSelector(true)}
                        variant="outline"
                        size="sm"
                        className="ml-4 border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        변경하기
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowGradeSelector(true)}
                    size="lg"
                    className="mb-4"
                  >
                    학년 선택하기
                  </Button>
                )}

                <Button
                  onClick={handleStartTest}
                  disabled={isStartingTest || !selectedGradeRange}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isStartingTest ? '시작하는 중...' : '진단 테스트 시작하기'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {eligibility?.existingTestId ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4">
                    진행 중인 진단 테스트가 있습니다
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {eligibility?.reason ||
                      '이전에 시작한 테스트를 이어서 진행하실 수 있습니다.'}
                  </p>
                  <div className="space-y-4">
                    <Button
                      onClick={handleContinueTest}
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 mr-4"
                    >
                      이어서 진행하기
                    </Button>
                    <Button
                      onClick={handleViewResults}
                      size="lg"
                      variant="outline"
                    >
                      대시보드로 이동
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold mb-4">
                    진단 테스트를 이미 완료했습니다
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {eligibility?.reason ||
                      '분석 결과를 대시보드에서 확인하실 수 있습니다.'}
                  </p>
                  <Button onClick={handleViewResults} size="lg">
                    대시보드로 이동
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 학년 선택 모달 */}
      <Modal
        isOpen={showGradeSelector}
        onClose={() => setShowGradeSelector(false)}
        title="학년 선택"
        size="lg"
        backdropOpacity="light"
      >
        <GradeSelector
          onSelect={handleGradeSelection}
          disabled={isStartingTest}
        />
      </Modal>

      {/* 에러 모달 */}
      <Modal
        isOpen={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="오류"
      >
        <div className="text-center">
          <p className="mb-4">{errorMessage}</p>
          <Button onClick={() => setErrorModalOpen(false)}>확인</Button>
        </div>
      </Modal>
    </div>
  );
}
