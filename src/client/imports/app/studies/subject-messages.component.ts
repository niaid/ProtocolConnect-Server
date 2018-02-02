import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
//import { Observable } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

//import { md5 } from '../../../md5';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { Studies } from '../../../../both/collections/studies.collection';
import { StudyFlows } from '../../../../both/collections/studyflows.collection';
import { EventTemplates } from '../../../../both/collections/event_templates.collection';
import { Subjects } from '../../../../both/collections/subjects.collection';
import { Messages } from '../../../../both/collections/messages.collection';

import { Study }         from '../../../../both/models/study.model';
import { StudyFlow }     from '../../../../both/models/studyflow.model';
import { Subject }       from '../../../../both/models/subject.model';
import { Message }       from '../../../../both/models/message.model';

import { Meteor } from 'meteor/meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';
//import { MeteorComponent } from 'angular2-meteor';
//import { DisplayName } from '../pipes/pipes.ts';
import { Mongo } from 'meteor/mongo';

import template from './subject-messages.component.html';

@Component({
  selector: 'subject-messages',
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})

@InjectUser()
export class SubjectMessagesComponent {
  subjectId: string;
  subjectEmail: string;
  paramsSub: Subscription;

  messages: Observable<Message[]>;
  //messages: Message[];
  //https://stackoverflow.com/questions/37669871/using-an-array-from-observable-object-with-ngfor-and-async-pipe-angular-2
  messagesSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['subjectEmail'])
      .subscribe(subjectEmail => {
        this.subjectEmail = subjectEmail;

        if (this.messagesSub) {
          this.messagesSub.unsubscribe();
        }
        this.messagesSub = MeteorObservable.subscribe('messages', this.subjectEmail).subscribe(() => {
          this.messages = Messages.find({"email":this.subjectEmail}).zone();
        });

      })
  }

  sendMsg(content: string) {
    var epoch = (new Date).getTime()/1000;
    var d = new Date(0);
    d.setUTCSeconds(epoch);
    var dd = d.toString();
    var subject = Subjects.findOne({"email":this.subjectEmail});
        

    Messages.insert({'email':this.subjectEmail, 'content':content, 
                    'epoch':epoch, 'date':dd,
                    'is_to_patient':1,
                    'lastname':subject.lastname,
                    'firstname':subject.firstname
    });
    (document.getElementById('msgInput') as HTMLInputElement).value = "";
  }
}
