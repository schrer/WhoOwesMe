/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */


let sqlite3 = require('sqlite3').verbose();
let exec = require('child_process').exec;
let db;

class DBHandler {

    constructor (dbPath){
        let createSqlPath = "./resources/sql/create.sql";
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


        this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err) {
            if (err) {
                console.error("Error: "+err.message);
            } else {
                console.log('Connected to the database.');
            }
        });
    }


    addUser(name){
        let stmt = this.db.prepare("INSERT INTO users (name) VALUES (?)");
        stmt.run(name, function(err){
            if(err) {
                console.error(err);
            }
        });
    }

    getActiveUsers() {
        let users = [];
        this.db.each("SELECT * FROM users WHERE active=1", function(err, row){
            if(err){
                console.error(err);
            }
            let newUser={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};
            users.push(newUser);
        });

        return users;
    }

    getAllUsers(){
        let users = [];
        this.db.each("SELECT * FROM users", function(err, row){
            if(err){
                console.error(err);
                return null;
            }
            let newUser={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};
            users.push(newUser);
        });

        return users;
    }

    deactivateUser(userId){
        let stmt = this.db.prepare("UPDATE users SET active=0 WHERE userId=?");
        stmt.run(userId, function(err){
            if(err) {
                console.error(err);
            }
        });
    }

    activateUser(userId){
        let stmt = this.db.prepare("UPDATE users SET active=1 WHERE userId=?");
        stmt.run(userId, function(err){
            if(err) {
                console.error(err);
            }
        });
    }

    SingleUser(userId) {
        let user=null;
        let stmt= this.db.prepare("SELECT * FROM users WHERE userId=?");
        stmt.get(userId, function (err,row) {
            if(err){
                console.error(err);
                return null;
            }
            user={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};
        });
        return user;
    }


    addPayment(userId,amount){
        let stmt= this.db.prepare("INSERT INTO payments (userId,amount) VALUES (?,?)");
        stmt.run(userId,amount, function(err){
            if(err){
                console.error(err);
                return false;
            }
        });
    }

    deletePayment(paymentId){
        let stmt= this.db.prepare("DELETE FROM users WHERE paymentId=?");
        stmt.run(paymentId, function(err){
            if(err){
                console.error(err);
                return false;
            }
        });
    }

    addDebt(debtorId,lenderId,amount){
        let stmt= this.db.prepare("INSERT INTO debts (debtor,lender,amount) VALUES (?,?,?)");
        stmt.run(debtorId,lenderId,amount, function(err){
            if(err){
                console.error(err);
                return false;
            }
        });
    }


    close(){
        this.db.close( function(err) {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}

module.exports = {
    DBHandler:DBHandler
};

