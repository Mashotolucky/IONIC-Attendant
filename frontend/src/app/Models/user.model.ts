import { Attendance } from "./attendance";

export type Role = 'admin'| 'user';

export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  employeeNumber?: string;
  role?: Role;
  
}