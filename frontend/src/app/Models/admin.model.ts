export type Role = 'admin'| 'user';

export interface Admin {
  id?: number;
  email?: string;
  role?: Role;
}