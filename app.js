var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dnDtest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});

var characterSchema = mongoose.Schema({
    name: String,
    str: Number,
    dex: Number,
    con: Number,
});

var Character = mongoose.model('Character', characterSchema);

var fluffy = new Character({ name: 'fluffy', str:16,dex:17,con:16 });
fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
});