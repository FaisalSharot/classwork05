  var http = require('http');
  var express = require('express');
  var bodyParser = require('body-parser');
  var mongo = require('mongodb');
  var mongoose = require('mongoose');
  
  //var db, uri =  "mongodb://"+process.env.IP+":27017";
  mongoose.connect("mongodb://"+process.env.IP+":27017");
 /* 
  mongo.MongoClient.connect(uri,
        {userNewUrlParser: true},
          function(err,client){
            if(err){
              console.log("could not connect MongoDB");
              
            }else{
              db=client.db('simple-node');
            }
          });
  
  */
 mongoose.connection.on('error',function(){
   console.log('Could not connect to mongodb');
 });
  var userSchema = new mongoose.Schema({
  
    name: String,
    email:  String
   
    
    });
  var User = mongoose.model('User',userSchema);
/*
  var save = function(form_data){
    db.createCollection ('users', function (err,collection){});
    var collection = db.collection('users');
    collection.save(form_data);
  
  };
  */
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
    var new_user = new User(req.body);
    new_user.save(function(err,data){
      if (err)
        return res.status(400)
        .json({message:"could not save user"});
        res.status(200).json;
    });
  //  save(req.body);
      res.status();
  });
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });