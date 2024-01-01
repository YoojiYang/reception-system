/*
  Warnings:

  - You are about to drop the column `cancelCount` on the `Taxi` table. All the data in the column will be lost.
  - You are about to drop the column `completedCount` on the `Taxi` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Taxi_roomId_key";

-- AlterTable
ALTER TABLE "Taxi" DROP COLUMN "cancelCount",
DROP COLUMN "completedCount",
ADD COLUMN     "isCancel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
