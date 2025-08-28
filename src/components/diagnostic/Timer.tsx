'use client';

import { useEffect, useState, useCallback } from 'react';

interface TimerProps {
  startedAt: string;
  timeoutMinutes: number;
  onTimeout: () => void;
  onWarning?: (remainingMinutes: number) => void; // 경고 콜백 추가
}

export default function Timer({
  startedAt,
  timeoutMinutes,
  onTimeout,
  onWarning,
}: TimerProps) {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [hasWarned, setHasWarned] = useState<{ [key: number]: boolean }>({});

  const updateTimer = useCallback(() => {
    const now = Date.now();
    const startTime = new Date(startedAt).getTime();
    const elapsed = now - startTime;
    const totalTimeout = timeoutMinutes * 60 * 1000;
    const remaining = Math.max(0, totalTimeout - elapsed);

    setRemainingTime(remaining);

    // 경고 처리 (30분, 10분, 5분, 1분 남았을 때)
    const remainingMinutes = Math.floor(remaining / (60 * 1000));
    const warningTimes = [30, 10, 5, 1];

    warningTimes.forEach((time) => {
      if (remainingMinutes === time && !hasWarned[time] && onWarning) {
        setHasWarned((prev) => ({ ...prev, [time]: true }));
        onWarning(time);
      }
    });

    if (remaining === 0) {
      onTimeout();
    }
  }, [startedAt, timeoutMinutes, onTimeout, onWarning, hasWarned]);

  useEffect(() => {
    // 즉시 한 번 실행
    updateTimer();

    // 1초마다 업데이트
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [updateTimer]);

  // 시간을 mm:ss 형태로 포맷
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const minutes = Math.floor(remainingTime / (60 * 1000));
  const getTimerStyle = () => {
    if (minutes <= 1) return 'text-red-600 bg-red-100 animate-pulse';
    if (minutes <= 5) return 'text-orange-600 bg-orange-100';
    if (minutes <= 10) return 'text-yellow-600 bg-yellow-100';
    return 'text-blue-600 bg-blue-100';
  };

  const getTimerIcon = () => {
    if (minutes <= 1) return '🚨';
    if (minutes <= 5) return '⚠️';
    return '⏰';
  };

  return (
    <div
      className={`text-sm font-medium px-3 py-1 rounded-full ${getTimerStyle()}`}
    >
      <span className="mr-1">{getTimerIcon()}</span>
      남은 시간: {formatTime(remainingTime)}
    </div>
  );
}
