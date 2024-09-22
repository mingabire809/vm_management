Requirements
Before setting up the project, ensure that you have the following tools installed:

PHP 8.x
Composer
Laravel 9.x
PostgreSQL
Node.js with NPM or Yarn
Git
A web server (Apache, Nginx, or Laravel's built-in server)
[Optional] Redis for caching and queues
[Optional] Docker (for containerized setup)


git clone https://github.com/your-username/your-repository.git
cd your-repository

Install dependencies:

Install PHP dependencies using Composer:


composer install

Install JavaScript dependencies using NPM or Yarn:


npm install
Set up environment file:

Create a .env file by copying the example file:


cp .env.example .env
Generate application key:

Laravel requires an application key to be generated. Run the following command to generate it:


php artisan key:generate

Configuration
Database configuration:

Update the .env file with your PostgreSQL database credentials:

env
Copy code
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your-database-name
DB_USERNAME=your-username
DB_PASSWORD=your-password

If you don't have a PostgreSQL database set up, create one:


psql -U postgres
CREATE DATABASE your_database_name;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;
Run database migrations:

To set up the database structure, run the following migration command:


php artisan migrate
Set up file storage (optional):


php artisan storage:link
Run database seeders (optional):

To populate your database with initial data, run the following:


php artisan db:seed

It contains some random users, but there is the admin user which is:  admin@careldevstudio.com/Admin.12

Running the Application
To run the application in a local development environment, follow these steps:

Start the local development server:


php artisan serve

By default, the application will be accessible at http://127.0.0.1:8000.

Run frontend development server:

npm run dev

To run socket which is the one enabling notifications:

php artisan reverb:start
php artisan queue:listen


Testing
This project includes automated tests. To run the tests, follow these steps:

Set up the test environment:

Ensure the .env.testing file is configured with the correct database and other environment variables:

env
Copy code
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=your_testing_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

You can create a separate PostgreSQL database for testing:



Use the following command to run all the tests:


php artisan test

