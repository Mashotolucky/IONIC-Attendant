import { User } from '../../auth/models/user.class';

export interface Attendance {
  id?: number;
  location?: string;
  temperature?: string;
  covid_symptoms_status?: string;
  time?: string;
  date?: string;
  author?: User;
}