/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */

var express = require('express');
var app = express();
var dbHandler = require('./dbHandler.js');

dbHandler.init();




var server = app.listen(8086, function(){
    "use strict";
    var host=server.address().address;
    var port=server.address().port;
    console.log("WhoOwesMe Server listening at http://%s:%s",host,port);
});

