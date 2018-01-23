import { Question } from './question.model';

export interface PatientEvent{
  _id?: string;
  studyflow_id: string;
  subject_id?: string;
  event_template_id?: string;
  subject_email?: string;
  name: string;
  description?: string;
  location?: string;
  rel_date?: number;  // relative day from the template
  time?: string;
  notes?: string;
  flag?: string;      // one of the following -- 
                      //   for upcoming events: "", "confirmed", "will_be_late", "will_miss"
                      //   for passed events: "missed", "attended"
  is_optional?: boolean;
  first_question_id?: string;
  question: string;   // 'yes' or 'no'
  questions?: Array<Question>;
}

