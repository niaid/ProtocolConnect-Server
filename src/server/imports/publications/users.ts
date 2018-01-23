import { Meteor } from 'meteor/meteor';
import { Studies } from '../../../both/collections/studies.collection';
 
Meteor.publish('unenrolled', function (studyId:string) {
  let study = Studies.findOne(studyId);
 
  if (!study)
    throw new Meteor.Error('404', 'No such study!');
 
  return Meteor.users.find({
    _id: {
      $nin: study.enrolled || [],
      $ne: this.userId
    }
  });
});
