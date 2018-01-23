#!/bin/bash
echo -e 'use meteor\ndb.studies.find()\ndb.studyflows.find();' | tee /dev/stderr | mongo localhost:3001 
