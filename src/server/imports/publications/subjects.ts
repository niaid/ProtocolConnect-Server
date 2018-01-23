import {Meteor} from 'meteor/meteor';
import { Subjects } from '../../../both/collections/subjects.collection';
import { Subject  } from '../../../both/models/subject.model';
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
 
Meteor.publish('subjects', function(studyflow_id: string) {
  //Counts.publish(this, 'numberOfStudies',
  //  Studies.find(buildQuery.call(this, null, location)), { noReady: true });
  if(studyflow_id) {
    console.log("publish subjects " + studyflow_id);
    return Subjects.find({'studyflow_id':studyflow_id});
  } else {
    console.log("publish subjects regex");
    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return Subjects.find({'studyflow_id':searchRegEx});
  }
  //return Subjects.find(buildQuery.call(this, null, studyflow_id), options);
});
 
Meteor.publish('subject', function(subjectId: string) {
  console.log("publish subject " + subjectId);
  return Subjects.find(buildQuery.call(this, subjectId));
});
