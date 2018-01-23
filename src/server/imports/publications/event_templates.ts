import {Meteor} from 'meteor/meteor';
import { EventTemplates } from '../../../both/collections/event_templates.collection';
import { EventTemplate }  from '../../../both/models/event_template.model';
//import {Counts} from 'meteor/tmeasday:publish-counts';
 
function buildQuery(eventtemplateId: string, studyflow_id: string): Object {
  //var isAvailable = {
  //  $or: [
  //    { 'public': true },
  //    {
  //      $and: [
  //        { owner: this.userId },
  //        { owner: { $exists: true } }
  //      ],
  //    },
  //    {
  //      $and: [
  //        { enrolled: this.userId },
  //        { enrolled: { $exists: true } }
  //      ]
  //    }
  //  ]
  //};

  if (eventtemplateId) {
    return { _id: eventtemplateId };
  }
 
  if(studyflow_id) {
    return { 'studyflow_id': studyflow_id };
  } else {
    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return { 'studyflow_id': searchRegEx };
  }
}
 
//Meteor.publish('event_templates', function(options: Object, studyflow_id: string) {
Meteor.publish('event_templates', function(studyflow_id: string) {
  //Counts.publish(this, 'numberOfStudies',
  //  Studies.find(buildQuery.call(this, null, location)), { noReady: true });
  if(studyflow_id) {
    console.log("event_templates publish " + studyflow_id);
    return EventTemplates.find({'studyflow_id':studyflow_id});
  } else {
    console.log("event_templates publish regex");
    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return EventTemplates.find({'studyflow_id':searchRegEx});
  }
  //return EventTemplates.find(buildQuery.call(this, null, studyflow_id), options);
});
 
Meteor.publish('event_template', function(eventtemplateId: string) {
  console.log("event_template publish");
  return EventTemplates.find(buildQuery.call(this, eventtemplateId));
});
