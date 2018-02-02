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
import { PatientResponses } from '../../../../both/collections/patient_responses.collection';

import { Study }         from '../../../../both/models/study.model';
import { StudyFlow }     from '../../../../both/models/studyflow.model';
import { Subject }       from '../../../../both/models/subject.model';
import { PatientEvent }  from '../../../../both/models/event.model';
import { PatientResponse }  from '../../../../both/models/patient_response.model';
import { EventTemplate } from '../../../../both/models/event_template.model';

import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { MeteorComponent } from 'angular2-meteor';
//import { DisplayName } from '../pipes/pipes.ts';
import { Mongo } from 'meteor/mongo';

import template from './subjects-form.component.html';
 
@Component({
  selector: 'subjects-form',
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})
/* @RequireUser() */
@InjectUser()
export class SubjectsFormComponent implements OnInit {
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
    this.subjectsForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email:  ['', Validators.compose([Validators.required, Validators.pattern('[^@]+@[^@]+')])],
      email2: ['', Validators.compose([Validators.required, Validators.pattern('[^@]+@[^@]+')])]
    });

    this.paramsSub = this.route.params
      .subscribe(params => {
        this.study_id = params['studyId'];
        this.studyflowId = params['studyflowId'];
      });
  }

  addSubject(): void {
    if (!Meteor.userId()) {
      alert("Please log in first!");
      return;
    }
    if (this.subjectsForm.valid) {
      if(this.subjectsForm.value.email != this.subjectsForm.value.email2) {
        alert("Different emails entered! Please correct your input and try again.")
        return;
      }
      // need to check uniqueness
      const this_email = this.subjectsForm.value.email;
      const this_lastname = this.subjectsForm.value.lastname;
      const this_firstname = this.subjectsForm.value.firstname;
      const server_address = "https://protocol-connect.np-p.net/api/v1/";
      const already_enrolled_in_this_study = Subjects.find({email:this_email, study_id:this.study_id}).cursor.count();
      const same_email_registered = Subjects.find({email:this_email}).cursor.count();

      //alert("already_enrolled " + already_enrolled);
      if(same_email_registered > 0) {
        const same_name_registered = Subjects.find({email:this_email, lastname:this_lastname, firstname:this_firstname}).cursor.count();
        if (same_email_registered != same_name_registered) {
           alert("The same email has been registered under a different name.");
        }
      } else {
        if(already_enrolled_in_this_study > 0) {
          alert('The patient is already enrolled in this study')
        } else {
          const has_verified_email = Subjects.findOne({email:this_email, email_verified:true});

          const subject_id = md5(this_email);  // always true
          var pass = subject_id.substring(0,6);
          var verified = false;
          if(has_verified_email) {
            console.log("email already verified");
            pass = has_verified_email.password;
            verified = true;
          } else {
            console.log("email not verified");
          }

          Subjects.insert(Object.assign({}, this.subjectsForm.value, {
            subject_id: subject_id,
            study_id: this.study_id,
            studyflow_id: this.studyflowId,
            password: pass,
            email_verified: verified
          }));
          if(!has_verified_email) {
            console.log("sending verification email to " + this_email);
            Meteor.call('sendEmail',
                        this_email,
                        "niaid.clinical.study@gmail.com",
                        "Please confirm your email address",
                        'Please click the following link to verify your account: ' + 
                          server_address + 'verifyEmail/' + this_email + '. Your initial password is: "' + pass + '" (case sensitive; without quotes).');
          }
          // insert events

          //var studyflow_id = this.studyflowId;
          // temporarily commented out for debugging

          //if(this.event_templatesSub) {
          //  this.event_templatesSub.unsubscribe();
          //}
          //alert(EventTemplates.find({"studyflow_id":this.studyflowId}).cursor.count());
          const ets = EventTemplates.find({"studyflow_id":this.studyflowId}).fetch();
          console.log("ets.length: "+ets.length);

          var event_template: EventTemplate;

          for (var i=0; i<ets.length; i++) {
            //console.log(ets[i].studyflow_id);
            //console.log(ets[i].day);
            var date = new Date();
            //date.setDate(date.getDate() + Number(ets[i].day));
            date.setDate(date.getDate() + ets[i].day);  // ets[i].day should be a number already
            var mm = '' + (date.getMonth() + 1); // getMonth() is zero-based
            var dd = '' + date.getDate();
            if (mm.length<2) { mm = '0' + mm; };
            if (dd.length<2) { dd = '0' + dd; };

            var dateStr = [date.getFullYear(), mm, dd].join('-') + "T" + ets[i].time;
            PatientEvents.insert(Object.assign({},{
              studyflow_id: this.studyflowId,
              subject_id: subject_id,
              event_template_id: ets[i]._id,
              subject_email: this_email,
              name: ets[i].name,
              description: ets[i].description,
              //time: "2016-09-01T10:00:00",
              time: dateStr,
              rel_date: ets[i].day,
              location: ets[i].location,
              notes: ets[i].notes,
              question: ets[i].question,
              flag: ""
            }));
            // Get the event ID for the subject.
            // For the same event template, each subject will have his own event ID.
            let this_event = PatientEvents.findOne({
              studyflow_id: this.studyflowId,
              subject_id: subject_id,
              event_template_id: ets[i]._id
            })
            console.log("Initialize patient response");
            PatientResponses.insert(Object.assign({},{
              studyflow_id: this.studyflowId,
              event_id: this_event._id,
              subject_email: this_email,
            }));
          } 
          this.subjectsForm.reset();
        }
      }
    } else {
      alert("Either a required field is missing or the email is invalid. Please try again.");
    }
  }
 
}
