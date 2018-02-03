/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */


var sqlite3 = require('sqlite3').verbose();
var exec = require('child_process').exec;
var db;





module.exports = {
    init:init,
    addUser:addUser,
    getAllUsers:getAllUsers,
    getActiveUsers:getActiveUsers,
    getSingleUser:getSingleUser,
    addPayment:addPayment,
    addDebt:addDebt
};


function init(){

    var dbPath = './oweme.db';
    var createSqlPath = "./resources/sql/create.sql";
    exec("sqlite3 "+dbPath+" < "+createSqlPath, function(err,stdout,stderr){
        if(err){
            console.error(err);
        }
        if(stderr){
            console.error(stderr);
        }
        if(stdout){
            console.log(stdout);
        }
    });
    console.log("Database created or already existing.");


    db = new sqlite3.Database(dbPath, function(err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Connected to the database.');
        }
    });
}

function addUser(name){
    var stmt = db.prepare("INSERT INTO users (name) VALUES (?)");
    stmt.run(name, function(err){
        if(err) {
            console.error(err);
        }
    });
    return true;
}

function getActiveUsers() {
    var users = [];
    db.each("SELECT * FROM users WHERE active=1", function(err, row){
        if(err){
            console.error(err);
            return null;
        }
        var newUser={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};
        users.push(newUser);
    });

    return users;
}

function getAllUsers(){
    var users = [];
    db.each("SELECT * FROM users", function(err, row){
        if(err){
            console.error(err);
            return null;
        }
        var newUser={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};
        users.push(newUser);
    });

    return users;
}

function deactivateUser(userId){

}

function getSingleUser(userId) {
    var user=null;
    var stmt=db.prepare("SELECT * FROM users WHERE userId=?");
    stmt.get(userId, function (err,row) {
        if(err){
            console.error(err);
            return null;
        }
        user={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};
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