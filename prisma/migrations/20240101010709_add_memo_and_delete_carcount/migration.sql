/*
  Warnings:

  - You are about to drop the column `carCount` on the `Taxi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Taxi" DROP COLUMN "carCount",
ADD COLUMN     "memo" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "peopleCount" DROP NOT NULL;
