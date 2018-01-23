import {Meteor} from 'meteor/meteor';
import { StudyFlows } from '../../../both/collections/studyflows.collection';
//import {Counts} from 'meteor/tmeasday:publish-counts';
 
function buildQuery(studyflowId: string, study_id: string): Object {
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

  if (studyflowId) {
    //return { $and: [{ _id: studyflowId }, isAvailable] };
    return { _id: studyflowId };
  }
 
  //let searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };
  //let searchRegEx = { '$regex': '.*' , '$options': 'i' };
 
  //return { $and: [{ 'location.name': searchRegEx }, isAvailable] };
  //return { $and: [{ 'study_id': searchRegEx }, isAvailable] };
  //return { $and: [{ 'study_id': study_id }, isAvailable] };
  if(study_id) {
    return { 'study_id': study_id };
  } else {
    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return { 'study_id': searchRegEx };
  }
}
 
//Meteor.publish('studyflows', function(options: Object, study_id: string) {
Meteor.publish('studyflows', function(study_id: string) {
  //study_id = "YK8xQFFB4FwwuamiH";
  console.log("publish");
  console.log(study_id);
  //Counts.publish(this, 'numberOfStudies',
  //  Studies.find(buildQuery.call(this, null, location)), { noReady: true });
  if(study_id) {
    return StudyFlows.find({'study_id':study_id});
  } else {
    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return StudyFlows.find({'study_id':searchRegEx});
  }
  //return StudyFlows.find(buildQuery.call(this, null, study_id), options);
});
 
Meteor.publish('studyflow', function(studyflowId: string) {
  return StudyFlows.find(buildQuery.call(this, studyflowId));
});
