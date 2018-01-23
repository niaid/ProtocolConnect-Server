import {Meteor} from 'meteor/meteor';
import { Subjects } from '../../../both/collections/subjects.collection';
import { Subject  } from '../../../both/models/subject.model';
import { Messages } from '../../../both/collections/messages.collection';
import { Message  } from '../../../both/models/message.model';

function buildQuery(subjectEmail: string): Object {

  if (subjectEmail) {
    return { email: subjectEmail };
  }
}
 
Meteor.publish('messages', function(subjectEmail: string) {
  //Counts.publish(this, 'numberOfStudies',
  //  Studies.find(buildQuery.call(this, null, location)), { noReady: true });
  if(subjectEmail) {
    console.log("publish messages " + subjectEmail);
    return Messages.find({'email':subjectEmail});
  } else {
    console.log("publish messages regex");
    let searchRegEx = { '$regex': '.*' , '$options': 'i' };
    return Messages.find({'email':searchRegEx});
  }
});
 
Meteor.publish('message', function(messageId: string) {
  console.log("publish message " + messageId);
  return Messages.find(buildQuery.call(this, messageId));
});
