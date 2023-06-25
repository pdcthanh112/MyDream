FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAVA_OPTS
ENV JAVA_OPTS=$JAVA_OPTS
COPY target/project-0.0.1-SNAPSHOT.jar congthanhproject.jar
EXPOSE 5000
ENTRYPOINT exec java $JAVA_OPTS -jar congthanhproject.jar
# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar congthanhproject.jar
