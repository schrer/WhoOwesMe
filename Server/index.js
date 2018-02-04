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
    res.header('Access-Control-Allow-Origin', '*');
    var users = dbHandler.getAllUsers();
    if(users && users.length>0){
        res.json(users);
    } else {
        res.status(404).send("No users in database");
    }
});

//Get active users
app.get("/users/active", function (req,res){
    res.header('Access-Control-Allow-Origin', '*');
    var users = dbHandler.getActiveUsers();
    if(users && users.length>0){
        res.json(users);
    } else {
        res.status(404).send("No active users in database");
    }
});

//Get single user by ID
app.get("/users/:id", function (req,res){
    res.header('Access-Control-Allow-Origin', '*');
    var user = dbHandler.getSingleUser(req.params.id);
    if(user){
        res.json(user);
    } else {
        res.status(404).send("No user with this ID");
    }
});


app.post("/users", function (req,res){
    res.header('Access-Control-Allow-Origin', '*');
    var name=req.body.name;
    dbHandler.addUser(name);
    res.status(200).send();
});

app.delete("/users/:id", function (req,res){
    res.header('Access-Control-Allow-Origin', '*');
    dbHandler.deactivateUser(req.params.id);
    res.status(200).send("user deactivated");
});

app.put("/payments", function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    var userId=req.body.userId;
    var amount=req.body.amount;
    dbHandler.addPayment(userId, amount);
    res.status(200).send();
});

app.delete("/payments/:id", function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    dbHandler.deletePayment(req.params.id);
    res.status(200).send();
});

app.put("/debts",function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    let debtor=req.body.debtor;
    let lender=req.body.lender;
    let amount=req.body.amount;
    dbHandler.addDebt(debtor,lender,amount);
    res.status(200).send();
});

app.post("users/activate", function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    dbHandler.activateUser(req.body.id);
    res.status(200).send();
});

app.post("users/deactivate", function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    dbHandler.deactivateUser(req.body.id);
    res.status(200).send();
});


var server = app.listen(8086, function(){
    "use strict";
    var host=server.address().address;
    var port=server.address().port;
    console.log("WhoOwesMe Server listening at http://%s:%s",host,port);
});

