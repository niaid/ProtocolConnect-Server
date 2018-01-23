/*
import {Mongo} from 'meteor/mongo';
*/
import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';
 
import { StudyFlow } from '../models/studyflow.model';

export let StudyFlows = new MongoObservable.Collection<StudyFlow>('studyflows');

 
StudyFlows.allow({
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
