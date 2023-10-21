/*
  Warnings:

  - Made the column `taxiCompany` on table `Taxi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Taxi" ALTER COLUMN "taxiCompany" SET NOT NULL,
ALTER COLUMN "taxiCompany" SET DEFAULT '';
