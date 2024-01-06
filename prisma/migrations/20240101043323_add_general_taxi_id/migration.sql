/*
  Warnings:

  - A unique constraint covering the columns `[generalTaxiId]` on the table `Taxi` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Taxi" ADD COLUMN     "generalTaxiId" INTEGER,
ADD COLUMN     "isGeneralTaxi" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Taxi_generalTaxiId_key" ON "Taxi"("generalTaxiId");
