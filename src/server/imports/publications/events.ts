import {Meteor} from 'meteor/meteor';
import { PatientEvents } from '../../../both/collections/events.collection';
//import {Counts} from 'meteor/tmeasday:publish-counts';
 
function buildQuery(subjectId: string, studyflow_id: string): Object {
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

  if (subjectId) {
    return { _id: subjectId };
  }
 
  if(studyflow_id) {
    return { 'studyflow_id': studyflow_id };
  } else {
    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return { 'studyflow_id': searchRegEx };
  }
}
 
Meteor.publish('events', function(subject_id: string, studyflow_id: string) {
  //Counts.publish(this, 'numberOfStudies',
  //  Studies.find(buildQuery.call(this, null, location)), { noReady: true });
  if(subject_id && studyflow_id) {
    return PatientEvents.find({'subject_id':subject_id, 'studyflow_id':studyflow_id});
  } else {
    if(subject_id) {
      return PatientEvents.find({'subject_id':subject_id});
    } else {
      if(studyflow_id) {
        return PatientEvents.find({'studyflow_id':studyflow_id});
      } else {
        return PatientEvents.find();
      }
    }
  }
});
 
Meteor.publish('event', function(event_id: string) {
  if(event_id) {
    return PatientEvents.find({'event_id':event_id});
  } 
});
