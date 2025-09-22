# Driver-on-Demand (CRA frontend + Spring Boot backend)

## Run Backend
- Ensure Java 17+ and Maven are installed.
- Ensure PostgreSQL is running and a database `driverdb` exists (or change `application.properties`).
- From project root:
  ```bash
  cd backend
  mvn spring-boot:run
  ```
- Backend will listen on http://localhost:8080

## Run Frontend
  ```bash
  cd frontend
  npm install
  npm start
  ```
- Frontend will run on http://localhost:3000 and call backend APIs at /api.
