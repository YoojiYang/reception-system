/*
  Warnings:

  - You are about to drop the column `AdultsCount` on the `Arrival` table. All the data in the column will be lost.
  - You are about to drop the column `ChildrenCount` on the `Arrival` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Arrival" DROP COLUMN "AdultsCount",
DROP COLUMN "ChildrenCount",
ADD COLUMN     "adultsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "childrenCount" INTEGER NOT NULL DEFAULT 0;
