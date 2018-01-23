export interface ChoiceTemplate{
  text: string;
  selected?: boolean;
  next_question?: number;  // index to the next question in the array if the choice is selected
}


