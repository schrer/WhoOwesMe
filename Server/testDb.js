/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var dbHandler = require('./dbHandler.js');

dbHandler.init();

var addU1=dbHandler.addUser("Martin");
var addU2=dbHandler.addUser("Fabian");

var addP=dbHandler.addPayment(1,15);
var addD=dbHandler.addDebt(2,15);

console.log("addU1: %s, addU2: %s, addP: %s, addD:%s",addU1,addU2,addP,addD);

var users=dbHandler.getAllUsers();
console.log("users:\n"+users.toString());

var user1=dbHandler.getSingleUser(1);
console.log("user1:"+user1.toString());

dbHandler.close();

/*var server = app.listen(8086, function(){
    "use strict";
    var host=server.address().address;
    var port=server.address().port;
    console.log("WhoOwesMe Server listening at http://%s:%s",host,port);
});*/