docker run -d \
      --env MONGO_OPLOG_URL=mongodb://list,of,ips/local?authSource=admin \
          --env MONGO_URL=mongodb://list,of,ips:mongoport/db-name?replicaSet=rs0&readPreference=primaryPreferred&w=majority \
              --env ROOT_URL=http://localhost \
                  build.niaid.nih.gov:5000/lsb/studybuddyserver:latest
