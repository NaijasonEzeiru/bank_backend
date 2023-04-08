/*
  Warnings:

  - A unique constraint covering the columns `[verification_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verification_id" INTEGER,
ADD COLUMN     "verifying" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Verification" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "identity_doc" TEXT NOT NULL,
    "address_doc" TEXT NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_verification_id_key" ON "User"("verification_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_verification_id_fkey" FOREIGN KEY ("verification_id") REFERENCES "Verification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
