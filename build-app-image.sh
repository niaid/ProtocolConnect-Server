#!/bin/bash

if [ ${HOSTNAME##*.} == gov ]; then
  BUILD_SERVER="build.niaid.nih.gov:5000/"
  docker build -t ${BUILD_SERVER}lsb/studybuddyserver:latest .
else
  docker build -t lsb/studybuddyserver:latest -f Dockerfile.alt .
fi
