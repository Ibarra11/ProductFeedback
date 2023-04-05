/*
  Warnings:

  - The values [FEATURE,ENHANCEMENT,BUG] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - The values [LIVE,IN_PROGRESS,PLANNED,SUGGESTION] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('Feature', 'UX', 'UI', 'Enhancement', 'Bug');
ALTER TABLE "Post" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

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
