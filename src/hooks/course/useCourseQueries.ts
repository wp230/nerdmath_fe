import { useQuery } from '@tanstack/react-query';
import { getUnits, getUnitGradeNames, getUnitById, getUnitChapters, getAllUnitChapters } from '@/services/course';
import { courseKeys } from './queryKeys';

export const useGetUnitsQuery = () => {
  return useQuery({
    queryKey: courseKeys.units(),
    queryFn: getUnits,
  });
};

export const useGetUnitGradeNamesQuery = () => {
  return useQuery({
    queryKey: courseKeys.unitGradeNames(),
    queryFn: getUnitGradeNames,
  });
};

export const useGetUnitByIdQuery = (unitId: string) => {
  return useQuery({
    queryKey: courseKeys.unit(unitId),
    queryFn: () => getUnitById(unitId),
    enabled: !!unitId,
  });
};

export const useGetUnitChaptersQuery = (unitId: string) => {
  return useQuery({
    queryKey: courseKeys.unitChapters(unitId),
    queryFn: () => getUnitChapters(unitId),
    enabled: !!unitId,
  });
};

export const useGetAllUnitChaptersQuery = () => {
  return useQuery({
    queryKey: courseKeys.allUnitChapters(),
    queryFn: getAllUnitChapters,
  });
};
