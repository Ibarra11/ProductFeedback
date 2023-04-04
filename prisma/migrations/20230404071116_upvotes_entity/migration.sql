/*
  Warnings:

  - You are about to drop the column `upvotes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "upvotes";

-- CreateTable
CREATE TABLE "Upvotes" (
    "upvote_id" SERIAL NOT NULL,
    "state" BOOLEAN NOT NULL,
    "post_fk_id" INTEGER NOT NULL,
    "user_fk_id" INTEGER NOT NULL,

    CONSTRAINT "Upvotes_pkey" PRIMARY KEY ("upvote_id")
);

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_post_fk_id_fkey" FOREIGN KEY ("post_fk_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvotes" ADD CONSTRAINT "Upvotes_user_fk_id_fkey" FOREIGN KEY ("user_fk_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
