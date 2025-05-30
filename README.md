# TuZonaPCGamer

Proyecto para gestionar el inventario de la empresa TuZonaPCGamer.  
Aplicación cliente-servidor con backend en Spring Boot 17 y frontend en Next.js.

---

## Estructura del proyecto

- `/server/inventory`  
  Backend API REST desarrollado con Spring Boot 17.  
  Utiliza Spring Web, JPA y PostgreSQL para la gestión del inventario.

- `/web/tuzonapcgamerweb`  
  Aplicación frontend desarrollada en Next.js para la interfaz de usuario.

---

# Backend - API REST (Spring Boot 17)

## Tecnologías principales

- Java 17  
- Spring Boot 3.x  
- Spring Web (MVC / REST Controllers)  
- Spring Data JPA  
- PostgreSQL  

## Configuración básica

- Base de datos PostgreSQL configurada en `application.properties` o `application.yml`.  
- Entidades JPA para manejar productos, entradas y salidas de inventario.  
- Controladores REST para exponer los endpoints necesarios.

## Cómo ejecutar el backend

### Opción 1: Ejecutar localmente (sin Docker)

1. Asegúrate de tener PostgreSQL corriendo y configurado.  
2. Desde la carpeta `/server/inventory`, ejecuta:

```bash
./mvnw spring-boot:run
```
# o en Windows
mvnw.cmd spring-boot:run
## Opción 2: Ejecutar con Docker y Docker Compose

Si quieres levantar backend, frontend y base de datos con Docker, puedes usar docker-compose.

Asegúrate de tener Docker y Docker Compose instalados.

En la raíz del proyecto, crea o usa el archivo `docker-compose.yml` con la siguiente configuración:

```yaml
version: '3.8'

services:
  db:
    image: postgres:14
    container_name: tuzonapcgamer-db
    environment:
      POSTGRES_DB: mydatabase
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
    ports:
      - "5432:5432"

  backend:
    build:
      context: ./server/inventory
    container_name: tuzonapcgamer-backend
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/mydatabase
      SPRING_DATASOURCE_USERNAME: myuser
      SPRING_DATASOURCE_PASSWORD: mypassword

  frontend:
    build:
      context: ./web/tuzonapcgamerweb
    container_name: tuzonapcgamer-frontend
    ports:
      - "3000:3000"
```
Ejecuta el stack con:

docker-compose up --build

Opción 3: Base de datos en el host (fuera de Docker)
Si tu base de datos PostgreSQL corre fuera de Docker (en el host local), para que el backend dentro del contenedor acceda a la base de datos:

Añade en el docker-compose.yml del backend esta línea para mapear el host:

extra_hosts:
```
  - "host.docker.internal:host-gateway"
```

Configura la conexión en application.properties o mediante variables de entorno así:
```
spring.datasource.url=jdbc:postgresql://host.docker.internal:5432/mydatabase
spring.datasource.username=myuser
spring.datasource.password=mypassword
```

O vía variables de entorno en el servicio backend del docker-compose.yml:

environment:
```
  SPRING_DATASOURCE_URL: jdbc:postgresql://host.docker.internal:5432/mydatabase
  SPRING_DATASOURCE_USERNAME: myuser
  SPRING_DATASOURCE_PASSWORD: mypassword
```
Frontend (Next.js)
Cómo ejecutar el frontend
Localmente
```
cd web/tuzonapcgamerweb
npm install
npm run dev
```