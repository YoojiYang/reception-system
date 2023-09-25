/*
  Warnings:

  - You are about to drop the column `changedAdultsCount` on the `Arrival` table. All the data in the column will be lost.
  - You are about to drop the column `changedChildrenCount` on the `Arrival` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Arrival" DROP COLUMN "changedAdultsCount",
DROP COLUMN "changedChildrenCount";

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "changedAdultsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "changedChildrenCount" INTEGER NOT NULL DEFAULT 0;
