import { Component, OnInit, OnDestroy } from '@angular/core';
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

import template from './event-templates-list.component.html';
 
@Component({
  selector: 'event-templates-list',
  /* directives: [], */
  /* pipes: [DisplayName], */
  template
})

export class EventTemplatesListComponent implements OnInit {
  study_id: string;
  studyflowId: string;

  paramsSub: Subscription;

  event_templates: Observable<EventTemplate[]>;
  event_templatesSub: Subscription;

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
        
        //if (this.studyflowSub) {
        //  this.studyflowSub.unsubscribe();
        //}
        //this.studyflowSub = MeteorObservable.subscribe('studyflow', this.studyflowId).subscribe(() => {
        //  this.studyflow = StudyFlows.findOne(this.studyflowId);
        //});

        if (this.event_templatesSub) {
          this.event_templatesSub.unsubscribe();
        }
        this.event_templatesSub = MeteorObservable.subscribe('event_templates', this.studyflowId).subscribe(() => {
          this.event_templates = EventTemplates.find({'studyflow_id':this.studyflowId},{sort: {day: 1, time: 1}}).zone();
        });


      });
  }

  ngOnDestroy() {
    if (this.event_templatesSub) {
      this.event_templatesSub.unsubscribe();
    }
  }

  removeEventTemplate(event_template) {
    if(!Meteor.userId()) {
      alert('Please log in to change this study flow');
      return;
    }
    if(confirm("Click OK to confirm deletion of the event")) {
      EventTemplates.remove({"_id":event_template._id});
      var es = PatientEvents.find({"event_template_id": event_template._id}).fetch();
      for(var i=0; i<es.length; i++) {
        PatientEvents.remove({"_id": es[i]._id});
      }
    }
  }
}
