import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';
import { EventTemplate } from '../models/event_template.model';
 
export const EventTemplates = new MongoObservable.Collection<EventTemplate>('event_templates');

 
EventTemplates.allow({
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
