import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Observable } from 'rxjs';
 
import 'rxjs/add/operator/map';

//import { FormBuilder, Validators } from '@angular/forms'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
//import { ActivatedRoute } from '@angular/router';
import { Meteor } from 'meteor/meteor';
//import { RequireUser, InjectUser } from 'angular2-meteor-accounts-ui';
import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { MeteorComponent } from 'angular2-meteor';
//import { DisplayName } from '../pipes/pipes.ts';
import { Mongo } from 'meteor/mongo';

import { Studies } from '../../../../both/collections/studies.collection';
import { StudyFlows } from '../../../../both/collections/studyflows.collection';
import { EventTemplates } from '../../../../both/collections/event_templates.collection';
import { Subjects } from '../../../../both/collections/subjects.collection';
import { PatientEvents } from '../../../../both/collections/events.collection';
import { PatientResponses } from '../../../../both/collections/patient_responses.collection';

import { Study }           from '../../../../both/models/study.model';
import { Subject }         from '../../../../both/models/subject.model';
import { PatientEvent }    from '../../../../both/models/event.model';
import { EventTemplate }   from '../../../../both/models/event_template.model';
import { PatientResponse } from '../../../../both/models/patient_response.model.ts';

import template from './patient-responses.component.html';
 
@Component({
  selector: 'patient-responses',
  /*pipes: [DisplayName], */
  template
})
//@RequireUser()
@InjectUser()
export class PatientResponseListComponent implements OnInit {
  //studyId: string;
  //study: Study;
  //subjectId: string
  studyflowId: string;
  // studyflow: StudyFlow;
  // users: Mongo.Cursor<Object>;
  // user: Meteor.User;
  // event_templates: Mongo.Cursor<Object>;
  // subjects: Mongo.Cursor<Object>;
  //responses: Mongo.Cursor<Object>;

  paramsSub: Subscription;
  responses: Observable<PatientResponse[]>;
  responsesSub: Subscription;

  /*
  firstDayForm: FormGroup;
  eventsForm: FormGroup;
 */
  // subjectsForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
             ) {
//    super();
//    /*
//    let fb = new FormBuilder();
//
//    this.eventsForm = fb.group({
//      time: [''],
//      name: ['', Validators.required],
//      description: ['']
//    });
//   */
//
  }
 
  ngOnInit() {
//    this.route.params.subscribe((params) => {
//      this.studyflowId = params['studyflowId'];
//      //this.subjectId = params['subjectId'];
//
//      //this.subscribe('responses', this.subjectId, this.studyflowId, () => {
//      this.subscribe('patient_responses', this.studyflowId, () => {
//        this.autorun(() => {
//          this.responses = PatientResponses.find({'studyflow_id':this.studyflowId});
//        }, true);
//      });
//    });

    this.paramsSub = this.route.params
      .map(params => params['studyflowId'])
      .subscribe(studyflowId => {
        this.studyflowId = studyflowId;
        
        if (this.responsesSub) {
          this.responsesSub.unsubscribe();
        }
        this.responsesSub = MeteorObservable.subscribe('patient_responses', this.studyflowId).subscribe(() => {
          this.responses = PatientResponses.find({"studyflow_id":this.studyflowId}).zone();
          //this.responses = PatientResponses.aggregate([
          //  {$match: {"studyflow_id":this.studyflowId}},
          //  {$lookup : { from:'events', localField:'event_id', foreignField:'_id', as:'event_details'}}
          //]).zone();
        });

      })
    
  }
 
  get isOwner(): boolean {
    return true;
    //if (this.study && this.user) {
    //  return this.user._id === this.study.owner;
    //}
 
    //return false;
  }
 
}
