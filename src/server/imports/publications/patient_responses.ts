import {Meteor} from 'meteor/meteor';
import { PatientResponses } from '../../../both/collections/patient_responses.collection';
//import {Counts} from 'meteor/tmeasday:publish-counts';
 
function buildQuery(studyflow_id: string): Object {
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

  /*
  if (subjectId) {
    return { _id: subjectId };
  }
 */
 
  if(studyflow_id) {
    return { 'studyflow_id': studyflow_id };
  } else {
    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return { 'studyflow_id': searchRegEx };
  }
};
 
Meteor.publish('patient_responses', function(studyflow_id: string) {
  //Counts.publish(this, 'numberOfStudies',
  //  Studies.find(buildQuery.call(this, null, location)), { noReady: true });
  console.log("patient_responses");
  console.log(studyflow_id);
  //var responses = new Mongo.Collection('patient_responses');
  if(studyflow_id) {
    //var pipeline = [
    //  {$match : { 'studyflow_id' : studyflow_id} },
    //  {$lookup: {from:'events', localField:'event_id', foreignField:'_id', as:'event_details'}}
    //];
    //return responses.aggregate(pipeline, {explain: true});
    return PatientResponses.find({'studyflow_id':studyflow_id});
  } else {
    //var pipeline2 = [
    //  {$lookup: {from:'events', localField:'event_id', foreignField:'_id', as:'event_details'}}
    //];
    //return responses.aggregate(pipeline2, {explain: true});
    return PatientResponses.find();
  }
});
 
//Meteor.publish('patient_responses', function(event_id: string) {
//  if(event_id) {
//    return PatientResponses.find({'event_id':event_id});
//  } 
//});
