/*
  Warnings:

  - The primary key for the `Upvotes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `upvote_id` on the `Upvotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Upvotes" DROP CONSTRAINT "Upvotes_pkey",
DROP COLUMN "upvote_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Upvotes_pkey" PRIMARY KEY ("id");
