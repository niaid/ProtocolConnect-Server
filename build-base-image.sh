#!/bin/bash

if [ ${HOSTNAME##*.} == gov ]; then
  BUILD_SERVER="build.niaid.nih.gov:5000/"
  docker build --rm -t ${BUILD_SERVER}lsb/meteor_base:latest Dockerfile.base
else
  docker build --rm -t                lsb/meteor_base:latest -f Dockerfile.base/Dockerfile.alt Dockerfile.base
fi

