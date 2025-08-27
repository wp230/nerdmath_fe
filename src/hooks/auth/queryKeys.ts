export const authQueryKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authQueryKeys.all, 'currentUser'] as const,
  checkUsername: (username: string) =>
    [...authQueryKeys.all, 'checkUsername', username] as const,
  checkEmail: (email: string) =>
    [...authQueryKeys.all, 'checkEmail', email] as const,
} as const;
