import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';
 
import { Contact } from '../models/contact.model';

export let Contacts = new MongoObservable.Collection<Contact>('contacts');

 
Contacts.allow({
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
