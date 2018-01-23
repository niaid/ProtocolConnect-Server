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
import { Contacts } from '../../../../both/collections/contacts.collection';
import { PatientEvents } from '../../../../both/collections/events.collection';
import { PatientResponses } from '../../../../both/collections/patient_responses.collection';

import { Study }         from '../../../../both/models/study.model';
import { StudyFlow }     from '../../../../both/models/studyflow.model';
import { Contact }       from '../../../../both/models/contact.model';
import { PatientEvent }  from '../../../../both/models/event.model';
import { PatientResponse }  from '../../../../both/models/patient_response.model';
import { EventTemplate } from '../../../../both/models/event_template.model';

import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { MeteorComponent } from 'angular2-meteor';
//import { DisplayName } from '../pipes/pipes.ts';
import { Mongo } from 'meteor/mongo';

import template from './contact-form.component.html';
 
@Component({
  /* selector: 'contact-form', */
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})
/* @RequireUser() */
@InjectUser()
export class ContactFormComponent implements OnInit {
  studyId: string;
  // //study: Study;
  // studyflowId: string;

  paramsSub: Subscription;
  //studyflow: StudyFlow;
  //studyflowSub: Subscription;

  //users: Mongo.Cursor<Object>;
  //user: Meteor.User;

  //event_templates: Observable<EventTemplate[]>;
  //event_templatesSub: Subscription;

  //contacts: Observable<Object[]>;
  contactsSub: Subscription;

  current_contact     : Contact;
  current_contact_obs : Observable<Contact[]>;
  contactForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email:  ['', Validators.compose([Validators.required, Validators.pattern('[^@]+@[^@]+')])],
      email2: ['', Validators.compose([Validators.required, Validators.pattern('[^@]+@[^@]+')])]
    });
    this.paramsSub = this.route.params
      .map(params => params['studyId'])
      .subscribe(studyId => {
        this.studyId = studyId;
	//alert(this.studyId);
        //alert(this.Contacts.find().cursor.count())
         if (this.contactsSub) {
           this.contactsSub.unsubscribe()
	 }
         this.contactsSub = MeteorObservable.subscribe("contacts").subscribe((() => {
           this.current_contact = Contacts.findOne({study_id:this.studyId})
           if(this.current_contact) {
             this.current_contact_obs = Observable.of([this.current_contact]);
           } else {
             this.current_contact_obs = Observable.of([{'firstname':"John", "lastname":"Smith", "phone":"123-456-7890", "email":"test@example.com", "study_id":this.studyId}]);
           }
         }));
      });
  }

  updateContact(): void {
    if (!Meteor.userId()) {
      alert("Please log in first!");
      return;
    }
    if (this.contactForm.valid) {
      if(this.contactForm.value.email != this.contactForm.value.email2) {
        alert("Different emails entered! Please correct your input and try again.")
        return;
      }
      const this_email = this.contactForm.value.email;
      const this_phone = this.contactForm.value.phone;
      const this_lastname = this.contactForm.value.lastname;
      const this_firstname = this.contactForm.value.firstname;
      //const server_address = "https://np-p.net/api/v1/";

      if(this.current_contact) {
        Contacts.update(this.current_contact._id, {
          $set: {
            lastname: this_lastname,
            firstname: this_firstname,
            phone: this_phone,
            email: this_email,
            study_id: this.studyId
          }
        });
        alert("Update requested for " + this.studyId)
      } else {
        // add contact
        Contacts.insert(Object.assign({}, this.contactForm.value, { study_id: this.studyId
        }));
        alert("New contact submitted")
      }
      location.reload();
    } else {
      alert("Either a required field is missing or the email is invalid. Please try again.");
    }
  }
 
}
