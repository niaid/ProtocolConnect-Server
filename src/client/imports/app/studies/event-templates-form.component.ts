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

import template from './event-templates-form.component.html';
 
@Component({
  selector: 'event-templates-form',
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})
@InjectUser()
export class EventTemplatesFormComponent implements OnInit {
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

  subjects: Observable<Object[]>;
  subjectsSub: Subscription;

  eventtemplatesForm: FormGroup;
  subjectsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }
  ngOnInit() {
    this.eventtemplatesForm = this.formBuilder.group({
      day:  ['', Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
      time: ['', Validators.compose([Validators.required, Validators.pattern('[0-9][0-9]:[0-9][0-9]')])],
      name: ['', Validators.required],
      location: ['', Validators.required],
      notes: [''],
      question: ['yes']
    });
    this.paramsSub = this.route.params
      .subscribe(params => {
        this.studyflowId = params['studyflowId'];
      });

  }

  addEventTemplate(): void {
    if (!Meteor.userId()) {
      alert("Please log in first!");
      return;
    }
    if (this.eventtemplatesForm.valid) {
      this.eventtemplatesForm.value.time = this.eventtemplatesForm.value.time + ":00";
      if(this.eventtemplatesForm.value['question']) {
        EventTemplates.insert(Object.assign( {}, this.eventtemplatesForm.value, {
          'studyflow_id': this.studyflowId,
          'day': Number(this.eventtemplatesForm.value['day']),
          'question':'yes'
        }));
      } else {
        EventTemplates.insert(Object.assign( {}, this.eventtemplatesForm.value, {
          'studyflow_id': this.studyflowId,
          'day': Number(this.eventtemplatesForm.value['day']),
          'question':'no'
        }));
      }

      this.eventtemplatesForm.reset()
    } else {
      alert("Please check and make sure input is valid");
    }
  }

}
