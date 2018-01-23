import { EventTemplate } from './event_template.model';
import { Subject } from './subject.model';

export interface StudyFlow{
  _id?: string;
  study_id?: string;
  name: string;
  description?: string;
  events?: Array<EventTemplate>;
  subjects?: Array<Subject>;
}
