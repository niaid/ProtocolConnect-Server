/* update patient_responses and add event details */
var pipeline = [
  { $match : { $or: [{ event_name : null }, { event_time : null}]} },
  {$lookup: {from:'events', localField:'event_id', foreignField:'_id', as:'event_details'}},
  {$match : {event_details : {$ne:[]}}},
  {$out: 'tmp_response_details'}
]
db.patient_responses.aggregate(pipeline)
var bulkOps = db.tmp_response_details.find().map(function (doc) {
  return {
    'updateOne': {
      'filter': { '_id':doc._id },
      'update': {
        '$set': {
          'event_name': doc.event_details[0].name,
          'event_time': doc.event_details[0].time
       }} }
  };
})
db.patient_responses.bulkWrite(bulkOps, {'ordered':true})

/* update subjects and add details */
var pipeline = [
  { $match : { $or: [{ firstname  : null }, { lastname : null}]} },
  {$lookup: {from:'subjects', localField:'subject_email', foreignField:'email', as:'subject_details'}},
  {$match : {subject_details : {$ne:[]}}},
  {$out: 'tmp_subject_details'}
]
db.patient_responses.aggregate(pipeline)
var bulkOps = db.tmp_subject_details.find().map(function (doc) {
  return {
    'updateOne': {
      'filter': { '_id':doc._id },
      'update': {
        '$set': {
          'firstname': doc.subject_details[0].firstname,
          'lastname': doc.subject_details[0].lastname
       }} }
  };
})
db.patient_responses.bulkWrite(bulkOps, {'ordered':true})

/* update patient_responses to add reason text */
var pipeline = [
  { $match : { $and: [{ reason_text : null }, { reason_ID : {$ne:null}}]} },
  {$lookup: {from:'response_codes', localField:'reason_ID', foreignField:'response_id', as:'response_details'}},
  {$match : {event_details : {$ne:[]}}},
  {$out: 'tmp_response_details'}
]
db.patient_responses.aggregate(pipeline)
var bulkOps = db.tmp_response_details.find().map(function (doc) {
  return {
    'updateOne': {
      'filter': { '_id':doc._id },
      'update': {
        '$set': {
          'reason_text': doc.response_details[0].text,
       }} }
  };
})
db.patient_responses.bulkWrite(bulkOps, {'ordered':true})

