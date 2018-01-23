export interface Choice {
  _id?: string;
  question_id?: string;
  choice_id?: string;
  choice_text?: string;
  selected?: boolean;
  next_question_id?: string;
}
