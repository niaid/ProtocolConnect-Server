import { Meteor } from 'meteor/meteor';
 
import { loadStudies } from './imports/fixtures/studies';
import { loadResponseCodes } from './imports/fixtures/response_codes';
//import { loadParties } from './imports/fixtures/parties';
import { Email } from 'meteor/email';
import { md5 } from './md5';

import './imports/publications/parties'; 
import './imports/publications/studies'; 
import './imports/publications/studyflows'; 
import './imports/publications/events';
import './imports/publications/subjects';
import './imports/publications/event_templates';
import './imports/publications/patient_responses';
import './imports/publications/users';
import './imports/publications/messages'; 
import './imports/publications/contacts';

import {Restivus} from 'meteor/nimble:restivus';

import { Studies } from '../both/collections/studies.collection';
import { Subjects } from '../both/collections/subjects.collection';
import { StudyFlows } from '../both/collections/studyflows.collection';
import { PatientResponses } from '../both/collections/patient_responses.collection';
import { PatientEvents } from '../both/collections/events.collection';
import { Messages } from '../both/collections/messages.collection';
import { Contacts } from '../both/collections/contacts.collection';

Meteor.startup(() => {
  loadStudies();
  loadResponseCodes();
//  loadParties();
});

// RESTful API
if(Meteor.isServer) {
   process.env.MAIL_URL="smtp://NIAID.Clinical.Study%40gmail.com:Studybuddy2017@smtp.gmail.com:465/";


  //process.env.MAIL_URL="smtp://nih.studybuddy%40gmail.com:niaid2016@smtp.gmail.com:465/"
  Meteor.startup(function () {
    Meteor.methods({
      sendEmail: function (to, from, subject, text) {
        console.log("sending email to " + to);
        check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        });
      }
    });

    // Global configuration
    var Api = new Restivus({
      version: 'v1',
      useDefaultAuth: true,
      prettyJson: true
    });
 
    // Generates: GET/POST on /api/v1/users, and GET/PUT/DELETE on /api/v1/users/:id 
    // for Meteor.users collection (works on any Mongo collection)
    Api.addCollection(Meteor.users,{
      routeOptions: {
      //authRequired: true
        authRequired: false
      }
      // /*,endpoints: {
      //   get: {
      //     action: function() {
      //       //return Meteor.users.find({"email":[{"address":this.urlParams.id, "verified":false}]});
      //       //return Meteor.users.findOne({"email.address":this.urlParams.id});
      //       let id = this.urlParams.id
      //       let n = id.indexOf(":")
      //       if(n>=0 && n<id.length) {
      //         let email=id.substring(0,n)
      //         let pass=id.substring(n+1,id.length)
      //         let acct = Accounts.findUserByEmail(this.urlParams.id)
      //         if(acct && Bcrypt.compareSync(pass, acct["services"]["password"]["bcrypt"])) {  // doesn't work yet
      //           return acct;
      //         }
      //       }
      //       return {};
      //     }
      //   }
      // } */
    });
    // /api/v1/????
    //    Api.addCollection(Subjects, {
    //      routeOptions: {
    //        authRequired: false
    //      }
    //      ,endpoints: {
    //        get: {
    //          action: function() {
    //            let id = this.urlParams.id
    //            let n = id.indexOf(":")
    //            if(n>=0 && n<id.length) {
    //              let email=id.substring(0,n)
    //              let pass=id.substring(n+1,id.length)
    //              //let res = Subjects.find({"email":email,"subject_id":pass}).fetch()
    //              let res = Subjects.find({"email":email}).fetch()
    //              console.log(res)
    //              if(res && res.length>0) {
    //                return {'status':'success','data':res};
    //              }
    //            }
    //            return {'status':'fail','data':[]};
    //          }
    //        }
    //      }
    //    });

    // // /api/v1/studies/:id 
    // Api.addCollection(Studies);
    // Api.addCollection(StudyFlows);

    //    Api.addCollection(PatientResponses, {
    //      routeOptions: {
    //        authRequired: false
    //      }
    //      ,endpoints: {
    //        post: {
    //          action: function() {
    //            let studyflow_id = this.bodyParams.studyflow_id
    //            let event_id = this.bodyParams.event_id
    //            let subject_email = this.bodyParams.subject_email
    //            let indicated_status = this.bodyParams.indicated_status
    //            let est_arrival = this.bodyParams.est_arrival
    //            let submit_time = this.bodyParams.submit_time
    //            let response_details = this.bodyParams.response_details
    //
    //            var res
    //            try {
    //              res = PatientResponses.insert({
    //                "event_id": event_id,
    //                "studyflow_id": studyflow_id,
    //                "subject_email": subject_email,
    //                "indicated_status": indicated_status,
    //                "est_arrival": est_arrival,
    //                "submit_time": submit_time,
    //                "response_details": response_details
    //              })
    //            }
    //            catch(error) {
    //              return {'status':'fail','data':[]};
    //            }
    //            //return {'status':'success','data':{'_id':res}};
    //            return {'status':'success','data':[{'_id':res}]};
    //            /*
    //            let id = this.urlParams.id
    //            let n = id.indexOf(":")
    //            if(n>=0 && n<id.length) {
    //              let email=id.substring(0,n)
    //              let pass=id.substring(n+1,id.length)
    //              //let res = Subjects.find({"email":email,"subject_id":pass}).fetch()
    //              let res = Subjects.find({"email":email}).fetch()
    //              console.log(res)
    //              if(res && res.length>0) {
    //                return {'status':'success','data':res};
    //              }
    //            }
    //            return {'status':'fail','data':[]};
    //           */
    //          }
    //        }
    //      }
    //    });
    //    Api.addCollection(PatientEvents, { 
    //      routeOptions: { 
    //        authRequired: false 
    //      },
    //      endpoints: { 
    //        get: {
    //          action: function() {
    //            var res;
    //            let id = this.urlParams.id
    //            //if(id.length==0) {
    //            //  return {'status':'fail','data',[]}
    //            //}
    //            let n = id.indexOf(":")
    //            if(n>=0 && n<id.length) {
    //              let key = id.substring(0,n)
    //              let val = id.substring(n+1, id.length)
    //              console.log(key)
    //              console.log(val)
    //              switch (key) {
    //                case 'subject_id':
    //                  res = PatientEvents.find({"subject_id":val}).fetch()
    //                  if(res && res.length>0) {
    //                    return {'status':'success','data':res}
    //                  } else {
    //                    return {'status':'fail','data':[]}
    //                  }
    //                case 'subject_email':
    //                  res = PatientEvents.find({"subject_email":val}).fetch()
    //                  if(res && res.length>0) {
    //                    return {'status':'success','data':res}
    //                  } else {
    //                    return {'status':'fail','data':[]}
    //                  }
    //                case 'event_id':
    //                  res = PatientEvents.find(val).fetch()
    //                  if(res && res.length>0) {
    //                    return {'status':'success','data':res}
    //                  } else {
    //                    return {'status':'fail','data':[]}
    //                  }
    //                default:
    //              } 
    //            }
    //            return {'status':'fail','data':[]}
    //          }
    //        }
    //      }
    //    });
    //
    // 

    // NOTE: pass study ID when calling the following API
    Api.addRoute('contact/:id', 
      { authRequired: false },
      {
        get: function() {
            let study_id = this.urlParams.id;
            let entities = Contacts.find({"study_id":study_id}).fetch();
            if(entities) {
              console.log("find contact: successful");
              return {status: 'success', data: entities};
            } else {
              console.log("find contact: failed");
              return {status: 'fail', data: []};
            }
        }
      }
    );
    Api.addRoute('verifyEmail/:id',
      { authRequired: false },
      {
        get: function () {
            let email = this.urlParams.id;
            let res = Subjects.find({"email":email}).fetch();
            var n = 0;
            if(res && res.length>0) {
              Subjects.update({ "email":email },
                              { $set:
                                { email_verified: true
                                }
                              }
              );
              console.log("send email with reset password.");
              Meteor.call('sendEmail',
                           email,
                           "niaid.clinical.study@gmail.com",
                           "Your email has been successfully verified",
                           '');
              n = res.length
            }
            return {'status':'success','data':[{'records':n}]};
        }
      }
    );
    Api.addRoute('resetPassword/:id',
      { authRequired: false },
      {
        get: function () {
            let email = this.urlParams.id;
            let res = Subjects.find({"email":email}).fetch();
            var n = 0;
            var pass = md5(email).substring(0,6);
            if(res && res.length>0) {
              Subjects.update({ "email":email },
                              { $set:
                                { password: pass
                                }
                              }
              );
              console.log("send email with reset password.");
              Meteor.call('sendEmail',
                           email,
                           "niaid.clinical.study@gmail.com",
                           "Password reset",
                           'Your password has been reset to: "' + pass + '" (case sensitive; without quotes).');
              n = res.length
            }
            return {'status':'success','data':[{'records':n}]};
        }
      }
    );

    Api.addRoute('updatePassword/:id/:oldpass/:newpass',
      { authRequired: false },
      {
        get: function () {
            let email = this.urlParams.id;
            let old_pass = this.urlParams.oldpass;
            let new_pass = this.urlParams.newpass;
            let res = Subjects.find({"email":email, "password":old_pass}).fetch();
            var n = 0;
            if(res && res.length>0) {
              Subjects.update({ "email":email },
                              { $set:
                                { password: new_pass
                                }
                              }
              );
              Meteor.call('sendEmail',
                           email,
                           "niaid.clinical.study@gmail.com",
                           "Your password has been successfully updated",
                           '');
              n = res.length
            }
            return {'status':'success','data':[{'records':n}]};
        }
      }
    );

    Api.addRoute('subjects',
      { authRequired: false },
      {
        get: function () {
          let entities = Subjects.find().fetch();
         if(entities) {
              return {status: 'success', data: entities};
         } else {
              return {status: 'fail', data: []};
         }
        }
      }
    );

    // for debugging purposes only; should disable this route in production server
    Api.addRoute('subjects/:id',
      { authRequired: false },
      {
        get: function() {
            let id = this.urlParams.id
            let n = id.indexOf(":")
            if(n>=0 && n<id.length) {
              let email=id.substring(0,n)
              let pass=id.substring(n+1,id.length)
              //let res = Subjects.find({"email":email,"subject_id":pass}).fetch()
              let res = Subjects.find({"email":email, "password":pass}).fetch()
              console.log(res)
              if(res && res.length>0) {
                return {'status':'success','data':res};
              }
            }
            return {'status':'fail','data':[]};
        }
    });

    // get and send messages
    Api.addRoute('subjects/:email/messages/get/:since',
      { authRequired: false },
      {
        get: function () {
            let email = this.urlParams.email;
            let since = Number(this.urlParams.since); // convert to number
            let entities = Messages.find({"email":email, "epoch":{ $gt: since }}).fetch();
            if(entities) {
                 return {status: 'success', data: entities};
            } else {
                 return {status: 'fail', data: []};
            }
        }
      }
    );
    // return the number of new messages
    Api.addRoute('subjects/:email/messages/count/:since',
      { authRequired: false },
      {
        get: function () {
            let email = this.urlParams.email;
            let since = Number(this.urlParams.since); // convert to number
            let entities = Messages.find({"email":email, "epoch":{ $gt: since }}).fetch();
            if(entities) {
                 return {status: 'success', data: [{ "count": entities.length, "since":since }]};
            } else {
                 return {status: 'fail', data: []};
            }
        }
      }
    );
    Api.addRoute('subjects/:email/messages/send',
      {authRequired: false}, 
      {
        get: function () {
            return {status: 'fail', data: []};  
        },
        post: function() {
            let is_to_patient = Number(this.bodyParams.is_to_patient)
            let email = this.urlParams.email
            let epoch = Number(this.bodyParams.epoch)
            let content = this.bodyParams.content
            let patient = Subjects.findOne({'email': email});
            if(patient) {
                if(is_to_patient == 0) {
                  console.log("POST patient sent a message")
                } else {
                  console.log("POST admin sent a message")
                }
                console.log(this.bodyParams)
                var d = new Date(0)
                d.setUTCSeconds(epoch)
                var dd = d.toString()
                var res
                try {
                  res = Messages.insert({
                    "is_to_patient": is_to_patient,
                    "firstname": patient.firstname,
                    "lastname": patient.lastname,
                    "email": email,
                    "epoch": epoch,
                    "date": dd,
                    "content": content
                  });
                  Meteor.call('sendEmail',
                               "niaid.clinical.study+test@gmail.com",
                               "niaid.clinical.study@gmail.com",
                               email + " has sent you a new message",
                               '');
                }
                catch(error) {
                  return {'status':'fail','data':[]};
                }
            } else {
              return {status: 'fail', data: {}};
            }
    
            //return {'status':'success','data':{'_id':res}};
            return {'status':'success','data':[]};
        }
    });


    // Maps to: POST /api/v1/studies
    Api.addRoute('studies', 
      {authRequired: false}, 
      {
        get: function () {
          let entities = Studies.find().fetch();
         if(entities) {
              return {status: 'success', data: entities};
         } else {
              return {status: 'fail', data: []};
         }
        }
    });
    Api.addRoute('studies/:id', 
                 //{authRequired: true}, 
                 {authRequired: false}, 
                 {
      get: function () {
        let entity = Studies.findOne(this.urlParams.id);
        if(entity) {
          return {status: 'success', data: entity};
        } else {
          return {status: 'fail', data: {}};
        }
      }
    // ,post: {
    //    roleRequired: ['author', 'admin'],
    //    action: function () {
    //      var study = Studies.findOne(this.urlParams.id);
    //      if (study) {
    //        return {status: "success", data: study};
    //      }
    //      return {
    //        statusCode: 400,
    //        body: {status: "fail", message: "Unable to add study"}
    //      };
    //    }
    //  }
    });

    // Maps to: POST /api/v1/studyflows
    Api.addRoute('studyflows',
                 {authRequired: false},
                 {
      get: function () {
        let entities =  StudyFlows.find().fetch();
       if(entities) {
            return {status: 'success', data: entities};
       } else {
            return {status: 'fail', data: []};
       }
      }
    });

    Api.addRoute('studyflows/:id', 
      {authRequired: false}, 
      {
          get: function () {
            let entity = StudyFlows.findOne(this.urlParams.id);
            if(entity) {
              return {status: 'success', data: entity};
            } else {
              return {status: 'fail', data: {}};
            }
          },
        // post: {
        //    roleRequired: ['author', 'admin'],
        //    action: function () {
        //      var study = Studies.findOne(this.urlParams.id);
        //      if (study) {
        //        return {status: "success", data: study};
        //      }
        //      return {
        //        statusCode: 400,
        //        body: {status: "fail", message: "Unable to add study"}
        //      };
        //    }
        //  }
      });

    Api.addRoute('patient_responses', 
      {authRequired: false}, 
      {
        get: function () {
          let entities =  PatientResponses.find().fetch();
         if(entities) {
              return {status: 'success', data: entities};
         } else {
              return {status: 'fail', data: []};
         }
        },
        post: function() {
            let studyflow_id = this.bodyParams.studyflow_id
            let event_id = this.bodyParams.event_id
            let subject_email = this.bodyParams.subject_email
            let response_text = this.bodyParams.response_text
            let response_ID   = this.bodyParams.response_ID
            let reason_ID     = this.bodyParams.curReasonID
            let indicated_status = this.bodyParams.indicated_status
            let est_arrival = this.bodyParams.est_arrival
            let submit_time = this.bodyParams.submit_time
            //let d = new Date()
            //let submit_time = d.toString()
            let response_details = this.bodyParams.additional_response
    
            console.log("POST patient_responses")
            console.log(this.bodyParams)
            var res
            try {
              res = PatientResponses.insert({
                "event_id": event_id,
                "studyflow_id": studyflow_id,
                "subject_email": subject_email,
                "response_text": response_text,
                "response_ID": response_ID,
                "reason_ID"  : reason_ID,
                "indicated_status": indicated_status,
                "est_arrival": est_arrival,
                "submit_time": submit_time,
                "response_details": response_details
              });
              Meteor.call('sendEmail',
                           "niaid.clinical.study+test@gmail.com",
                           "niaid.clinical.study@gmail.com",
                           subject_email + " has sent you a response",
                           '');
            }
            catch(error) {
              return {'status':'fail','data':[]};
            }
            //return {'status':'success','data':{'_id':res}};
            return {'status':'success','data':[{'_id':res}]};
          /*
            let id = this.urlParams.id
            let n = id.indexOf(":")
            if(n>=0 && n<id.length) {
              let email=id.substring(0,n)
              let pass=id.substring(n+1,id.length)
              //let res = Subjects.find({"email":email,"subject_id":pass}).fetch()
              let res = Subjects.find({"email":email}).fetch()
              console.log(res)
              if(res && res.length>0) {
                return {'status':'success','data':res};
              }
            }
            return {'status':'fail','data':[]};
           */
        }
    });

    Api.addRoute('patient_responses/:event_id',
      {authRequired: false}, 
      {
        get: function () {
          let responses =  PatientResponses.find({"event_id":this.urlParams.event_id}).fetch();
         if(responses) {
           return {status: 'success', data: responses};
         } else {
           return {status: 'fail', data: []};
         }
        }
    });

    Api.addRoute('patient_responses/:event_id/latest', 
      {authRequired: false}, 
      {
        get: function () {
          let res =  PatientResponses.find({"event_id":this.urlParams.event_id},{sort: {submit_time:-1}, limit:1}).fetch();
         if(res) {
           if(res.length>0) {
             return {status: 'success', data: res[0]};
           } else { // no response recorded. 
             return {status: 'success', data: {}};
           }
         } else {
              return {status: 'fail', data: {}};
         }
        }
      })

    Api.addRoute('events', 
      { authRequired: false },
      {
        get: function () {
          let entities =  PatientEvents.find().fetch();
         if(entities) {
              return {status: 'success', data: entities};
         } else {
              return {status: 'fail', data: []};
         }
        }
      });

    Api.addRoute('events/:id', 
      { authRequired: false },
      { 
        get: function() {
            var res;
            let id = this.urlParams.id
            //if(id.length==0) {
            //  return {'status':'fail','data',[]}
            //}
            let n = id.indexOf(":")
            if(n>=0 && n<id.length) {
              let key = id.substring(0,n)
              let val = id.substring(n+1, id.length)
              console.log(key)
              console.log(val)
              switch (key) {
                case 'subject_id':
                  res = PatientEvents.find({"subject_id":val}).fetch()
                  if(res && res.length>0) {
                    return {'status':'success','data':res}
                  } else {
                    return {'status':'fail','data':[]}
                  }
                case 'subject_email':
                  res = PatientEvents.find({"subject_email":val}).fetch()
                  if(res && res.length>0) {
                    return {'status':'success','data':res}
                  } else {
                    return {'status':'fail','data':[]}
                  }
                case 'event_id':
                  res = PatientEvents.find(val).fetch()
                  if(res && res.length>0) {
                    return {'status':'success','data':res}
                  } else {
                    return {'status':'fail','data':[]}
                  }
                default:
              } 
            }
            return {'status':'fail','data':[]}
        }
    });

  });
}
