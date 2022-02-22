import { User } from '../../auth/models/user.class';

export interface Attendance {
  id?: number;
  location?: string;
  temperature?: number;
  covid_symptoms_status?: boolean;
  creationTimestamp?: string;
  createdAt?: Date;
  author?: User;
}