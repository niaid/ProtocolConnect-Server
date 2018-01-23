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

import template from './studyflow-details.component.html';
 
@Component({
  selector: 'studyflow-details',
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})
/* @RequireUser() */
@InjectUser()
export class StudyFlowDetailsComponent implements OnInit {
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

    this.paramsSub = this.route.params
      .map(params => params['studyflowId'])
      .subscribe(studyflowId => {
        this.studyflowId = studyflowId
        
        if (this.studyflowSub) {
          this.studyflowSub.unsubscribe();
        }
        this.studyflowSub = MeteorObservable.subscribe('studyflow', this.studyflowId).subscribe(() => {
          this.studyflow = StudyFlows.findOne(this.studyflowId);
        });

        //if (this.event_templatesSub) {
        //  this.event_templatesSub.unsubscribe();
        //}
        //this.event_templatesSub = MeteorObservable.subscribe('event_templates', this.studyflowId).subscribe(() => {
        //  this.event_templates = EventTemplates.find({}).zone();
        //});


        //if (this.subjectsSub) {
        //  this.subjectsSub.unsubscribe();
        //}
        //this.subjectsSub = MeteorObservable.subscribe('subjects', this.studyflowId).subscribe(() => {
        //  this.subjects = Subjects.find(this.studyflowId).zone();
        //});

      });

// temporarily commented out before fixing the bugs
//    this.route.params.subscribe((params) => {
//      this.studyflowId = params['studyflowId'];
//
//      this.subscribe('studyflow', this.studyflowId, () => {
//        this.autorun(() => {
//          this.studyflow = StudyFlows.findOne(this.studyflowId);
//          //this.getUsers(this.study);
//          this.study_id = this.studyflow.study_id;
//        }, true);
//      });
// 
//      this.subscribe('event_templates', this.studyflowId, () => {
//        this.autorun(() => {
//          if(this.studyflowId) {
//            this.event_templates = EventTemplates.find({ studyflow_id: this.studyflowId});
//          } else {
//            this.event_templates = EventTemplates.find();
//          }
//        }, true);
//      });
// 
//      this.subscribe('subjects', this.studyflowId, () => {
//        this.autorun(() => {
//          if(this.studyflowId) {
//            this.subjects = Subjects.find({ studyflow_id: this.studyflowId});
//          } else {
//            this.subjects = Subjects.find();
//          }
//        }, true);
//      });
// 
//
//      //this.subscribe('unenrolled', this.studyId, () => {
//      //  this.getUsers(this.study);
//      //}, true);
//    });
  }
 
  getUsers(study: Study) {
    if (study) {
      this.users = Meteor.users.find({
        _id: {
        //$nin: study.enrolled || [],
          $ne: Meteor.userId()
        }
      });
    }
  }

  //getFlows(study: Study) {
  //  if (study) {
  //    this.studyflows = Meteor.studyflows.find({
  //      study_id : study._id
  //    });
  //  }
  //}


  saveStudyFlow() {
    if (!Meteor.userId()) {
      alert('Please log in to change this study flow');
      return;
    }
    if(this.studyflow.name == '') {
      alert('Name of studyflow cannot be empty.');
      return;
    }
    StudyFlows.update(this.studyflow._id, {
      $set: {
        name: this.studyflow.name,
        description: this.studyflow.description
      }
    });
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
