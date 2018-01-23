import { StudyFlow } from './studyflow.model';

export interface Study {
  _id?: string;
  name: string;
  description?: string;
  owner?: string;
  owner_email?: string;
  public: boolean;
  location: string;
  flows?: Array<StudyFlow>;
  enrolled?: Array<string>;
  // location: {
  //   name: string;
  //   lat?: number;
  //   lng?: number;
  // };
  // invited?: Array<string>;
  // rsvps?: Array<RSVP>;
}
 
//interface StudyFlow{
//  _id?: string;
//  study_id: string;
//  name: string;
//  description?: string;
//  events?: Array<EventTemplate>;
//}
//
//interface EventTemplate{
//  day: int;
//  name: string;
//  description?: string;
//  is_optional: boolean;
//  is_actionable: boolean;
//  questions?: Array<Question>;
//}
//
//interface Question{
//  text: string;
//  choices: Array<Choice>;
//  comments?: string;
//}
//
//interface Choice{
//  text: string;
//  selected?: boolean;
//  next_question?: int;  // index to the next question in the array if the choice is selected
//}

//interface RSVP {
//  userId: string;
//  response: string;
//}

declare var Fake: {
    sentence(words: number): string;
}
