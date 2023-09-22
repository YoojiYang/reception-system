/*
  Warnings:

  - You are about to drop the column `company` on the `Arrival` table. All the data in the column will be lost.
  - You are about to drop the column `reserveAdultsCount` on the `Arrival` table. All the data in the column will be lost.
  - You are about to drop the column `reserveChildrenCount` on the `Arrival` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledArrival` on the `Arrival` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Arrival" DROP COLUMN "company",
DROP COLUMN "reserveAdultsCount",
DROP COLUMN "reserveChildrenCount",
DROP COLUMN "scheduledArrival",
ADD COLUMN     "AdultsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ChildrenCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "company" TEXT,
ADD COLUMN     "reserveAdultsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reserveChildrenCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scheduledArrival" TIMESTAMP(3);
