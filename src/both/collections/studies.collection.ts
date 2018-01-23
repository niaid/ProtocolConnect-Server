/*
import {Mongo} from 'meteor/mongo';
*/
import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';

import { Study } from '../models/study.model';
 
export let Studies = new MongoObservable.Collection<Study>('studies');

 
Studies.allow({
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
