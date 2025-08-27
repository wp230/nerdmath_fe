export default function ProblemLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { majorId: string; minorId: string };
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>문제 풀이</span>
            <span>/</span>
            <span className="capitalize">{params.majorId}</span>
            <span>/</span>
            <span className="capitalize">{params.minorId}</span>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
