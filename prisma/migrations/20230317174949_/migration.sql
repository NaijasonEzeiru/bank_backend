-- CreateTable
CREATE TABLE "User" (
    "password_hash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_no" SERIAL NOT NULL,
    "account_bal" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "pending_KYC" BOOLEAN NOT NULL DEFAULT false,
    "transaction_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("account_no")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_no_key" ON "User"("account_no");

-- CreateIndex
CREATE UNIQUE INDEX "User_transaction_id_key" ON "User"("transaction_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
