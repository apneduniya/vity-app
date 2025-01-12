/*
  Warnings:

  - You are about to drop the column `creatorId` on the `apps` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `apps` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "apps_creatorId_key";

-- AlterTable
ALTER TABLE "apps" DROP COLUMN "creatorId",
DROP COLUMN "verified";
