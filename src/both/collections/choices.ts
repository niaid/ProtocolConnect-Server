/*
 import {Mongo} from 'meteor/mongo';
 */

import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';

import { Choice } from '../models/choice.model';
 
export let Choices = new MongoObservable.Collection<Choice>('choices');

 
Choices.allow({
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
