import { User } from '../../auth/models/user.class';

export interface Attendance {
  id?: number;
  location?: string;
  temperature?: number;
  covid_symptoms_status?: boolean;
  time?: string;
  date?: string;
  author?: User;
}