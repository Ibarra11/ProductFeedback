/*
  Warnings:

  - A unique constraint covering the columns `[post_fk_id,user_fk_id]` on the table `Upvotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Upvotes_post_fk_id_user_fk_id_key" ON "Upvotes"("post_fk_id", "user_fk_id");
