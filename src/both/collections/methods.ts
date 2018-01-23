import {Studies} from './studies.collection';
import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';
 
function getContactEmail(user:Meteor.User):string {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
 
  return null;
}
 
Meteor.methods({
  enroll: function (studyId:string, userId:string) {
    check(studyId, String);
    check(userId, String);
 
    let study = Studies.findOne(studyId);
 
    if (!study)
      throw new Meteor.Error('404', 'No such study!');
 
    //if (study.public)
    //  throw new Meteor.Error('400', 'That study is public. No need to enroll people.');
 
    if (study.owner !== this.userId)
      throw new Meteor.Error('403', 'No permissions!');
 
    if (userId !== study.owner && (study.enrolled || []).indexOf(userId) == -1) {
      Studies.update(studyId, {$addToSet: {enrolled: userId}});
 
      let from = getContactEmail(Meteor.users.findOne(this.userId));
      let to = getContactEmail(Meteor.users.findOne(userId));
 
      if (Meteor.isServer && to) {
        // Email.send({
        //   from: 'noreply@gmail.com',
        //   to: to,
        //   replyTo: from || undefined,
        //   subject: 'PARTY: ' + study.name,
        //   text: `Hi, I just added you to ${study.name}.
        //                 \n\nCome check it out: ${Meteor.absoluteUrl()}\n`
        // });
      }
    }
  }
/*,
   reply: function(studyId: string, rsvp: string) {
     check(studyId, String);
     check(rsvp, String);
 
     if (!this.userId)
       throw new Meteor.Error('403', 'You must be logged-in to reply');
 
     if (['yes', 'no', 'maybe'].indexOf(rsvp) === -1)
       throw new Meteor.Error('400', 'Invalid RSVP');
 
     let study = Studies.findOne({ _id: studyId });
 
     if (!study)
       throw new Meteor.Error('404', 'No such study');
 
     if (study.owner === this.userId)
       throw new Meteor.Error('500', 'You are the owner!');
 
     if (!study.public && (!study.invited || study.invited.indexOf(this.userId) == -1))
       throw new Meteor.Error('403', 'No such study'); // its private, but let's not tell this to the user
 
     let rsvpIndex = study.rsvps ? study.rsvps.findIndex((rsvp) => rsvp.userId === this.userId) : -1;
 
     if (rsvpIndex !== -1) {
       // update existing rsvp entry
       if (Meteor.isServer) {
         // update the appropriate rsvp entry with $
         Studies.update(
           { _id: studyId, 'rsvps.userId': this.userId },
           { $set: { 'rsvps.$.response': rsvp } });
       } else {
         // minimongo doesn't yet support $ in modifier. as a temporary
         // workaround, make a modifier that uses an index. this is
         // safe on the client since there's only one thread.
         let modifier = { $set: {} };
         modifier.$set['rsvps.' + rsvpIndex + '.response'] = rsvp;
 
         Studies.update(studyId, modifier);
       }
     } else {
       // add new rsvp entry
       Studies.update(studyId,
         { $push: { rsvps: { userId: this.userId, response: rsvp } } });
     }
   }
*/
});
