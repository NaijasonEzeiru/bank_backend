-- CreateTable
CREATE TABLE "User" (
    "password_hash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_no" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "account_bal" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifying" BOOLEAN NOT NULL DEFAULT false,
    "pending_KYC" BOOLEAN NOT NULL DEFAULT false,
    "transaction_id" INTEGER,
    "verification_id" INTEGER,
    "currency" TEXT NOT NULL DEFAULT '$',
    CONSTRAINT "User_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_verification_id_fkey" FOREIGN KEY ("verification_id") REFERENCES "Verification" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "identity_doc" TEXT NOT NULL,
    "address_doc" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_no_key" ON "User"("account_no");

-- CreateIndex
CREATE UNIQUE INDEX "User_transaction_id_key" ON "User"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_verification_id_key" ON "User"("verification_id");
