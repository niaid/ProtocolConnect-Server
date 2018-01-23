#!/bin/bash

/usr/bin/mongod &
echo "Starting meteor app"
find /opt/meteorapp/build/bundle/
forever --minUptime 1000 --spinSleepTime 1000 /opt/meteorapp/build/bundle/main.js
