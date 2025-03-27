# Client Task App

## Overview
Client Task App is a task management system designed for teams and allows team work-leads and staff to efficiently create, assign, and track tasks. The app includes authentication, role-based access, task filtering, and progress tracking. 

## Features
-  **Authentication** – Users can sign in with their email.
-  **Role-based Access** – Work-leads can manage tasks and staff, staff can view and complete tasks.
-  **Task Management** – Create, assign, update, and delete tasks.
-  **Progress Tracking** – View task completion rates with progress bars.
-  **Filtering & Search** – Filter tasks by status, deadline, and assignee.

## User Roles
### Work-lead
- Can create, assign, edit, and delete tasks.
- Can manage staff (add/remove users, set roles).
- Has access to task metrics and analytics.

### Staff
- Can view assigned tasks.
- Can mark tasks as complete.
- Can filter tasks by status and deadline.

## Tech Stack

**Frontend**: Next.js, React, Redux, Tailwind CSS

**Backend**: Node.js, Express.js

**Database**: PostgreSQL

**Authentication**: JWT

**Testing**: Jest for API testing, Playwright for e2e testing

## Installation
### Make sure you have the following
- Node.js & npm
- PostgreSQL database

## Setup
### Clone the repository
```sh
git clone https://github.com/yourusername/client_task_app.git
cd client_task_app
```

### Install dependencies
```sh
npm install
```

### Set up environment variables
```sh
cp .env.example .env
# Edit .env with your database and auth credentials
# EXAMPLE .env FILE
JWT_SECRET = your_jwt_secret
DATABASE_URL=postgresql://your:database@localhost:5432/yourdatabase
POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_USER = your
POSTGRES_PASSWORD= database
POSTGRES_DATABASE= yourdatabase
```


### Run database migrations and seed work-lead(s) for login

Go to seeders folder, find the only file in there for seeding work leads, and add your worklead profile:
```sh
await queryInterface.bulkInsert('Users', [
    {
      id: 10000,
      useremail: "tm@gmail.com",
      role: "worklead",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
    // insert workleads here, recommend setting the ID to a high value
    },

   ], {})
```
to run migrations, ensure Sequelize is installed, and enter the commands
```sh
cd src/lib/db
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
### Start the development server
```sh
npm run dev
```

## Testing
### API tests
API routes are tested using JEST, to run the tests ensure that JEST is installed, then in the command line type:
```sh
npm test
```

### End to End Testing
UI and end-to-end testing is done with Playwright, to run the tests, ensure Playwright is installed and in command line type:
```sh
npx playwright test
```
To run these tests in Playwright UI mode, type:
```sh
npx playwright test --ui
```


## Docker Deployment

A Dockerfile and docker-compose.yaml are provided for containerization.
### Build the Docker Image
```sh
docker build -t client_task_app .
```
### Run the Container
```sh
docker-compose up
```

