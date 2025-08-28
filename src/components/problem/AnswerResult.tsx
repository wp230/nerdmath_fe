'use client';

import { AnswerResult as AnswerResultType } from '@/types/problem';

interface AnswerResultProps {
  result: AnswerResultType;
  className?: string;
}

const AnswerResult: React.FC<AnswerResultProps> = ({ 
  result, 
  className = '' 
}) => {
  const { isCorrect, explanation, xpGained, gamificationUpdate } = result;

  return (
    <div className={className}>
      {/* 정답/오답 메시지 */}
      <div
        className={`p-4 rounded-lg mb-4 ${
          isCorrect
            ? 'bg-green-100 border border-green-200'
            : 'bg-red-100 border border-red-200'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className={`font-semibold ${
            isCorrect ? 'text-green-800' : 'text-red-800'
          }`}>
            {isCorrect ? '정답입니다! 🎉' : '틀렸습니다 😔'}
          </h3>
          
          {/* XP 획득 표시 */}
          {xpGained > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-yellow-600">
                +{xpGained} XP
              </span>
              {gamificationUpdate.leveledUp && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  레벨업!
                </span>
              )}
            </div>
          )}
        </div>

        {/* 해설 */}
        <div className={`text-sm ${
          isCorrect ? 'text-green-700' : 'text-red-700'
        }`}>
          <p className="font-medium mb-1">해설:</p>
          <p>{explanation.explanation}</p>
        </div>
      </div>

      {/* 게이미피케이션 정보 */}
      {gamificationUpdate && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                레벨 {gamificationUpdate.level}
              </span>
              <span className="text-gray-600">
                XP: {gamificationUpdate.xp} / {gamificationUpdate.nextLevelXp}
              </span>
            </div>
            
            {gamificationUpdate.leveledUp && (
              <span className="text-yellow-600 font-medium">
                🎉 레벨업!
              </span>
            )}
          </div>
          
          {/* XP 진행률 바 */}
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${(gamificationUpdate.xp / gamificationUpdate.nextLevelXp) * 100}%`
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerResult;
