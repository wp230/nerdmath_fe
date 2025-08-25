import { create } from 'zustand';
import { UnitData, ChapterData, UnitProgress } from '../types/math';

interface MathState {
  currentUnit: UnitData | null;
  currentChapter: ChapterData | null;
  unitProgress: Record<string, UnitProgress>;
  
  // Actions
  setCurrentUnit: (unit: UnitData) => void;
  setCurrentChapter: (chapter: ChapterData) => void;
  updateUnitProgress: (unitId: string, progress: UnitProgress) => void;
  resetMathState: () => void;
}

export const useMathStore = create<MathState>((set) => ({
  currentUnit: null,
  currentChapter: null,
  unitProgress: {},
  
  setCurrentUnit: (unit: UnitData) => set({ currentUnit: unit }),
  setCurrentChapter: (chapter: ChapterData) => set({ currentChapter: chapter }),
  updateUnitProgress: (unitId: string, progress: UnitProgress) => 
    set((state) => ({
      unitProgress: { ...state.unitProgress, [unitId]: progress }
    })),
  resetMathState: () => set({ 
    currentUnit: null, 
    currentChapter: null, 
    unitProgress: {} 
  }),
}));
