var express = require('express'),
    crypto = require('crypto'),
    http = require('http'),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient;
    assert = require('assert');
    
var app = express();   
var path = require("path");  
var urlencodedParser = bodyParser.urlencoded({ extended: false });
console.log('inside module');

MongoClient.connect("mongodb://localhost:27017/", function(err, db) {

    if(err) throw err;
    dbs=db.db("optable1")
    console.log("Successfully connected to MongoDB.");

    app.get('/', function(req, res)
     {
        console.log("inside post");  
        res.sendFile(path.join(__dirname+'/opadvanced1.html'));
    });
   
    app.get('/Search.html', function(req, res)
     {
         
        console.log("inside search post");  
        var prasobh = 'prasobh';
        res.sendFile(path.join(__dirname+'/Search.html'),{name:prasobh});
    });

    app.get('/opadvanced1.html', function(req, res)
     {
        console.log("inside search post");  
        res.sendFile(path.join(__dirname+'/opadvanced1.html'));
    });
    app.post('/opstatus',urlencodedParser, function(req, res)
    { 
       var obj=req.body;
       console.log(obj);
      dbs.collection('project').insertOne(obj,function(err, docs)
       {
        console.log("insert sucess");
       })
       res.sendFile(path.join(__dirname+'/opadvanced2.html'));
   });

        var server = app.listen(8081, function() {
        var port = server.address().port;
        console.log("Express server listening on port %s.", port);
    });
});
