![Slogan](Slogan.png)
# Web-application

##Overview
A webpage that will use the administrators and users to see the status of the parking lots and cotrol the system.

An app for the admistrators where only us can make changes to the app or the webpage. If new areas are added to the parking lot, there should be added to the Mobile-Application by using the web-application.

When the administrators get usefull data from the users, like the most popular area, or the peak times where the parking lot is almost full, the app should evolve in order to make the user experience better. Maybe recommending areas for users that go to that area relativelly often, or in the necesary case, implement a new area.

In the backend side we have a *NodeJS* server created by the *Yeomn Moongose Generator*, that allows to deploy the web application with just typing ```npm install``` and the application will be set up. To run web app just type ```grunt```. *MongoDB* is used to storage and manage the data in the application and is connected with the *Mongoose* node. 

###Dependencies:
* NodeJS
* NPM
* MongoDB
* Mongoose
* Grunt/Gulp

![Gitter](https://nodei.co/npm/generator-mongoose.png?downloads=true&stars=true)

Moongose Generator: https://github.com/afj176/generator-mongoose

##Diagram

![WebApp Diagram](WebAppDiagram.png)


##Directory Structure

The directories are organized in this way:

```
.bowerrc
.editorconfig
.jshintrc
config/                               //Directory for server configuration files.
  - db.js
public/                               //Directory for the frontend files (HTML, CSS, JS, ...).
  css/  
     - style.css
  js/  
     - script.js

app/                                  //Directory for the app files.
  models/                             //Data models for the database.
      - post.js
  routes/                             //Routes configuration files.
    - index.js
    - post.js
  views/                              //Views that are compiled by Jade.
    - index.jade
bower.json
Gruntfile.js
package.json
Readme.md
```

##User views

####Main view
#####file: index.html
This view is just a welcome page of the applicaction. In the left parent we can find some options to acces in the webapp with specifiq feautures. It doesn't have an specifiq content because is supposed to be personalized by the user.

####Parking Stadistics view
#####file: charts.html
It contains visualizations for the parking stats in the time.

####Parking Status view
#####file: tables.html
In this view the status of the parking lots are displayed.

####Upload CSV view
#####file: FileUpload.html
Here the user can select and upload a CSV file to populate the database. The file must contain: [Parking lot name, number of parking space, state] where State is a boolean value (0 for occupied space and 1 for a free space).
A preview of the data is displayed to the user before of populate the database. If there are not errors a notification of success will be displayed.

##Backend details

###Database model 

This is the structure of the data that the database store, it is available in the ```Area.js``` file.
```javascript
var AreaSchema = new Schema({
  name: String,
  generalCapacity: Number,
  handicapCapacity: Number,
  generalAvailable: Number,
  handicapAvailable: Number,
  priority: Number
});

```
* *name* The name of the parking lot area.
* *generalCapacity* The quantity of spaces to park in the parking lot area that are for the general public.
* *handicapCapacity* The quantity of spaces for people (that have some disability) in the parking lot area.
* *generalAvailable* The quantity of free spaces for the general public in the parking lot area.
* *handicapAvailable* The quantity of free spaces for people that have some disability.
* *priority* It is the priority of the parking lot area expressed in positive integers. The smaller is the number more the priority will be. The priority will be the way that the recommendation are done.

##API methods

The API methods are available in the *app/controllers/home.js* file.

######Methods:
* **router.get('/', function (req, res, next) {}**: Returns the desired view to the client.
* **router.route('/api').put(function(req, res){}**: Edits an object to the database.
* **router.route('/api/').get(function(req, res){}**: Returns a JSON array with the data stored in the database to the client.
* **router.route('/api/').post(function(req, res){}**: Creates an object in the database specified by the client.
* **router.route('/api/').post(function(req, res){}**: Deletes a resourse of the database specified by the client.
* **var resetCounter = function(req, query, res){}**: A callback function that reset a value in specified resource in the database to his default number. It's used to book and space in the parking lot.
* **router.route('/mobile').put(function(req, res){}**: A put method for the mobile app. It books a space in the parking lot temporaly.
* **router.post('/api/seed', function(req, res){}**: A post method that is used to populate the database.
* **router.route('/testPUT').put(function(req, res){}**: It edits a specifiq priority of a resource in the database.







