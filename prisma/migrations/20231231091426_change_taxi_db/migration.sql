/*
  Warnings:

  - You are about to drop the column `generalTaxiId` on the `HotPotatos` table. All the data in the column will be lost.
  - The `hasPremiumMenu` column on the `Meal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isPaid` column on the `Meal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isCancel` on the `Taxi` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Taxi` table. All the data in the column will be lost.
  - The `reservationTime` column on the `Taxi` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `GeneralTaxi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VipTaxi` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[taxiId]` on the table `HotPotatos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roomId]` on the table `Taxi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taxiId` to the `HotPotatos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sex` on the `HotPotatos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "GeneralTaxi" DROP CONSTRAINT "GeneralTaxi_taxiId_fkey";

-- DropForeignKey
ALTER TABLE "HotPotatos" DROP CONSTRAINT "HotPotatos_generalTaxiId_fkey";

-- DropForeignKey
ALTER TABLE "VipTaxi" DROP CONSTRAINT "VipTaxi_roomId_fkey";

-- DropForeignKey
ALTER TABLE "VipTaxi" DROP CONSTRAINT "VipTaxi_taxiId_fkey";

-- AlterTable
ALTER TABLE "HotPotatos" DROP COLUMN "generalTaxiId",
ADD COLUMN     "taxiId" INTEGER NOT NULL,
DROP COLUMN "sex",
ADD COLUMN     "sex" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "hasPremiumMenu",
ADD COLUMN     "hasPremiumMenu" TEXT NOT NULL DEFAULT '',
DROP COLUMN "isPaid",
ADD COLUMN     "isPaid" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Taxi" DROP COLUMN "isCancel",
DROP COLUMN "isCompleted",
ADD COLUMN     "afterEvent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cancelCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "column" INTEGER,
ADD COLUMN     "completedCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "index" INTEGER,
ADD COLUMN     "roomId" INTEGER,
ADD COLUMN     "section" INTEGER,
ALTER COLUMN "peopleCount" SET DEFAULT 0,
ALTER COLUMN "carCount" SET DEFAULT 0,
DROP COLUMN "reservationTime",
ADD COLUMN     "reservationTime" TIMESTAMP(3);

-- DropTable
DROP TABLE "GeneralTaxi";

-- DropTable
DROP TABLE "VipTaxi";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "PremiumMenuStatus";

-- DropEnum
DROP TYPE "sexStatus";

-- CreateIndex
CREATE UNIQUE INDEX "HotPotatos_taxiId_key" ON "HotPotatos"("taxiId");

-- CreateIndex
CREATE UNIQUE INDEX "Taxi_roomId_key" ON "Taxi"("roomId");

-- AddForeignKey
ALTER TABLE "Taxi" ADD CONSTRAINT "Taxi_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotPotatos" ADD CONSTRAINT "HotPotatos_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
