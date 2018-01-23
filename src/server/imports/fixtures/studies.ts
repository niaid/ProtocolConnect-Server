import { Studies } from '../../../both/collections/studies.collection';
import { Subjects } from '../../../both/collections/subjects.collection';
import { StudyFlows } from '../../../both/collections/studyflows.collection';
import { EventTemplates } from '../../../both/collections/event_templates.collection';
import { PatientEvents } from '../../../both/collections/events.collection';

import { Study } from '../../../both/models/study.model';
import { StudyFlow } from '../../../both/models/studyflow.model';
import { EventTemplate } from '../../../both/models/event_template.model';

import { Meteor } from 'meteor/meteor';
 
export function loadStudies() {
  console.log("loadStudies\n");
  if (Studies.find().cursor.count() === 0) {
    console.log("really loadStudies\n");
 
    const studies : Study[] = [
      {
        'name': 'Test Study',
        'description': 'Detailed description of the study.',
        'public': true,
        'location': 'NIH',
        'owner_email': 'sgbu.lsb.niaid@gmail.com'
      }
    ];
 
    // synchronous api?
    for(var i =0; i<studies.length; i++) {
      Studies.insert(studies[i]);
    }

    var study_id = Studies.find({'owner_email':'sgbu.lsb.niaid@gmail.com'}).fetch()[0]._id;

    const studyflows = [
      {
        'name': 'StudyFlow1',
        'description': 'Detailed description of the study flow.',
        'study_id': study_id
      }
    ];

    studyflows.forEach((studyflow: StudyFlow) => StudyFlows.insert(studyflow));
    var studyflow_id = StudyFlows.findOne({'study_id':study_id})._id;

    // var subject_id = "b88dd585fb46068ea12a5889dcd45805";
    // var subjects = [
    //   {
    //     'email': 'larry@email.com',
    //     'firstname': 'Larry',
    //     'lastname': 'Smith',
    //     'subject_id': subject_id,
    //     'studyflow_id': studyflow_id
    //   }
    // ];
    //for (var i = 0; i < subjects.length; i++) {
    //  Subjects.insert(subjects[i]);
    //}

    /*
    var date1 = "2016-08-04";
    var date2 = "2016-08-06";
    var date3 = "2016-08-15";
    const events = [
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "NIH Registration",
        "location": "1st Floor Admissions",
        "time": date1 + "T18:00:00",
        "notes": "Admissions is open 24 hours.  Please register before 6 pm.",
        "question": "yes",
        "flag": "missed"
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Check-in 5SE Nursing Unit for IV Placement, Labs",
        "location": "5SE Inpatient Unit",
        "time": date1 + "T18:01:00",
        "notes": "Please check in after registration.  PLEASE remind nurse that a 20g PIV must be placed.",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "***Do not eat or drink after midnight***",
        "location": "",
        "time": date2 + "T00:01:00",
        "notes": "Please do not eat or drink after midnight on May 2nd.",
        "question": "no",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "EKG",
        "location": "1st Floor Heart Station",
        "time": date2 + "T08:00:00",
        "notes": "The 1st floor heart station is next to phlebotomy.",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Gastric Emptying Study",
        "location": "1st Floor Radiology",
        "time": date2 + "T09:00:00",
        "notes": "",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Neurology Consult with Dr. Khan",
        "location": "5SE Inpatient Unit",
        "time": date2 + "T13:00:00",
        "notes": "",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Lumbar Puncture",
        "location": "1st Floor Radiology",
        "time": date2 + "T14:00:00",
        "notes": "",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Pre-Cardiac MRI Labs",
        "location": "5SE Inpatient Unit",
        "time": date3 + "T06:00:00",
        "notes": "",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Cardiac MRI",
        "location": "B1 MRI",
        "time": date3 + "T07:00:00",
        "notes": "Be sure to fill out paperwork beforehand.",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "EMG",
        "location": "7SW Neuro-Testing",
        "time": date3 + "T11:00:00",
        "notes": "",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Eye Consult",
        "location": "Outpatient Clinic 10",
        "time": date3 + "T13:00:00",
        "notes": "",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Example near future event",
        "location": "",
        "time": date3 + "T15:55:00",
        "notes": "Change the time time of this event to the near future in order to test the notification system.",
        "question": "yes",
        "flag": ""
      },
      {
        'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        'event_template_id': 'dummy',
        'subject_email': 'larry@email.com',
        "name": "Example far future event",
        "location": "",
        "time": date3 + "T17:00:00",
        "notes": "Make sure this event is more than one day in the future.",
        "question": "yes",
        "flag": ""
      }
    ];

    for (var i = 0; i < events.length; i++) {
      PatientEvents.insert(events[i]);
    }
    
*/

    var day1 = 0;
    var day2 = 2;
    var day3 = 11;
    const event_templates : EventTemplate[] = [
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "NIH Registration",
        "location": "1st Floor Admissions",
        //"time": date1 + "T18:00:00",
        "day": day1,
        "time": "18:00:00",
        "notes": "Admissions is open 24 hours.  Please register before 6 pm.",
        "question": "yes",
        //"flag": "missed"
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Check-in 5SE Nursing Unit for IV Placement, Labs",
        "location": "5SE Inpatient Unit",
        //"time": date1 + "T18:01:00",
        "day": day1,
        "time": "18:01:00",
        "notes": "Please check in after registration.  PLEASE remind nurse that a 20g PIV must be placed.",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "***Do not eat or drink after midnight***",
        "location": "",
        //"time": date2 + "T00:01:00",
        "day": day2,
        "time": "00:01:00",
        "notes": "Please do not eat or drink after midnight on May 2nd.",
        "question": "no",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "EKG",
        "location": "1st Floor Heart Station",
        //"time": date2 + "T08:00:00",
        "day": day2,
        "time": "08:00:00",
        "notes": "The 1st floor heart station is next to phlebotomy.",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Gastric Emptying Study",
        "location": "1st Floor Radiology",
        //"time": date2 + "T09:00:00",
        "day": day2,
        "time": "09:00:00",
        "notes": "",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Neurology Consult with Dr. Khan",
        "location": "5SE Inpatient Unit",
        //"time": date2 + "T13:00:00",
        "day": day2,
        "time": "13:00:00",
        "notes": "",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Lumbar Puncture",
        "location": "1st Floor Radiology",
        //"time": date2 + "T14:00:00",
        "day": day2,
        "time": "14:00:00",
        "notes": "",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Pre-Cardiac MRI Labs",
        "location": "5SE Inpatient Unit",
        //"time": date3 + "T06:00:00",
        "day": day3,
        "time": "06:00:00",
        "notes": "",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Cardiac MRI",
        "location": "B1 MRI",
        //"time": date3 + "T07:00:00",
        "day": day3,
        "time": "07:00:00",
        "notes": "Be sure to fill out paperwork beforehand.",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "EMG",
        "location": "7SW Neuro-Testing",
        //"time": date3 + "T11:00:00",
        "day": day3,
        "time": "11:00:00",
        "notes": "",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Eye Consult",
        "location": "Outpatient Clinic 10",
        //"time": date3 + "T13:00:00",
        "day": day3,
        "time": "13:00:00",
        "notes": "",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Example near future event",
        "location": "",
        //"time": date3 + "T15:55:00",
        "day": day3,
        "time": "15:55:00",
        "notes": "Change the time time of this event to the near future in order to test the notification system.",
        "question": "yes",
        //"flag": ""
      },
      {
        //'subject_id': subject_id,
        'studyflow_id': studyflow_id,
        //'event_template_id': 'dummy',
        //'subject_email': 'larry@email.com',
        "name": "Example far future event",
        "location": "",
        //"time": date3 + "T17:00:00",
        "day": day3,
        "time": "17:00:00",
        "notes": "Make sure this event is more than one day in the future.",
        "question": "yes",
        //"flag": ""
      }
    ];

    
    event_templates.forEach((event_template: EventTemplate) => EventTemplates.insert(event_template));
    
    //for (var i = 0; i < 27; i++) {
    //  Studies.insert({
    //    name: Fake.sentence(50),
    //    location: Fake.sentence(10),
    //    description: Fake.sentence(100),
    //    public: true
    //  });
    //}
  }
}
