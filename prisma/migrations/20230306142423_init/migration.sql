-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "password_hash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_bal" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "pending_KYC" BOOLEAN NOT NULL DEFAULT false,
    "transaction_id" INTEGER,
    CONSTRAINT "User_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("account_bal", "account_no", "created_at", "email", "fullName", "isAdmin", "password_hash", "pending_KYC", "phoneNumber", "transaction_id", "verified") SELECT "account_bal", "account_no", "created_at", "email", "fullName", "isAdmin", "password_hash", "pending_KYC", "phoneNumber", "transaction_id", "verified" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_account_no_key" ON "User"("account_no");
CREATE UNIQUE INDEX "User_transaction_id_key" ON "User"("transaction_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
