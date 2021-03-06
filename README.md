# Edinbros

A social marketplace for services in your neighbourhood. Made during the hackathon CodeTheCity 4 in Edinbourgh, Scotland.

![](http://i.imgur.com/y2gNKYi.png)

## Stack
* Node.js/Express as a RESTful API
* MongoDB as the database
* AngularJS for the frontend
* Material Angular as CSS framework
* Socket.io for real-time communications
* JWT for authentication

##Running the frontend

1. Go into the ```/frontend``` folder, using your favorite command line tool.
2. In your command line, execute ```bower install``` and ```npm install``` to install all the necessary dependencies.
3. In your command line, execute ```grunt serve``` to start the frontend
4. Go to [http://localhost:9000/](http://localhost:9000/) to access the frontend

##Running the backend

1. Install Node.js and the nodemon library (```npm install -g nodemon```)
2. Run MongoDB and change the values in ```config/settings.js``` according to your database settings.
3. In your command line, execute ```npm install``` to install all the necessary dependencies.
4. In your command line, execute ```nodemon app.js``` to run application
5. Go to [http://localhost:3000/api/{whatever api endpoint}](http://localhost:3000/api/{whatever api endpoint}) to access the backend