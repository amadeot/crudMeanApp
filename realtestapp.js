var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');

var db;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = 'mongodb://localhost:27017/test';
MongoClient.connect(mongoUrl, function(err, database){
  if (err){throw err;}
  db = database;
  process.on('exit', db.close);
})

app.get('/', function(req, res){
  res.render('index')
})

app.get('/api/people', function(req, res){
  db.collection('test_data').find().toArray(function(err, results){
    console.log(results);
    res.json(results)
  })
})

app.post('/api/people', function(req, res){
  console.log(req.body);
  var newPerson = req.body;
  db.collection('test_data').insert(newPerson, function(err, result){
      console.log(result)
      res.json(newPerson)
  })
})

app.listen(process.env.PORT || 3000);