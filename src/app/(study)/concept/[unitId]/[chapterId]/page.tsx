'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import ConceptViewer from '@/components/concept/ConceptViewer';
import ConceptCompletion from '@/components/concept/ConceptCompletion';

import { CompleteConceptLearningResponse } from '@/types/concept';

export default function ConceptPage() {
  const params = useParams();
  const unitId = params.unitId as string;
  const chapterId = params.chapterId as string; // Currently unused, but available

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {/* We can potentially fetch and show Chapter Title here */}
          단원 {unitId} - 챕터 {chapterId}
        </h1>
        <p className="text-gray-500">개념 학습</p>
      </div>
    </div>
  );
}
