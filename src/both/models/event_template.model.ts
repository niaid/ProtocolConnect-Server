import { QuestionTemplate } from './question_template.model';

export interface EventTemplate{
  _id?: string;
  studyflow_id?: string;
  day?: number;
  time?: string;
  name: string;
  description?: string;
  location?: string;
  notes?: string;
  question: string;   // "yes" or "no"

  is_optional?: boolean;
  is_actionable?: boolean;
  question_id?: string;
  questions?: Array<QuestionTemplate>;
}

