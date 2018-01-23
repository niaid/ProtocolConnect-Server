import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor'; 
import { MeteorObservable } from 'meteor-rxjs';

import { Observable } from 'rxjs';
 
import 'rxjs/add/operator/map';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { Studies } from '../../../../both/collections/studies.collection';
import { StudyFlows } from '../../../../both/collections/studyflows.collection';
import { EventTemplates } from '../../../../both/collections/event_templates.collection';
import { PatientEvents }  from '../../../../both/collections/events.collection';

import { Study } from '../../../../both/models/study.model';
import { StudyFlow } from '../../../../both/models/studyflow.model';

import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { MeteorComponent } from 'angular2-meteor';
//import { DisplayName } from '../pipes/pipes.ts';

import template from './study-details.component.html';

import { Mongo } from 'meteor/mongo';
 
@Component({
  selector: 'study-details',
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})
//@RequireUser()
@InjectUser()
//export class StudyDetails extends MeteorComponent {
export class StudyDetailsComponent implements OnInit {
  user: Meteor.User;
  studyId: string;
  paramsSub: Subscription;

  study: Study;
  studySub: Subscription;

  studyflows: Observable<StudyFlow[]>;
  studyflowsSub: Subscription;

  users: Mongo.Cursor<Object>;

  studyflowsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
  }
 
  ngOnInit() {
    this.studyflowsForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
      //location: ['', Validators.required],
      //'public': [false]
    });

    this.paramsSub = this.route.params
      .map(params => params['studyId'])
      .subscribe(studyId => {
        this.studyId = studyId
        
        if (this.studySub) {
          this.studySub.unsubscribe();
        }

        this.studySub = MeteorObservable.subscribe('study', this.studyId).subscribe(() => {
          this.study = Studies.findOne(this.studyId);
        });

        if (this.studyflowsSub) {
          this.studyflowsSub.unsubscribe();
        }

        this.studyflowsSub = MeteorObservable.subscribe('studyflows', this.studyId).subscribe(() => {
          //this.studyflow = StudyFlows.find({this.studyId});
          this.studyflows = StudyFlows.find({'study_id':this.studyId}).zone();
        });


      });

//    this.route.params.subscribe((params) => {
//      this.studyId = params['studyId'];
//
//      this.subscribe('study', this.studyId, () => {
//        this.autorun(() => {
//          this.study = Studies.findOne(this.studyId);
//          if(this.study.flows == null) {
//            this.study.flows = []
//          }
//          //this.blank_flow = {name:"", description:""};
//          this.getUsers(this.study);
//        }, true);
//      });
// 
//      this.subscribe('studyflows', this.studyId, () => {
//        this.autorun(() => {
//          //let x = "YK8xQFFB4FwwuamiH";
//          //let x = "Y";
//          if(this.studyId) {
//            this.studyflows = StudyFlows.find({ study_id: this.studyId});
//          } else {
//            this.studyflows = StudyFlows.find();
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


  addStudyFlow(studyflow) {
    if (!Meteor.userId()) {
      alert('Please log in to add a studyflow');
      return;
    }
    if (this.studyflowsForm.valid) {
    //if(study.flows == null) {
    //  study.flows = []
    //}
    //study.flows.push({name:"test", description:"test"});
    //study.blank_flow = {name:"", description:""};
    //Studies.update(study._id, {
    //  $set: {
    //    flows: study.flows
    //  }
    //});
      StudyFlows.insert(Object.assign({}, this.studyflowsForm.value, {
        study_id: this.studyId,
      }));

      this.studyflowsForm.reset();

    } else {
      alert("Please make sure studyflow name is not empty");
    }
  }
  removeStudyFlow(studyflow) {
    if (!Meteor.userId()) {
      // Only remove info about the study flow; keep the events in the database in case we need them
      return;
    }
    if(confirm("Click OK to confirm deletion of the study flow")) {
      StudyFlows.remove(studyflow._id)
    }
    //EventTemplates.remove({"studyflow_id":studyflow._id})
    //PatientEvents.remove({"studyflow_id":studyflow._id})
  }
 
 
  saveStudy() {
    if (!Meteor.userId()) {
      alert('Please log in to change this study');
      return;
    }

    if(this.study.name == '') {
      alert("Study name cannot be empty!");
      return;
    }
    if(this.study.location == '') {
      alert("Study location cannot be empty!");
      return;
    }
    Studies.update(this.study._id, {
      $set: {
        name: this.study.name,
        description: this.study.description,
        location: this.study.location
      }
    });
  }
 
  /*
  enroll(user: Meteor.User) {
    this.call('enroll', this.study._id, user._id, (error) => {
      if (error) {
        alert(`Failed to enroll due to ${error}`);
        return;
      }
 
      alert('User successfully enrolled.');
    });
  }
 */
 
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
    if (this.study && this.user) {
      return this.user._id === this.study.owner;
    }
 
    return false;
  }
 
  get isPublic(): boolean {
    if (this.study) {
      return this.study.public;
    }
 
    return false;
  }
 
  /*
  get isEnrolled(): boolean {
    if (this.study && this.user) {
      let enrolled = this.study.enrolled || [];
      return enrolled.indexOf(this.user._id) !== -1;
    }
 
    return false;
  }
 */
}
