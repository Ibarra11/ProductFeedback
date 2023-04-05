/*
  Warnings:

  - A unique constraint covering the columns `[post_id,user_fk_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_post_id_user_fk_id_key" ON "Post"("post_id", "user_fk_id");
