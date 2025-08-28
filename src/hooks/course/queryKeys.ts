export const courseKeys = {
  all: ['courses'] as const,
  units: () => [...courseKeys.all, 'units'] as const,
  unitGradeNames: () => [...courseKeys.all, 'unitGradeNames'] as const,
  unit: (id: string) => [...courseKeys.all, 'unit', id] as const,
  unitChapters: (unitId: string) => [...courseKeys.all, 'unitChapters', unitId] as const,
  allUnitChapters: () => [...courseKeys.all, 'allUnitChapters'] as const,
};
