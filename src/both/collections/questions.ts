/*
import {Mongo} from 'meteor/mongo';
*/
import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';

import { Question } from '../models/question.model';
 
export let Questions = new MongoObservable.Collection<Question>('questions');

 
Questions.allow({
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
