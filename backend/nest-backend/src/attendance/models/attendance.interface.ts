import { User } from '../../auth/models/user.class';

export interface Attendance {
  id?: number;
  //added two entities first and last name
  firstName?: string;
  lastName?: string;
  temperature?: string;
  location?: string;
  covid_symptoms_status?: string;
  time?: string;
  date?: string;
  phoneID?: string;
  author?: User;

}