import VocabularyPackList from '@/components/vocabulary/VocabularyPackList';
import React from 'react';

const VocabularyHubPage = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">어휘 학습</h1>
        <p className="text-lg text-gray-600">
          단원별 어휘와 주제별 어휘를 학습하고 테스트해 보세요.
        </p>
      </header>
      <main>
        <VocabularyPackList />
      </main>
    </div>
  );
};

export default VocabularyHubPage;
