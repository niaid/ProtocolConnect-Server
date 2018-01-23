import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Observable } from 'rxjs';
 
import 'rxjs/add/operator/map';

import { md5 } from '../../../md5';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { Studies } from '../../../../both/collections/studies.collection';
import { StudyFlows } from '../../../../both/collections/studyflows.collection';
import { EventTemplates } from '../../../../both/collections/event_templates.collection';
import { Subjects } from '../../../../both/collections/subjects.collection';
import { PatientEvents } from '../../../../both/collections/events.collection';

import { Study }         from '../../../../both/models/study.model';
import { StudyFlow }     from '../../../../both/models/studyflow.model';
import { Subject }       from '../../../../both/models/subject.model';
import { PatientEvent }  from '../../../../both/models/event.model';
import { EventTemplate } from '../../../../both/models/event_template.model';

import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { MeteorComponent } from 'angular2-meteor';
//import { DisplayName } from '../pipes/pipes.ts';
import { Mongo } from 'meteor/mongo';

import template from './subjects-list.component.html';
 
@Component({
  selector: 'subjects-list',
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})
/* @RequireUser() */
@InjectUser()
export class SubjectsListComponent implements OnInit {
  study_id: string;
  //study: Study;
  studyflowId: string;

  paramsSub: Subscription;
  studyflow: StudyFlow;
  studyflowSub: Subscription;

  users: Mongo.Cursor<Object>;
  user: Meteor.User;

  event_templates: Observable<EventTemplate[]>;
  event_templatesSub: Subscription;

  subjects: Observable<Subject[]>;
  subjectsSub: Subscription;

  eventtemplatesForm: FormGroup;
  subjectsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }
 
  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['studyflowId'])
      .subscribe(studyflowId => {
        this.studyflowId = studyflowId;
        
        if (this.subjectsSub) {
          this.subjectsSub.unsubscribe();
        }
        this.subjectsSub = MeteorObservable.subscribe('subjects', this.studyflowId).subscribe(() => {
          this.subjects = Subjects.find({"studyflow_id":this.studyflowId}).zone();
        });

      })
  }
  removeSubjectFromStudyFlow(subject) {
    if(!Meteor.userId()) {
      return;
    }
    var s: Subject;
    //alert("" + this.studyflowId + " " + subject.subject_id);
    s = Subjects.findOne({"studyflow_id":this.studyflowId, "subject_id": subject.subject_id});
    Subjects.remove({"_id":s._id});
    var es = PatientEvents.find({"studyflow_id":this.studyflowId, "subject_id": subject.subject_id}).fetch();
    es.forEach(e => PatientEvents.remove({"_id":e._id}) );
  }
 
}

