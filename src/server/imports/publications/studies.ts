import { Meteor } from 'meteor/meteor';
import { Studies } from '../../../both/collections/studies.collection';
 
//Meteor.publish('studies', () => Studies.find());

function buildQuery(studyId: string, location: string): Object {
  console.log("[-- buildQuery")
  console.log(this.userId)
  //console.log(this.emails[0].address)
  console.log("    buildQuery --]")
  const isAvailable = {
    $or: [
      { 'public': true },
      //{
      //  $and: [
      //    { owner_email: { $exists: true } },
      //    { owner_email: this.emails[0].address }
      //  ],
      //},
      {
        $and: [
          { owner: { $exists: true } },
          { owner: this.userId }
        ],
      },
      {
        $and: [
          { enrolled: { $exists: true } },
          { enrolled: this.userId }
        ]
      }
    ]
  };

  if (studyId) {
    return { $and: [{ _id: studyId }, isAvailable] };
  }
 
  //let searchRegEx = { '$regex': '.*' + (location || '') + '.*', '$options': 'i' };
  let searchRegEx = { '$regex': '.*' , '$options': 'i' };
 
  //return { $and: [{ 'location.name': searchRegEx }, isAvailable] };
  return { $and: [{ 'location': searchRegEx }, isAvailable] };
}
 
Meteor.publish('studies', function(options: Object, location: string) {
  //console.log("publish");
  // Counts.publish(this, 'numberOfStudies',
  //   Studies.find(buildQuery.call(this, null, location)), { noReady: true });
  return Studies.find(buildQuery.call(this, null, location), options);
});
 
Meteor.publish('study', function(studyId: string) {
  return Studies.find(buildQuery.call(this, studyId));
});
