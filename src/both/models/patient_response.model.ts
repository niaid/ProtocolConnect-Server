export interface PatientResponse{
  _id?: string;
  studyflow_id?: string;
  event_id?: string;
  subject_email: string;
  response_text?: string;  // e.g. "A08: Yes I'll be there."
  response_ID?: string;    // e.g. "A08"
  reason_text?: string;    // e.g. for question "I'll be late", reason_text contains further explanation such as "A17: I'm not feeling well."
  reason_ID?: string;      // reason_ID contains the ID of reason_text, e.g. "A17"
  indicated_status?: string;  // will_be_on_time / will_be_late / cannot_come [Currently not used]
  est_arrival?: string;      // if late, what is the est. arrival time
  submit_time?: string;       // client side time when the response is submitted
  cur_time?: string;          // server side time when the response is received
  response_details?: string;  // detailed questions and answers from the user (free text)

  // subject_id?: string;
  // studyflow_id?: string;
  // event_template_id?: string;
  // name?: string;
  // description?: string;
  // location?: string;
  // rel_date?: int;  // relative day from the template
  // time?: string;
  // notes?: string;
  // flag?: string;      // one of the following -- 
  //                     //   for upcoming events: "", "confirmed", "will_be_late", "will_miss"
  //                     //   for passed events: "missed", "attended"
  // is_optional?: boolean;
  // first_question_id?: string;
  // question?: string;   // 'yes' or 'no'
  // questions?: Array<Question>;
}

