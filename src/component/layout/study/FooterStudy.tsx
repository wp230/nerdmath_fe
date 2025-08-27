'use client';

export default function FooterStudy() {
  return (
    <footer className="flex h-16 items-center justify-between border-t bg-gray-50 px-4">
      <button className="text-sm">📖 목차</button>
      <div className="flex flex-col items-center">
        <span className="text-xs">대단원 {'>'} 소단원</span>
        <div className="h-2 w-32 rounded bg-gray-200">
          <div className="h-2 rounded bg-blue-500" style={{ width: '60%' }} />
        </div>
      </div>
      <button className="text-sm">다음 ▶</button>
    </footer>
  );
}
