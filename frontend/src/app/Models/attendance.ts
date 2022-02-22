import { User } from './user.model';
export interface Attendance {
  id?: number;
  location?: string;
  temperature?: number;
  covid_symptoms_status?: boolean;
  time?: string;
  date?: string;
  author: User;
}