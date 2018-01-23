FROM build.niaid.nih.gov:5000/lsb/meteor_base:latest
MAINTAINER Jonathan Groth <grothja@niaid.nih.gov>

USER root

RUN mkdir -p /opt/meteorapp/build

WORKDIR /opt/meteorapp

ADD ./src ./app

RUN cd app && \
    npm install --production && \
    meteor build ../build --directory && \
    cd ../build/bundle/programs/server && \
    npm install && \
    chown -R default:default /opt/meteorapp

ADD ./scripts/start.sh /start.sh
RUN chmod 755 /start.sh

USER default

EXPOSE 3000
ENV PORT 3000

##CMD ["forever", "--minUptime", "1000", "--spinSleepTime", "1000", "/opt/meteorapp/build/bundle/main.js"]
CMD ["/bin/bash", "/start.sh"]
