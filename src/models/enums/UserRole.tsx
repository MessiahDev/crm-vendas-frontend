export const UserRole = {
  Admin: 1,
  User: 2,
  Developer: 3
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];