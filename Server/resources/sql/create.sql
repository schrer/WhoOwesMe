CREATE TABLE IF NOT EXISTS users(
    userId INTEGER PRIMARY KEY, 
    name TEXT NOT NULL UNIQUE, 
    purchaseSum INTEGER DEFAULT 0, 
    debtSum INTEGER DEFAULT 0,
    CHECK(debtSum>=0),
    CHECK(purchaseSum>=0)
);

CREATE TABLE IF NOT EXISTS payments(
    paymentId INTEGER PRIMARY KEY, 
    userId INTEGER NOT NULL,
    amount INTEGER DEFAULT 0,
    FOREIGN KEY(userId) REFERENCES users(userId),
    CHECK(amount>=0)
);

CREATE TABLE IF NOT EXISTS debts(
    debtId INTEGER PRIMARY KEY,
    debtor INTEGER NOT NULL,
    lender INTEGER NOT NULL,
    amount INTEGER DEFAULT 0,
    FOREIGN KEY(debtor) REFERENCES users(userId),
    FOREIGN KEY(lender) REFERENCES users(userId),
    CHECK(amount>=0)
);


CREATE TRIGGER IF NOT EXISTS calc_purchase_sum_insert
    AFTER INSERT ON payments
    BEGIN
        UPDATE users SET purchaseSum=purchaseSum+new.amount WHERE userId = new.userId;
    END;
    
CREATE TRIGGER IF NOT EXISTS calc_purchase_sum_delete
    AFTER DELETE ON payments
    BEGIN
        UPDATE users SET purchaseSum=purchaseSum-old.amount WHERE userId = old.userId;
    END;



CREATE TRIGGER IF NOT EXISTS calc_debt_sum_insert
    AFTER INSERT ON debts
    BEGIN
        UPDATE users SET debtSum=debtSum+new.amount WHERE userId = new.debtor;
    END;
    
CREATE TRIGGER IF NOT EXISTS calc_debt_sum_delete
    AFTER DELETE ON debts
    BEGIN
        UPDATE users SET debtSum=debtSum-old.amount WHERE userId = old.debtor;
    END;
