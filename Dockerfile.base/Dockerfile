FROM build.niaid.nih.gov:5000/oeb/centos7_base:latest
MAINTAINER Jonathan Groth <grothja@niaid.nih.gov>

USER root

ENV METEOR 1.3.4.4
ENV NODEJS 0.10.41

WORKDIR /tmp

RUN yum -y update; yum clean all
## extra packages
RUN yum -y install epel-release; yum clean all
RUN yum install -y gcc gcc-c++ make perl wget mongodb-server; yum clean all 
RUN (curl "https://install.meteor.com/?release=${METEOR}" | sh) && \
    wget "https://nodejs.org/dist/v${NODEJS}/node-v${NODEJS}-linux-x64.tar.gz" && \
    cd /usr/local && \
    tar --strip-components 1 -xzf /tmp/node-v${NODEJS}-linux-x64.tar.gz && \
    npm update -g && \
    npm install -g forever && \
    rm -rf /tmp/*

RUN mkdir -p /data/db; chmod 777 /data/db

EXPOSE 27017

USER default

##ENTRYPOINT ["/usr/bin/mongod"]
CMD ["/usr/bin/mongod"]
##CMD ["/bin/bash"]
