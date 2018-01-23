export interface Message{
  _id?: string;
  is_to_patient: number; // 1: the message is from admin to patient, or 0: the other way around
  firstname?: string; // patient first name
  lastname?: string;  // patient last name
  email: string;  // Patient Email Address
  epoch: number; // epoch
  date?: string;
  content: string;
}
