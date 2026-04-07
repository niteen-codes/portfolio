# syntax=docker/dockerfile:1

FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /workspace

# Copy project metadata first for better layer caching.
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

# Copy source and build.
COPY src src
RUN mvn -q -DskipTests clean package

FROM eclipse-temurin:17-jre-jammy AS runtime
WORKDIR /app

# Create a non-root user for runtime security.
RUN useradd --create-home --shell /bin/bash springuser

COPY --from=build /workspace/target/com-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
USER springuser

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-Djava.net.preferIPv4Stack=true", "-jar", "app.jar"]
