/*
  Warnings:

  - You are about to drop the column `adultsCount` on the `Arrival` table. All the data in the column will be lost.
  - You are about to drop the column `childrenCount` on the `Arrival` table. All the data in the column will be lost.
  - You are about to drop the column `increaseDecrease` on the `Arrival` table. All the data in the column will be lost.
  - You are about to drop the column `reservationCount` on the `Arrival` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Arrival" DROP COLUMN "adultsCount",
DROP COLUMN "childrenCount",
DROP COLUMN "increaseDecrease",
DROP COLUMN "reservationCount",
ADD COLUMN     "changedAdultsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "changedChildrenCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reserveAdultsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reserveChildrenCount" INTEGER NOT NULL DEFAULT 0;
