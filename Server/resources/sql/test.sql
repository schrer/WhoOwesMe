INSERT INTO users (name) VALUES ("Martin");
INSERT INTO users (name) VALUES ("Fabian");
INSERT INTO users (name) VALUES ("Michi");

.print "Intial user-table"
SELECT * FROM users;

INSERT INTO payments (userId, amount) VALUES (1,100);
INSERT INTO payments (userId, amount) VALUES (1,120);
INSERT INTO payments (userId, amount) VALUES (1,10);
INSERT INTO payments (userId, amount) VALUES (1,156);
 
INSERT INTO debts (debtor, lender, amount) VALUES (2,1, 80);
INSERT INTO debts (debtor, lender, amount) VALUES (2,1, 40);
INSERT INTO debts (debtor, lender, amount) VALUES (3,1, 80);

.print "All tables after inserts"
SELECT * FROM payments;
SELECT * FROM debts;
SELECT * FROM users;

DELETE FROM payments WHERE paymentId=1;
DELETE FROM debts WHERE debtId=1;
DELETE FROM debts WHERE debtId=3;

.print "All tables after deletes"
SELECT * FROM payments;
SELECT * FROM users;
