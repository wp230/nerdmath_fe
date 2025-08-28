import '../globals.css';
import StudyLayout from '@/components//layout/study/StudyLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* favicon 비활성화 - 404 에러 방지 */}
        <link rel="icon" href="data:," />
      </head>
      <body>
        <StudyLayout>{children}</StudyLayout>
      </body>
    </html>
  );
}
