import {Meteor} from 'meteor/meteor';
import { Contacts } from '../../../both/collections/contacts.collection';
import { Contact  } from '../../../both/models/contact.model';
//import {Counts} from 'meteor/tmeasday:publish-counts';
 
function buildQuery(studyId: string): Object {
  if (studyId) {
    return { study_id: studyId };
  } else {
    //let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    //return { 'contactId': searchRegEx };
    return { study_id: null };
  }
}
 
//Meteor.publish('contacts', function(studyflow_id: string) {
//  //Counts.publish(this, 'numberOfStudies',
//  //  Studies.find(buildQuery.call(this, null, location)), { noReady: true });
//  if(studyflow_id) {
//    console.log("publish contacts " + studyflow_id);
//    return Subjects.find({'studyflow_id':studyflow_id});
//  } else {
//    console.log("publish contacts regex");
//    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
//    return Subjects.find({'studyflow_id':searchRegEx});
//  }
//  //return Subjects.find(buildQuery.call(this, null, studyflow_id), options);
//});

Meteor.publish('contacts', function() {
  console.log("publish contacts ");
  return Contacts.find();
});
 
//Meteor.publish('contacts', function(contactId: string) {
//  console.log("publish contacts " + contactId);
//  if(contactId) {
//    console.log("publish contacts " + contactId);
//    return Contacts.find(buildQuery.call(this, contactId));
//  } else {
//    console.log("publish contacts regex");
//    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
//    return Contacts.find({'contactId':searchRegEx});
//  }
//});
 
Meteor.publish('contacts', function(studyId: string) {
  console.log("publish contacts");
  if(studyId) {
    console.log("publish contacts for study" + studyId);
    return Contacts.find(buildQuery.call(this, studyId));
  } else {
    //console.log("publish contacts regex");
    //let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return Contacts.findOne({'studyId':null});
  }
});

