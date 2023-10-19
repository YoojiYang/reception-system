/*
  Warnings:

  - You are about to drop the column `needOrNot` on the `VipTaxi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "taxiResevation" "needOrNotStatus" NOT NULL DEFAULT 'Unconfirmed';

-- AlterTable
ALTER TABLE "VipTaxi" DROP COLUMN "needOrNot";
