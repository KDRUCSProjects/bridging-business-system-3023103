
# Setup the development environment

1. clone the project with git clone git@github.com:KDRUCSProjects/bridging-business-system-3023103.git.
2. Open the project folder in vscode. and open terminal in vscode and follow the instructions below

# Backend setup

3. create virtual environment with python3 -m venv venv

4. activate the virtual environment with source venv/bin/activate in the terminal.
5. type python manage.py migrate to apply migrations to the database. # for now it is not working.

6. type python manage.py runserver should run the the backend without any error.
