import { Providers } from '@/components/common';
import HeaderStudy from './HeaderStudy';
import FooterStudy from './FooterStudy';

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <HeaderStudy />
        <main className="flex-1">{children}</main>
        <FooterStudy />
      </div>
    </Providers>
  );
}
