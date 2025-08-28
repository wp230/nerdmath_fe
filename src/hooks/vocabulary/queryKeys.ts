export const vocabularyQueryKeys = {
  all: ['vocabulary'] as const,
  lists: () => [...vocabularyQueryKeys.all, 'lists'] as const,
  list: (type: string, id: string) =>
    [...vocabularyQueryKeys.lists(), type, id] as const,
  tests: () => [...vocabularyQueryKeys.all, 'tests'] as const,
  test: (unitId: string) => [...vocabularyQueryKeys.tests(), unitId] as const,
};
