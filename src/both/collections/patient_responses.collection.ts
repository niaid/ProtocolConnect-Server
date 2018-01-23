import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';
import { PatientResponse } from '../models/patient_response.model';
 
export let PatientResponses = new MongoObservable.Collection<PatientResponse>('patient_responses');
 
PatientResponses.allow({
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
