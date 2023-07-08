/*
  Warnings:

  - A unique constraint covering the columns `[id,user_id]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_id_user_id_key" ON "Post"("id", "user_id");
