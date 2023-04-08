/*
  Warnings:

  - You are about to drop the `Replies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_commentComment_id_fkey";

-- DropForeignKey
ALTER TABLE "_replies" DROP CONSTRAINT "_replies_A_fkey";

-- DropForeignKey
ALTER TABLE "_replies" DROP CONSTRAINT "_replies_B_fkey";

-- DropTable
DROP TABLE "Replies";

-- AddForeignKey
ALTER TABLE "_replies" ADD CONSTRAINT "_replies_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("comment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_replies" ADD CONSTRAINT "_replies_B_fkey" FOREIGN KEY ("B") REFERENCES "Comment"("comment_id") ON DELETE CASCADE ON UPDATE CASCADE;
