/*
  Warnings:

  - Made the column `reservationTime` on table `Taxi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Taxi" ALTER COLUMN "reservationTime" SET NOT NULL,
ALTER COLUMN "reservationTime" SET DEFAULT '未定';
