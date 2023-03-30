-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_fk_id_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_fk_id_fkey" FOREIGN KEY ("post_fk_id") REFERENCES "Post"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
