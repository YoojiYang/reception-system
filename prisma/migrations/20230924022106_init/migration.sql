/*
  Warnings:

  - You are about to drop the `ArrivalInCharge` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `arrivalTime` on table `Arrival` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ArrivalInCharge" DROP CONSTRAINT "ArrivalInCharge_inChargeId_fkey";

-- DropForeignKey
ALTER TABLE "ArrivalInCharge" DROP CONSTRAINT "ArrivalInCharge_roomId_fkey";

-- AlterTable
ALTER TABLE "Arrival" ALTER COLUMN "arrivalTime" SET NOT NULL,
ALTER COLUMN "arrivalTime" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ArrivalInCharge";

-- CreateTable
CREATE TABLE "RoomInCharge" (
    "roomId" INTEGER NOT NULL,
    "inChargeId" INTEGER NOT NULL,

    CONSTRAINT "RoomInCharge_pkey" PRIMARY KEY ("roomId","inChargeId")
);

-- AddForeignKey
ALTER TABLE "RoomInCharge" ADD CONSTRAINT "RoomInCharge_inChargeId_fkey" FOREIGN KEY ("inChargeId") REFERENCES "InCharge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomInCharge" ADD CONSTRAINT "RoomInCharge_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
