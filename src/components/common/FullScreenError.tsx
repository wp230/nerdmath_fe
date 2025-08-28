import React from 'react';

interface FullScreenErrorProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const FullScreenError: React.FC<FullScreenErrorProps> = ({
  title = '오류가 발생했습니다',
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-800 mb-4">{title}</h2>
        <p className="text-red-700 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
};
