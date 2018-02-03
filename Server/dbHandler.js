/*jslint node: true */
/*jslint esversion: 6*/
/*jslint eqeqeq: true */


let Database = require('better-sqlite3');
let exec = require('child_process').exec;
let db;

class DBHandler {

    constructor (dbPath){
	let createSqlPath = "./resources/sql/create.sql";

	this.db = new Database(dbPath);

	let fs = require("fs");
	let createScript = fs.readFileSync(createSqlPath).toString();

	this.db.exec(createScript);
	

        console.log("Database created or already existing.");

	console.log('Connected to the database.');
    }


    addUser(name){
        let stmt = this.db.prepare("INSERT INTO users (name) VALUES (?)");
        stmt.run(name);
        
    }

    getActiveUsers() {
        let users = [];
	let userRows = this.db.prepare("SELECT * FROM users WHERE active=1").all();
	userRows.forEach((row)=>{
	    let newUser={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};
	    users.push(newUser);
	});

	return users;
    }

    getAllUsers(){
        let users = [];
        let userRows = this.db.prepare("SELECT * FROM users").all();
				
	userRows.forEach((row)=>{
	    let newUser={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};

	    users.push(newUser);
        });

        return users;
    }

    deactivateUser(userId){
        let stmt = this.db.prepare("UPDATE users SET active=0 WHERE userId=?");
        stmt.run(userId);
    }

    activateUser(userId){
        let stmt = this.db.prepare("UPDATE users SET active=1 WHERE userId=?");
        stmt.run(userId);
    }

    getSingleUser(userId) {
        let user=null;
        let stmt= this.db.prepare("SELECT * FROM users WHERE userId=?");
        let row = stmt.get(userId);
	user={userId:row.userId,name:row.name,purchaseSum:row.purchaseSum,debtSum:row.debtSum,active:row.active};
        return user;
    }


    addPayment(userId,amount){
        let stmt= this.db.prepare("INSERT INTO payments (userId,amount) VALUES (?,?)");
        stmt.run(userId,amount);
    }

    deletePayment(paymentId){
        let stmt= this.db.prepare("DELETE FROM payments WHERE paymentId=?");
        stmt.run(paymentId);
    }

    addDebt(debtorId,lenderId,amount){
        let stmt= this.db.prepare("INSERT INTO debts (debtor,lender,amount) VALUES (?,?,?)");
        stmt.run(debtorId,lenderId,amount);
    }


    close(){
	this.db.close();
    }
}

module.exports = {
    DBHandler:DBHandler
};

