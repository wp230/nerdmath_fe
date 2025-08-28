import type { DashboardQueryParams } from '@/types/dashboard';

// Dashboard Query Keys Factory
export const dashboardQueryKeys = {
  all: ['dashboard'] as const,

  // Profile related
  profile: () => [...dashboardQueryKeys.all, 'profile'] as const,

  // Character related
  character: (params?: DashboardQueryParams) =>
    [...dashboardQueryKeys.all, 'character', params] as const,

  // Progress related
  progress: () => [...dashboardQueryKeys.all, 'progress'] as const,
  overallProgress: (params?: DashboardQueryParams) =>
    [...dashboardQueryKeys.progress(), 'overall', params] as const,
  conceptProgress: (params?: DashboardQueryParams) =>
    [...dashboardQueryKeys.progress(), 'concepts', params] as const,
  problemProgress: (params?: DashboardQueryParams) =>
    [...dashboardQueryKeys.progress(), 'problems', params] as const,
  vocabProgress: (params?: DashboardQueryParams) =>
    [...dashboardQueryKeys.progress(), 'vocab', params] as const,

  // Activity stats
  activityStats: (params?: DashboardQueryParams) =>
    [...dashboardQueryKeys.all, 'activityStats', params] as const,

  // Bookmarks
  bookmarks: (params?: DashboardQueryParams) =>
    [...dashboardQueryKeys.all, 'bookmarks', params] as const,

  // Diagnostic analysis
  diagnosticAnalysis: (userId: number) =>
    [...dashboardQueryKeys.all, 'diagnosticAnalysis', userId] as const,

  // Combined dashboard data
  dashboardData: (params?: DashboardQueryParams) =>
    [...dashboardQueryKeys.all, 'dashboardData', params] as const,
} as const;
