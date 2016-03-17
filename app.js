var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

//Populate database with the CSV
var loader = require('csv-load-sync');
var csv = loader('config/seed.csv');
var Area = mongoose.model('Areas');

if(loader){
  console.log("CSV Loaded.");
    Area.find({}).remove(function() {
      for(area in csv){
        Area.create({
          name : csv[area].name,
          generalCapacity: csv[area].generalCapacity,
          handicapCapacity: csv[area].handicapAvailable,
          generalAvailable: csv[area].generalAvailable,
          handicapAvailable: csv[area].handicapAvailable,
          priority: csv[area].priority,
        });
      }
    });
}

console.log("Database populated.");
