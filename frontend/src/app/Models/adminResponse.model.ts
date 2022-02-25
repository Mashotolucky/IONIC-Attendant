import { Admin } from './admin.model';

export interface AdminResponse {
  user: Admin;
  exp: number;
  iat: number;
}