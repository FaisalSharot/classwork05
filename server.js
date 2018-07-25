  var http = require('http');
  var express = require('express');
  var bodyParser = require('body-parser');
  var mongo = require('mongodb');
  
  var db, uri =  "mongodb://+process.env.IP+":27017";
  
  mongo.MOngoClient.connect(uri,
        {usernewUrlParser: true},
          function(err,client){
            if(err){
              console.log("could not connect MongoDB");
              
            }else{
              db=client.db('simple-node');
            }
          });
  var save = function(form_data){
    db.createCollection ('users', function (err,collection){});
    var collection = db.collection('users');
    collection.save(form_data);
  
  };
  var app = express();
  var server = http.Server(app);
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
  });
  app.get('/about', function(req, res){
    res.sendFile(__dirname+'/about.html');
  });
  app.get('/form', function(req, res){
    res.sendFile(__dirname+'/form.html');
  });
  app.post('/submit_user', function(req, res){
    console.log(JSON.stringify(req.body));
    save(req.body);
    res.status();
  });
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });