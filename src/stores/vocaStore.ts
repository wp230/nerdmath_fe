import { create } from 'zustand';
import { VocabPack, Vocabulary, VocabViewMode } from '@/types/voca';

interface VocaState {
  // 현재 선택된 어휘팩
  selectedPack: VocabPack | null;

  // 어휘팩 목록
  vocabPacks: VocabPack[];

  // 현재 표시 중인 어휘 목록
  currentVocabularies: Vocabulary[];

  // 뷰 모드 (list | detail)
  viewMode: VocabViewMode;

  // 로딩 상태
  isLoading: boolean;

  // 액션들
  selectPack: (pack: VocabPack) => void;
  setViewMode: (mode: VocabViewMode) => void;
  setVocabularies: (vocabs: Vocabulary[]) => void;
  setVocabPacks: (packs: VocabPack[]) => void;
  setLoading: (loading: boolean) => void;
  resetSelection: () => void;
}

export const useVocaStore = create<VocaState>((set, get) => ({
  // 초기 상태
  selectedPack: null,
  vocabPacks: [],
  currentVocabularies: [],
  viewMode: 'list',
  isLoading: false,

  // 액션들
  selectPack: (pack: VocabPack) =>
    set({
      selectedPack: pack,
      viewMode: 'detail',
    }),

  setViewMode: (mode: VocabViewMode) => set({ viewMode: mode }),

  setVocabularies: (vocabs: Vocabulary[]) =>
    set({
      currentVocabularies: vocabs,
    }),

  setVocabPacks: (packs: VocabPack[]) => {
    const currentPacks = get().vocabPacks;
    // 중복 업데이트 방지: 길이와 참조가 다른 경우에만 업데이트
    if (currentPacks.length !== packs.length || currentPacks !== packs) {
      set({ vocabPacks: packs });
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  resetSelection: () =>
    set({
      selectedPack: null,
      viewMode: 'list',
      currentVocabularies: [],
    }),
}));
