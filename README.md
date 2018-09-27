
# Notes Application
![N|Solid](https://i.imgur.com/F5lvhxX.png)

NoteMaker is a simple application for taking notes powered by ReactJS and Django REST Framework.

### Setup Instructions

#### Backend
The NoteMaker requires [Python-2.7](https://www.python.org/download/releases/2.7/) to run.
Also make sure you have MySQL up and running.
Configure database credentials in settings file and create a database with the configured name.
Create a virtualenv to have an isolated working copy of Python.

Commands to setup backend application and start the server.

```sh
$ cd Backend
$ pip install -r requirements.txt
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```

To run the server on custom port.

```sh
$ python manage.py runserver 0.0.0.0:8000
```

#### Frontend
The Frontend requires [Node.js](https://nodejs.org/) v4+ to run.
Once you have and node and npm installed , install the dependencies and devDependencies and start the server.

```sh
$ cd Frontend
$ npm install
$ npm run dev
```

Now the clientside react server is running one is localhost:3000 and the second django-api application is live at localhost:8000.

You can visit the application by just going at http://localhost:3000/signin in your browser window.

*Note: This Application is tested on Chrome Browser (1440 x 2043) and might not be compatible with smaller screen browsers/phone browsers.*
