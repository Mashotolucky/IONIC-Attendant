import { User } from './user.model';
// export interface Attendance {
//   id?: number;
//   location?: string;
//   temperature?: number;
//   covid_symptoms_status?: boolean;
//   time?: string;
//   date?: string;
//   author: User;
// }
export class Attendance {
  id?: number;
  temperature: string;
  covid_symptoms_status: string;
  date: string;
  time: string;
  location: string;
  author?: User;
}