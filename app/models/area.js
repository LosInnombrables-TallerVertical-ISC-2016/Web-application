// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var AreaSchema = new Schema({
  name: String,
  generalCapacity: Number,
  handicapCapacity: Number,
  generalAvailable: Number,
  handicapAvailable: Number,
  priority: Number
});

AreaSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Areas', AreaSchema);
