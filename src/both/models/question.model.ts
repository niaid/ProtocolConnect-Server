import { Choice } from './choice.model';

export interface Question {
  _id?: string;
  question_id: string;
  question_type: string;
  text: string;
  choice?: Array<Choice>;
  comment?: string;
}
