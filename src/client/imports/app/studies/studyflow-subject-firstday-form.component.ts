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

import template from './studyflow-subject-firstday-form.component.html';
 
@Component({
  selector: 'studyflow-subject-firstday-form',
  template
})
/* @RequireUser() */
@InjectUser()
export class StudyFlowSubjectFirstdayFormComponent implements OnInit {
  paramsSub: Subscription;
  studyId: string;
  subjectId: string
  studyflowId: string;

  eventsSub: Subscription;
  firstEvent: PatientEvent;
  firstEventSub: Subscription;
  firstEventTime: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }
 
  ngOnInit() {
    //this.firstDayForm = this.formBuilder.group({
    //  date: [''],
    //  name: ['', Validators.required],
    //});
    this.paramsSub = this.route.params
      .subscribe(params => {
        this.studyId = params['studyId'];
        this.studyflowId = params['studyflowId'];
        this.subjectId = params['subjectId'];
        
        if (this.firstEventSub) {
          this.firstEventSub.unsubscribe();
        }
        this.firstEventSub = MeteorObservable.subscribe('events', this.subjectId, this.studyflowId).subscribe(() => {
          this.firstEvent = PatientEvents.findOne({'studyflow_id':this.studyflowId,'subject_id':this.subjectId}, {sort: {day: 1, time: 1}});
          this.firstEventTime = this.firstEvent.time;
        });

        //if (this.eventsSub) {
        //  this.eventsSub.unsubscribe();
        //}
        //this.eventsSub = MeteorObservable.subscribe('events', this.subjectId, this.studyflowId).subscribe(() => {
        //  this.events = PatientEvents.find({'studyflow_id':this.studyflowId,'subject_id':this.subjectId}, {sort: {day: 1, time: 1}});
        //});
      });
  }

  setStudyFlowSubjectEventsFirstDay() {
    //alert("setStudyFlowSubjectEventsFirstDay");
    //PatientAdmin._logger.info(first); doesn't work
    //alert(first);
    if (!Meteor.userId()) {
      alert('Please log in to change this study flow');
      return;
    }
    //var email      =  (first.fetch()[0].subject_email);
    let updated_date = this.firstEvent.time;
    console.log("selected new date: " + updated_date);
    let orig_date = this.firstEventTime; 
    //alert(date2);
    var orig = new Date((orig_date || "").replace(/-/g,"/").replace(/[TZ]/g," "))
    var updated = new Date((updated_date || "").replace(/-/g,"/").replace(/[TZ]/g," "))

    this.firstEventTime = updated_date;
    //alert(updated);
    var timeDiff = updated.getTime() - orig.getTime();
    var diffDays = Math.sign(timeDiff) * Math.round(Math.abs(timeDiff) / (1000 * 3600 * 24)); 
    //alert(diffDays);
    var my_events = PatientEvents.find({'studyflow_id':this.studyflowId,'subject_id':this.subjectId}, {sort: {day: 1, time: 1}}).fetch();
    for(var i=0; i<my_events.length; i++) {
      var cur_event:PatientEvent = my_events[i];
      var date = new Date((cur_event.time || "").replace(/-/g,"/").replace(/[TZ]/g," "));
      date.setDate(date.getDate() + diffDays)

      var mm = '' + (date.getMonth() + 1); // getMonth() is zero-based
      var dd = '' + date.getDate();
      var hh = '' + date.getHours();
      var MM = '' + date.getMinutes();
      if (mm.length<2) { mm = '0' + mm; };
      if (dd.length<2) { dd = '0' + dd; };
      if (hh.length<2) { hh = '0' + hh; };
      if (MM.length<2) { MM = '0' + MM; };

      var dateStr = [date.getFullYear(), mm, dd].join('-') + "T" + hh + ":" + MM +":00";
      console.log("Date: "+dateStr);                                        
      PatientEvents.update(
         {'_id': cur_event._id },
         {$set: {'time' : dateStr}}
      );
    }
    
  }

}

