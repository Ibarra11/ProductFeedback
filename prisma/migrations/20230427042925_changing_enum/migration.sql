/*
  Warnings:

  - The values [live,in_progress,planned,suggestion] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Live', 'In_Progress', 'Planned', 'Suggestion');
ALTER TABLE "Post" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'Suggestion';
COMMIT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'Suggestion';
