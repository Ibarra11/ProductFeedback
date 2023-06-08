/*
  Warnings:

  - You are about to drop the column `setup` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "setup";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "newUser" BOOLEAN NOT NULL DEFAULT false;
