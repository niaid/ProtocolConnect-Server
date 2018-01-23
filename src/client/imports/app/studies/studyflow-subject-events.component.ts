import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Observable } from 'rxjs';
 
import 'rxjs/add/operator/map';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Mongo } from 'meteor/mongo';

import { Studies } from '../../../../both/collections/studies.collection';
import { StudyFlows } from '../../../../both/collections/studyflows.collection';
import { EventTemplates } from '../../../../both/collections/event_templates.collection';
import { Subjects } from '../../../../both/collections/subjects.collection';
import { PatientEvents } from '../../../../both/collections/events.collection';

import { Study }         from '../../../../both/models/study.model';
import { Subject }       from '../../../../both/models/subject.model';
import { PatientEvent }  from '../../../../both/models/event.model';
import { EventTemplate } from '../../../../both/models/event_template.model';

import template from './studyflow-subject-events.component.html';
 
@Component({
  selector: 'studyflow-subject-events',
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})
/* @RequireUser() */
@InjectUser()
export class StudyFlowSubjectEventsComponent implements OnInit {
  paramsSub: Subscription;
  studyId: string;
  subjectId: string
  studyflowId: string;
  //study: Study;
  // studyflow: StudyFlow;
  // users: Mongo.Cursor<Object>;
  // user: Meteor.User;
  // event_templates: Mongo.Cursor<Object>;
  // subjects: Mongo.Cursor<Object>;
  events: Observable<PatientEvent[]>;
  eventsSub: Subscription;
  //firstEvent: PatientEvent;
  //first_event_id: string;

  //firstDayForm: FormGroup;
  //eventsForm: FormGroup;
  // subjectsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }
 
  ngOnInit() {
    //this.eventsForm = this.formBuilder.group({
    //  time: [''],
    //  name: ['', Validators.required],
    //  description: ['']
    //});
    this.paramsSub = this.route.params
      //.map(params => params['partyId'])
      .subscribe(params => {
        this.studyId = params['studyId'];
        this.studyflowId = params['studyflowId'];
        this.subjectId = params['subjectId'];
        
        if (this.eventsSub) {
          this.eventsSub.unsubscribe();
        }

        this.eventsSub = MeteorObservable.subscribe('events', this.subjectId, this.studyflowId).subscribe(() => {
          this.events = PatientEvents.find({'subject_id':this.subjectId,'studyflow_id':this.studyflowId}).zone();
        });
      });
  }
 
  saveStudyFlowSubjectEvents(events) {
    //alert("saveStudyFlowSubjectEvents");
    alert(events);
    if (Meteor.userId()) {
      //StudyFlows.update(studyflow._id, {
      //  $set: {
      //    name: studyflow.name,
      //    description: studyflow.description,
      //  }
      //});
    } else {
      alert('Please log in to change this study flow');
    }
  }
 
  //enroll(user: Meteor.User) {
  //  this.call('enroll', this.study._id, user._id, (error) => {
  //    if (error) {
  //      alert(`Failed to enroll due to ${error}`);
  //      return;
  //    }
 
  //    alert('User successfully enrolled.');
  //  });
  //}
 
  //reply(rsvp: string) {
  //  this.call('reply', this.study._id, rsvp, (error) => {
  //    if (error) {
  //      alert(`Failed to reply due to ${error}`);
  //    }
  //    else {
  //      alert('You successfully replied.');
  //    }
  //  });
  //}
 
  get isOwner(): boolean {
    return true;
    //if (this.study && this.user) {
    //  return this.user._id === this.study.owner;
    //}
 
    //return false;
  }
 
  //get isPublic(): boolean {
  //  if (this.study) {
  //    return this.study.public;
  //  }
 
  //  return false;
  //}
 
  //get isEnrolled(): boolean {
  //  if (this.study && this.user) {
  //    let enrolled = this.study.enrolled || [];
  //    return enrolled.indexOf(this.user._id) !== -1;
  //  }
 
  //  return false;
  //}
}
