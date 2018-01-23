/*
import {Mongo} from 'meteor/mongo';
*/
import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';
 
import { Subject } from '../models/subject.model';

export let Subjects = new MongoObservable.Collection<Subject>('subjects');

 
Subjects.allow({
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
