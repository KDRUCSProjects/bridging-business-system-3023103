
# Setup the development environment

1. clone the project with git clone git@github.com:KDRUCSProjects/bridging-business-system-3023103.git.
2. Open the project folder in vscode. and open terminal in vscode and follow the instructions below

## Database setup
1. install "postgresql" RDBMS and Pgadmin for postgresql GUI.
2. create user as "business" with password "brdging@123"
3. create database as "Bridging-Businesses" and assign "business" as manager.

# Backend setup

3. create virtual environment with python3 -m venv venv

4. activate the virtual environment with source venv/bin/activate in the terminal.
5. install requirment.txt for installing required backend packges 
6. type python manage.py migrate to apply migrations to the database. # for now it is not working.

7. type python manage.py runserver should run the the backend without any error.

## Frontend setup
1. for installing frontend dependencies type "npm install"
2. for running  frontend server type "npm start" 




