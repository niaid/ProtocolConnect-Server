import { MongoObservable } from 'meteor-rxjs';
import {Meteor} from 'meteor/meteor';

import { ResponseCode } from '../models/response_code.model';
 
export let ResponseCodes = new MongoObservable.Collection<ResponseCode>('response_codes');

ResponseCodes.allow({
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
