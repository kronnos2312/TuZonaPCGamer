# Usar openjdk 17 base slim
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copiar jar construido (suponiendo que ya hiciste mvn package)
COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
