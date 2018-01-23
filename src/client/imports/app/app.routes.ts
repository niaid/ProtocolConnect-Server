import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';
 
import { SubjectMessagesComponent }        from './studies/subject-messages.component';
import { StudiesListComponent  }           from './studies/studies-list.component';
import { StudyDetailsComponent }           from './studies/study-details.component';
import { StudyFlowDetailsComponent }       from './studies/studyflow-details.component';
import { StudyFlowSubjectEventsComponent } from './studies/studyflow-subject-events.component';
import { StudyFlowSubjectsComponent }      from './studies/studyflow-subjects.component';
import { PatientResponseListComponent }    from './studies/patient-responses.component';
import { ContactFormComponent }            from './studies/contact-form.component';
 
export const routes: Route[] = [
  { path: '',                  component: StudiesListComponent },
  { path: 'subject/:subjectEmail/messages', component: SubjectMessagesComponent },
  { path: 'study/:studyId',    component: StudyDetailsComponent },
  { path: 'study/:studyId/studyflow/:studyflowId',    component: StudyFlowDetailsComponent },
  { path: 'study/:studyId/studyflow/:studyflowId/subject/:subjectId/event',    component: StudyFlowSubjectEventsComponent },  // Admin can update/customize event details
  { path: 'study/:studyId/studyflow/:studyflowId/responses', component: PatientResponseListComponent },
  //{ path: 'subject/:subjectId/event',    component: SubjectEvent },  // Read only
  { path: 'study/:studyId/studyflow/:studyflowId/subjects', component: StudyFlowSubjectsComponent },
  { path: 'study/:studyId/contact', component: ContactFormComponent },
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
