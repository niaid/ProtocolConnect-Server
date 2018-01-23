import { ResponseCodes } from '../../../both/collections/response_codes.collection';

import { ResponseCode } from '../../../both/models/response_code.model';

import { Meteor } from 'meteor/meteor';
 
export function loadResponseCodes() {
  console.log("loadResponseCodes\n");
  if (ResponseCodes.find().cursor.count() === 0) {
    console.log("really loadResponseCodes\n");
 
    const response_codes : ResponseCode[] = [
         {
           "response_id": "Q1",
           "text": "Our records say that you missed this appointment.  Please confirm."
         },
         {
           "response_id": "A1",
           "text": "Yes, I missed this appointment."
         },
         {
          "response_id": "A2",
          "text": "No, I attended this appointment."
         },
         ,
         {
           "response_id": "Q2",
           "text": "Why did you miss this appointment?"
         },
         {
         "response_id": "A3",
         "text": "I wasn't feeling well."
         },
         {
         "response_id": "A4",
         "text": "I had a transportation issue."
         },
         {
         "response_id": "A5",
         "text": "I was still at a previous appointment."
         },
         {
         "response_id": "A6",
         "text": "I missed it for another reason."
         },
         {
         "response_id": "A7",
         "text": "Additional information"
         },
         {
         "response_id": "Q4",
         "text": "Will you be able to attend?"
         },
          {
          "response_id": "A8",
          "text": "Yes, I'll be there."
          },
          {
          "response_id": "A9",
          "text": "Yes, but I'll be late."
          },
          {
          "response_id": "A10",
          "text": "No, I can't attend."
          },
         {
         "response_id": "Q5",
         "text": "Why will you be late?"
         },
          {
          "response_id": "A11",
          "text": "I'm not feeling well."
          },
          {
          "response_id": "A12",
          "text": "I have a transportation issue."
          },
          {
          "response_id": "A13",
          "text": "I'm still at a previous appointment."
          },
          {
          "response_id": "A14",
          "text": "I have another reason."
          },
          {
          "response_id": "A15",
          "text": "When approximately would your come?"
          },
          {
          "response_id": "A16",
          "text": "Additional information"
         },
         {
         "response_id": "Q6",
         "text": "Could you tell us why you can't attend?"
         },
          {
          "response_id": "A17",
          "text": "I'm not feeling well."
          },
          {
          "response_id": "A18",
          "text": "I have a transportation issue."
          },
          {
          "response_id": "A19",
          "text": "I'm still at a previous appointment."
          },
          {
          "response_id": "A20",
          "text": "I have another reason."
          },
          {
          "response_id": "A21",
          "text": "Additional information"
          }
    ];
 
    // synchronous api?
    // for(var i =0; i<response_codes.length; i++) {
    //   ResponseCodes.insert(response_codes[i]);
    // }

    response_codes.forEach((response_code: ResponseCode) => ResponseCodes.insert(response_code));
  }
}
