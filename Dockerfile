FROM gradle:4.7.0-jdk8-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src/covid-api
RUN ./gradlew build

FROM openjdk:8-jre-slim

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java","-jar","/usr/src/app/target/covid-api.jar"]
