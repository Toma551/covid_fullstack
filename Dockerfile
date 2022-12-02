FROM gradle:4.7.0-jdk8-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src/covid-api
ENTRYPOINT ["./gradlew","build"]

FROM openjdk:8-jre-slim

RUN mkdir /app

ENTRYPOINT ["java","-jar","/home/gradle/src/covid-api/build/libs/covid-api.jar"]
