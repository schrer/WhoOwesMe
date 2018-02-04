/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbHandlerModule = require('./dbHandler.js');
var dbHandler = new dbHandlerModule.DBHandler("./oweme.db");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    res.send("Welcome to the API for WhoOwesMe!");
});

//Get all users
app.get("/users", function (req,res){
    var users = dbHandler.getAllUsers();
    if(users && users.length>0){
        res.json(users);
    } else {
        res.status(404).send("No users in database");
    }
});

//Get active users
app.get("/users/active", function (req,res){
    var users = dbHandler.getActiveUsers();
    if(users && users.length>0){
        res.json(users);
    } else {
        res.status(404).send("No active users in database");
    }
});

//Get single user by ID
app.get("/users/:id", function (req,res){
    var user = dbHandler.getSingleUser(req.params.id);
    if(user){
        res.json(user);
    } else {
        res.status(404).send("No user with this ID");
    }
});


app.post("/users", function (req,res){
    var name=req.body.name;
    dbHandler.addUser(name);
    res.status(200).send();
});

app.delete("/users/:id", function (req,res){
    dbHandler.deactivateUser(req.params.id);
    res.status(200).send("user deactivated");
});

app.put("/payments", function(req,res){
    var userId=req.body.userId;
    var amount=req.body.amount;
    dbHandler.addPayment(userId, amount);
    res.status(200).send();
});

app.delete("/payments/:id", function(req,res){
    dbHandler.deletePayment(req.params.id);
    res.status(200).send();
});


var server = app.listen(8086, function(){
    "use strict";
    var host=server.address().address;
    var port=server.address().port;
    console.log("WhoOwesMe Server listening at http://%s:%s",host,port);
});

