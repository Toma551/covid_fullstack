FROM openjdk:17-oracle as builder

EXPOSE 8080
COPY . /src
WORKDIR /src

RUN chmod 555 gradlew


RUN sh -c "./gradlew build --stacktrace"


FROM openjdk:17-oracle

COPY --from=builder /src/build/libs/covid-api.jar /app/app.jar

RUN ["java", "-jar", "/app/app.jar"]
