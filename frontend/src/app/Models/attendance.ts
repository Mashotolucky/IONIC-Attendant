import { User } from './user.model';
export interface Attendance {
  id?: number;
  location?: string;
  temperature?: number;
  covid_symptoms_status?: boolean;
  creationTimestamp?: string;
  createdAt?: string;
  author: User;
}