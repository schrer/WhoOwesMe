/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */


var sqlite3 = require('sqlite3');
var db;





module.exports = {
    init:init,
    addUser:addUser,
    getUsers:getUsers,
    getSingleUser:getSingleUser,
    addPayment:addPayment,
    addDebt:addDebt
};

function init(){
    db = new sqlite3.Database('./oweme.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , function(err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Connected to the database.');
        }
    });

    var fs=require('fs');
    fs.readFile('./resources/sql/create.sql', function(err,data){
        if(err){
            console.error(err);
        }

        //console.log("data:"+data);
        db.serialize(function() {
            db.run(data.toString());
    });
    });
}

function addUser(name){
    var stmt = db.prepare("INSERT INTO users (name) VALUES (?)");
    stmt.run(name, function(err){
        if(err){
            console.error(err);
            return false;
        }
    });
    console.log("Success adding");
    return true;
}

function getUsers(){
    var users = [];
    db.each("SELECT * FROM users", function(err, row){
        if(err){
            console.error(err);
            return null;
        }
        var newUser={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum};
        users.push(newUser);
    });

    return users;
}

function getSingleUser(userId) {
    var user=null;
    var stmt=db.prepare("SELECT * FROM users WHERE userId=?");
    stmt.get(userId, function (err,row) {
        if(err){
            console.error(err);
            return null;
        }
        user={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum};
    });
    return user;
}


function addPayment(userId,amount){
    var stmt=db.prepare("INSERT INTO payments (userId,amount) VALUES (?,?)");
    stmt.run(userId,amount, function(err){
        if(err){
            console.error(err);
            return false;
        }
    });
}

function addDebt(debtorId,lenderId,amount){
    var stmt=db.prepare("INSERT INTO debts (debtor,lender,amount) VALUES (?,?,?)");
    stmt.run(debtorId,lenderId,amount, function(err){
        if(err){
            console.error(err);
            return false;
        }
    });
}


function close(){
    db.close( function(err) {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}