# Task Management Application

This is a task management application built with Node.js, Express, Sequelize (with PostgreSQL), and JWT authentication.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine (v14.x or higher)
- npm (Node Package Manager) installed
- PostgreSQL installed and running
- `npx` (comes with npm v5.2.0 and higher)

## Installation

1. **Clone the repository:**

2. **Install dependencies:**
    npm install

3. **Configure the environment variables:**

    PORT=3000
    JWT_SECRET=your_jwt_secret

4. **Set up the database:**
    Ensure PostgreSQL is running.
    Create the database (if it doesn't already exist)
    Run the migrations:
        npx sequelize-cli db:migrate
    Seed the database :
        npx sequelize-cli db:seed:all
    Start the server:    
        node app.js
    


