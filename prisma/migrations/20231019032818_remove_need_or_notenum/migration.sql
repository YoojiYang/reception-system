/*
  Warnings:

  - The `taxiReservation` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "taxiReservation",
ADD COLUMN     "taxiReservation" TEXT NOT NULL DEFAULT 'Unconfirmed';

-- DropEnum
DROP TYPE "needOrNotStatus";
