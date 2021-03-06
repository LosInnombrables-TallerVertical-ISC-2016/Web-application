var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Area = mongoose.model('Areas');

var multer  = require('multer');
var upload = multer({ dest: 'app/uploads/' });



module.exports = function (app) {
  app.use('/', router);
};


//API: http
//GET method
router.get('/', function (req, res, next) {
  Area.find(function (err, Areas) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      Areas: Areas
    });
  });
});

// API: /api
//PUT  method
router.route('/api').put(function(req, res){
  console.log("Buscando: " + req.body.name);
  console.log("General Available:" + req.body.generalAvailable);
  var query = {name: req.body.name};
  Area.findOne(query, function (err, area) {
    if(err){
      return res.status(404).send(err);
    }

    if(!area){
      return res.status(404);
    }

    if(req.body.handicapAvailable == null || (area.handicapCapacity == area.handicapAvailable && req.body.handicapAvailable > 0) ||
        (area.handicapAvailable == 0 && req.body.handicapAvailable < 0) ){
      console.log("null handicap");
      req.body.handicapAvailable = 0;
    }

    if(req.body.generalAvailable == null || (area.generalCapacity == area.generalAvailable && req.body.generalAvailable > 0) ||
        (area.generalAvailable == 0 && req.body.generalAvailable < 0)){
      console.log("null general");
      req.body.generalAvailable = 0;
    }

    var update = { $inc: {generalAvailable: req.body.generalAvailable,
                          handicapAvailable: req.body.handicapAvailable}
                 };
    var options = {new: true};

    Area.findOneAndUpdate(query, update, options, function(err, doc) {
      if (err) {
        console.log('got an error');
        return res.status(500).send(err);
      }
      return res.status(200).send(doc);
    });
  });
});

//GET method
router.route('/api/').get(function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  Area.find(function(err, movies){
    if(err){
      return res.status(500).send(err);
    }

    return res.json(movies);
  });
});

//POST method
router.route('/api/').post(function(req, res){
  Area.create(req.body, function(err, Area){
    if(err){
      return handleError(res, err);
    }
    return res.status(201).json(Area);
  });
});

//DELETE
router.route('/api/').delete(function(req, res){
  //WARNING: use clean database just in development enviroment
  if(req.body._id == "clean database"){
    Area.find({}).remove(function() { return res.status(200).send("Database cleaned")});
  }
  Area.findById(req.body._id, function(err, movie){
      if(err){
        return
      }
      if(!movie){
        return res.status(204).send('Key ' + req.body._id + ' already deleted.');
      }
      Area.remove(req.body, function(err){
        if(err){
          return res.status(500).send(err);
        }
        return res.status(200).send('Key ' + req.body._id + ' deleted.');
      });
  });
});


//API: /mobile

//PUT TIMEOUT method
var resetCounter = function(req, query, res){
  console.log("Booking expired.");
  update = { $inc: {generalAvailable: -1* req.body.generalAvailable,
                        handicapAvailable: -1 * req.body.handicapAvailable}
               };
  var options = {new: true};
  Area.findOneAndUpdate(query, update, options, function(err, doc) {
    if (err) {
      console.log('got an error');
    }
  });
}

router.route('/mobile').put(function(req, res){
  console.log("Buscando: " + req.body.name);
  var query = {name: req.body.name};
  Area.findOne(query, function (err, area) {
    if(err){
      return res.status(404).send(err);
    }

    if(!area){
      return res.status(404);
    }

    if(req.body.handicapAvailable == null || (area.handicapCapacity == area.handicapAvailable && req.body.handicapAvailable > 0) ||
        (area.handicapAvailable == 0 && req.body.handicapAvailable < 0) ){
      console.log("null handicap");
      req.body.handicapAvailable = 0;
    }

    if(req.body.generalAvailable == null || (area.generalCapacity == area.generalAvailable && req.body.generalAvailable > 0) ||
        (area.generalAvailable == 0 && req.body.generalAvailable < 0)){
      console.log("null general");
      req.body.generalAvailable = 0;
    }

    var update = { $inc: {generalAvailable: req.body.generalAvailable,
                          handicapAvailable: req.body.handicapAvailable}
                 };
    var options = {new: true};

    Area.findOneAndUpdate(query, update, options, function(err, doc) {
      if (err) {
        console.log('got an error');
        return res.status(500).send(err);
      }
      console.log("Booking a temporaly place...");
      setTimeout(resetCounter, 60000, req, query, res);
      return res.status(200).send(doc);
    });
  });
});


//API: /seed
router.post('/api/seed', function(req, res){
  console.log(req.body.data);
  data = JSON.parse(req.body.data);
  for(var i = 0; i < data.length; i++){
    Area.create(data[i], function(err, Area){
      if(err){
        return handleError(res, err);
      }
    });
  }
  return res.status(200).json(Area);

});

//METHODS IN TESTING
router.route('/testPUT').put(function(req, res){
  console.log("Buscando: " + req.body.name);
  var query = {name: req.body.name};
  var update = {
                 name: req.body.name,
                 generalAvailable: req.body.generalAvailable,
                 handicapAvailable: req.body.handicapAvailable,
                 generalCapacity: req.body.generalCapacity,
                 handicapCapacity: req.body.handicapCapacity
               };

  var options = {};
  Area.update(query, update, options, function(err, doc) {
    if (err) {
      console.log('got an error');
      return res.status(500).send(err);
    }
    return res.status(200).send(doc);
  });
});
