/*
  Warnings:

  - The primary key for the `ArrivalInCharge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `arrivalId` on the `ArrivalInCharge` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `ArrivalInCharge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ArrivalInCharge" DROP CONSTRAINT "ArrivalInCharge_arrivalId_fkey";

-- AlterTable
ALTER TABLE "ArrivalInCharge" DROP CONSTRAINT "ArrivalInCharge_pkey",
DROP COLUMN "arrivalId",
ADD COLUMN     "roomId" INTEGER NOT NULL,
ADD CONSTRAINT "ArrivalInCharge_pkey" PRIMARY KEY ("roomId", "inChargeId");

-- AddForeignKey
ALTER TABLE "ArrivalInCharge" ADD CONSTRAINT "ArrivalInCharge_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
