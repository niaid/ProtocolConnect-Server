import { ChoiceTemplate } from './choice_template.model';

export interface QuestionTemplate{
  text: string;
  choices: Array<ChoiceTemplate>;
  comments?: string;
}


