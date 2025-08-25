import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLearningStore } from '@/stores/learningStore';
import { useVocabTest } from '@/hooks/learning/useVocabTest';
import { usePracticeProblem } from '@/hooks/learning/usePracticeProblem';
import { useAnswerSubmissionState } from '@/hooks/learning/useAnswerSubmission';
import { ProblemDisplay } from '../ui/ProblemDisplay';
import { VocabTestProgress } from '../ui/VocabTestProgress';
import { ProblemProgress } from '../ui/ProblemProgress';
import { ExplanationModal } from '../ui/ExplanationModal';
import { ResultSummaryModal } from '../ui/ResultSummaryModal';
import { WarningModal } from '../ui/WarningModal';
import { XPEffectModal } from '../ui/XPEffectModal';
import {
  VocabTestProblem,
  PracticeProblem,
  SubmitAnswerParams,
} from '@/types/learning';

interface PracticeModeProps {
  unitId: string;
  onComplete: () => void;
  onExit: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  unitId,
  onComplete,
  onExit,
}) => {
  const router = useRouter();
  const {
    problemMode,
    startProblemMode,
    updateProblemProgress,
    setCurrentProblem,
    nextProblem,
    resetProblemMode,
  } = useLearningStore();

  // React Query 훅들
  const { data: vocabTest, isLoading: vocabLoading } = useVocabTest(unitId, 10);
  const { data: practiceProblem, isLoading: practiceLoading } =
    usePracticeProblem(unitId);
  const {
    submitAnswer,
    isSubmitting,
    data: answerData,
    reset: resetAnswer,
  } = useAnswerSubmissionState();

  // 로컬 상태
  const [currentMode, setCurrentMode] = useState<'vocab_test' | 'practice'>(
    'vocab_test'
  );
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [vocabAnswers, setVocabAnswers] = useState<Map<string, string>>(
    new Map()
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationData, setExplanationData] = useState<{
    explanation: string;
    isCorrect: boolean;
    xpGained: number;
    problemId: string;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState(''); // 답안 입력 상태 추가

  // 모달 상태 추가
  const [showResultModal, setShowResultModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showXPEffect, setShowXPEffect] = useState(false);
  const [xpEffectData, setXpEffectData] = useState<{
    xpGained: number;
    isCorrect: boolean;
  } | null>(null);

  // 진행률 계산
  const vocabProgress =
    currentMode === 'vocab_test'
      ? Math.round(
          (currentVocabIndex / (vocabTest?.testSet?.problems?.length || 1)) *
            100
        )
      : 100;

  const practiceProgress = problemMode.practiceProgress;

  // 결과 계산 함수
  const calculateResults = () => {
    // 어휘 테스트 결과
    const vocabResults = {
      accuracy: 0,
      wrongWords: [] as string[],
      totalXP: 0,
    };

    if (vocabTest?.testSet?.problems) {
      let correctCount = 0;
      const wrongWords: string[] = [];

      vocabTest.testSet.problems.forEach((problem, index) => {
        const userAnswer = vocabAnswers.get(problem.problemId);
        if (userAnswer) {
          const isCorrect =
            userAnswer.toLowerCase().trim() ===
            problem.correctAnswer.toLowerCase().trim();
          if (isCorrect) {
            correctCount++;
            vocabResults.totalXP += 5;
          } else {
            wrongWords.push(problem.question);
            vocabResults.totalXP += 3;
          }
        }
      });

      vocabResults.accuracy = Math.round(
        (correctCount / vocabTest.testSet.problems.length) * 100
      );
      vocabResults.wrongWords = wrongWords;
    }

    // 실전 문제 결과
    const practiceResults = {
      accuracy: practiceProgress, // 진행률을 정답률로 간주
      totalXP: practiceProgress * 0.15, // 평균 XP 계산
    };

    return { vocabResults, practiceResults };
  };

  // 모달 핸들러
  const handleExitWithWarning = () => {
    const totalProgress = (vocabProgress + practiceProgress) / 2;
    if (totalProgress < 100) {
      setShowWarningModal(true);
    } else {
      onExit();
    }
  };

  const handleComplete = () => {
    const results = calculateResults();
    // 결과 모달 표시 전에 XP 이펙트 표시
    setShowResultModal(true);
  };

  const handleXPEffectComplete = () => {
    setShowXPEffect(false);
    setXpEffectData(null);
  };

  // 초기화
  useEffect(() => {
    if (practiceProblem?.problemIds) {
      startProblemMode(unitId, practiceProblem.problemIds);
    }
  }, [practiceProblem, unitId, startProblemMode]);

  // 어휘 테스트 완료 처리
  const handleVocabComplete = () => {
    setCurrentMode('practice');
    setCurrentVocabIndex(0);
    updateProblemProgress('vocab', 100);
  };

  // 답안 제출 처리
  const handleAnswerSubmit = async (answer: string) => {
    if (currentMode === 'vocab_test') {
      await handleVocabAnswerSubmit(answer);
    } else {
      await handlePracticeAnswerSubmit(answer);
    }
  };

  // 어휘 테스트 답안 제출
  const handleVocabAnswerSubmit = async (answer: string) => {
    if (!vocabTest?.testSet?.problems) return;

    const currentProblem = vocabTest.testSet.problems[currentVocabIndex];
    const isCorrect =
      answer.toLowerCase().trim() ===
      currentProblem.correctAnswer.toLowerCase().trim();

    setVocabAnswers((prev) =>
      new Map(prev).set(currentProblem.problemId, answer)
    );

    const xpGained = isCorrect ? 5 : 3;

    // XP 이펙트 표시
    setXpEffectData({ xpGained, isCorrect });
    setShowXPEffect(true);

    setExplanationData({
      explanation: currentProblem.explanation,
      isCorrect,
      xpGained,
      problemId: currentProblem.problemId,
    });
    setShowExplanation(true);

    if (currentVocabIndex < vocabTest.testSet.problems.length - 1) {
      setCurrentVocabIndex((prev) => prev + 1);
    } else {
      handleVocabComplete();
    }
  };

  // 실전 문제 답안 제출
  const handlePracticeAnswerSubmit = async (answer: string) => {
    if (!practiceProblem?.problem || !problemMode.sessionId) return;

    const params: SubmitAnswerParams = {
      mode: 'practice',
      sessionId: problemMode.sessionId,
      unitId,
      problemId: practiceProblem.problem.id,
      userAnswer: { answer },
      durationSeconds: Math.floor((Date.now() - problemMode.startTime) / 1000),
    };

    try {
      const result = await submitAnswer(params);
      if (result.success && result.data) {
        setExplanationData({
          explanation: result.data.explanation.explanation,
          isCorrect: result.data.isCorrect,
          xpGained: result.data.xpGained,
          problemId: practiceProblem.problem.id,
        });
        setShowExplanation(true);

        if (result.data.updatedProgress.problemProgress !== undefined) {
          updateProblemProgress(
            'practice',
            result.data.updatedProgress.problemProgress
          );
        }
      }
    } catch (error) {
      console.error('답안 제출 실패:', error);
    }
  };

  // 다음 문제로 이동
  const handleNextProblem = () => {
    setShowExplanation(false);
    setExplanationData(null);

    if (currentMode === 'vocab_test') {
      return;
    } else {
      nextProblem();

      if (
        practiceProblem &&
        problemMode.currentProblemIndex < practiceProblem.problemIds.length - 1
      ) {
        const nextIndex = problemMode.currentProblemIndex + 1;
        setCurrentProblem(nextIndex, practiceProblem.problem);
      } else {
        onComplete();
      }
    }
  };

  // 해설 모달 닫기
  const handleCloseExplanation = () => {
    setShowExplanation(false);
    setExplanationData(null);
  };

  // 현재 문제 정보
  const getCurrentProblem = () => {
    if (currentMode === 'vocab_test') {
      return vocabTest?.testSet?.problems?.[currentVocabIndex];
    } else {
      return practiceProblem?.problem;
    }
  };

  const currentProblem = getCurrentProblem();

  // 로딩 상태
  if (vocabLoading || practiceLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">문제를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header: 진행률 통합 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-9xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                문제 풀이 모드
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {currentMode === 'vocab_test' ? '어휘 테스트' : '실전 문제'}{' '}
                진행 중
              </p>
            </div>
            <button
              onClick={handleExitWithWarning}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              나가기
            </button>
          </div>

          {/* 진행률 바 */}
          <div className="space-y-3">
            {/* 어휘 테스트 진행률 */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>어휘 테스트</span>
                <span>{vocabProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${vocabProgress}%` }}
                ></div>
              </div>
            </div>

            {/* 실전 문제 진행률 */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>실전 문제</span>
                <span>{practiceProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${practiceProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main: 60:40 비율 */}
      <main className="flex-1 max-w-9xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
          {/* 섹션1: 문제 표시 (60%) */}
          <div className="lg:col-span-3">
            {currentProblem ? (
              <ProblemDisplay problem={currentProblem} mode={currentMode} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex items-center justify-center">
                <p className="text-gray-500">문제를 불러오는 중...</p>
              </div>
            )}
          </div>

          {/* 섹션2: 해설/북마크 (40%) */}
          <div className="lg:col-span-2">
            {showExplanation && explanationData ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4">해설</h3>
                <div className="mb-4">
                  <div
                    className={`text-center mb-4 ${explanationData.isCorrect ? 'text-green-600' : 'text-red-600'}`}
                  >
                    <div className="text-4xl mb-2">
                      {explanationData.isCorrect ? '✅' : '❌'}
                    </div>
                    <p className="text-lg font-medium">
                      {explanationData.isCorrect ? '정답입니다!' : '틀렸습니다'}
                    </p>
                    {explanationData.isCorrect && (
                      <p className="text-blue-600">
                        +{explanationData.xpGained} XP 획득! 🎉
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">
                    상세 해설
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {explanationData.explanation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleNextProblem}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    {currentMode === 'vocab_test' ? '다음 문제' : '다음 문제'}
                  </button>
                  <button
                    onClick={handleCloseExplanation}
                    className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📝</div>
                  <p>답안을 제출하면</p>
                  <p>해설이 여기에 표시됩니다</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer: 문제 리스트 + 답안 입력 + 진행률 */}
      <footer className="bg-white shadow-lg border-t">
        <div className="max-w-9xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* 좌측: 문제 리스트 (30%) */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                문제 목록
              </h4>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {vocabTest?.testSet?.problems?.map((problem, index) => (
                  <button
                    key={problem.problemId}
                    onClick={() => {
                      if (currentMode === 'vocab_test') {
                        setCurrentVocabIndex(index);
                      }
                    }}
                    className={`w-full p-2 text-xs rounded-lg transition-colors ${
                      currentMode === 'vocab_test' &&
                      index === currentVocabIndex
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {index + 1}. {problem.question.substring(0, 15)}...
                  </button>
                ))}
              </div>
            </div>

            {/* 중앙: 답안 입력 (50%) */}
            <div className="lg:col-span-3">
              {currentProblem ? (
                // 문제 타입에 따른 답안 입력
                currentMode === 'vocab_test' ? (
                  // 어휘 테스트: 텍스트 입력
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="답안을 입력하세요..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isSubmitting}
                      onKeyPress={(e) => {
                        if (
                          e.key === 'Enter' &&
                          userAnswer.trim() &&
                          !isSubmitting
                        ) {
                          handleAnswerSubmit(userAnswer.trim());
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (userAnswer.trim()) {
                          handleAnswerSubmit(userAnswer.trim());
                          setUserAnswer('');
                        }
                      }}
                      disabled={!userAnswer.trim() || isSubmitting}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? '채점 중...' : '채점'}
                    </button>
                  </div>
                ) : // 실전 문제: 객관식 또는 주관식
                (currentProblem as PracticeProblem).questionType ===
                  '객관식' ? (
                  // 객관식: 선택지 버튼
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700">
                      답을 선택하세요:
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      {(currentProblem as PracticeProblem).choices?.map(
                        (choice, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setUserAnswer(choice);
                              handleAnswerSubmit(choice);
                            }}
                            disabled={isSubmitting}
                            className={`p-3 border-2 rounded-lg font-medium transition-colors ${
                              userAnswer === choice
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400 text-gray-700'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {['①', '②', '③', '④'][index]} {choice}
                          </button>
                        )
                      ) ||
                        ['①', '②', '③', '④'].map((choice, index) => (
                          <button
                            key={choice}
                            onClick={() => {
                              setUserAnswer(choice);
                              handleAnswerSubmit(choice);
                            }}
                            disabled={isSubmitting}
                            className={`p-3 border-2 rounded-lg font-medium transition-colors ${
                              userAnswer === choice
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400 text-gray-700'
                            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {choice}
                          </button>
                        ))}
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => {
                          if (userAnswer) {
                            handleAnswerSubmit(userAnswer);
                            setUserAnswer('');
                          }
                        }}
                        disabled={!userAnswer || isSubmitting}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? '채점 중...' : '채점'}
                      </button>
                    </div>
                  </div>
                ) : (
                  // 주관식: 텍스트 입력
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="답안을 입력하세요..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isSubmitting}
                      onKeyPress={(e) => {
                        if (
                          e.key === 'Enter' &&
                          userAnswer.trim() &&
                          !isSubmitting
                        ) {
                          handleAnswerSubmit(userAnswer.trim());
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (userAnswer.trim()) {
                          handleAnswerSubmit(userAnswer.trim());
                          setUserAnswer('');
                        }
                      }}
                      disabled={!userAnswer.trim() || isSubmitting}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? '채점 중...' : '채점'}
                    </button>
                  </div>
                )
              ) : (
                // 문제 로딩 중
                <div className="text-center text-gray-500">
                  <p>문제를 불러오는 중...</p>
                </div>
              )}
            </div>

            {/* 우측: 진행률 요약 (20%) */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {vocabProgress + practiceProgress}%
                </div>
                <p className="text-xs text-gray-600">전체 진행률</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 해설 모달 (기존 유지) */}
      {showExplanation && explanationData && (
        <ExplanationModal
          isOpen={showExplanation}
          explanation={explanationData.explanation}
          isCorrect={explanationData.isCorrect}
          xpGained={explanationData.xpGained}
          problemId={explanationData.problemId}
          onNext={handleNextProblem}
          onClose={handleCloseExplanation}
        />
      )}

      {/* XP 이펙트 모달 */}
      {showXPEffect && xpEffectData && (
        <XPEffectModal
          isVisible={showXPEffect}
          xpGained={xpEffectData.xpGained}
          isCorrect={xpEffectData.isCorrect}
          onComplete={handleXPEffectComplete}
        />
      )}

      {/* 결과 요약 모달 */}
      {showResultModal && (
        <ResultSummaryModal
          isOpen={showResultModal}
          vocabResults={calculateResults().vocabResults}
          practiceResults={calculateResults().practiceResults}
          onGoToDashboard={() => (window.location.href = '/dashboard')}
          onNextUnit={() => {
            setShowResultModal(false);
            // 다음 단원으로 이동하는 로직 (향후 구현)
            onComplete();
          }}
          onClose={() => setShowResultModal(false)}
        />
      )}

      {/* 경고 모달 */}
      <WarningModal
        isOpen={showWarningModal}
        currentProgress={(vocabProgress + practiceProgress) / 2}
        onConfirm={() => {
          setShowWarningModal(false);
          onExit();
        }}
        onCancel={() => setShowWarningModal(false)}
      />
    </div>
  );
};
