import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';
import { PatientEvent } from '../models/event.model';
 
export let PatientEvents = new MongoObservable.Collection<PatientEvent>('events');

 
PatientEvents.allow({
  insert: function() {
    let user = Meteor.user();
    
    return !!user;
  },
  update: function() {
    let user = Meteor.user();
    
    return !!user;
  },
  remove: function() {
    let user = Meteor.user();
    
    return !!user;
  }
});
