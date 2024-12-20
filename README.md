# Surya Digital Teknologi Birthday Backend

Backend services of Surya Digital Teknologi Asessment

## Directory architecture

Directory architecture of backend services

- config => Handle for configuration of application and databases.
- controller => Handle for presentation layer.
- core => Handle for configuration of Express instances.
- entities => Handle for defining of models.
- middleware => Handle for custom middlware.
- repository => Handle for database query layer.
- service => Handle for bussiness logic application.
- routes => Handle routing endpoint.
- tests => Handling for unit tests. Bonus.
- utils => Handling for utility function.

## Technology

Technology for built application

```bash
- Express
- Dotenv
- Cors
- Prisma ORM
- PostgreSQL
- Geo-Tz
- Moment Timezone
- Node Cron
- Node Fetch
- Nodemon
- TS Node
- Typescript
```

## Database design

Database design of the backend application
![image](https://github.com/user-attachments/assets/4dc26e45-9b85-4dde-80f9-956d0b17bea4)


## Endpoint

Available endpoints on this application.

-- Fetch all Users

```bash
- URL : localhost:8000/api/users
- Method: GET
- Output: JSON
```

-- Fetch Users by ID

```bash
- URL : localhost:8000/api/users/:id
- Method: GET
- Output: JSON
```

-- Create Users

```bash
- URL : localhost:8000/api/users
- Method: POST
- Request Body: JSON
- Output: JSON
```

-- Update Users

```bash
- URL : localhost:8000/api/users/:id
- Method: PUT
- Request Body: JSON
- Output: JSON
```

-- Soft Delete Users by ID

```bash
- URL : localhost:8000/api/users/:id
- Method: DELETE
- Output: JSON
```

-- Fetch all Messages

```bash
- URL : localhost:8000/api/messages
- Method: GET
- Output: JSON
```
