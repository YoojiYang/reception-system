-- DropForeignKey
ALTER TABLE "GeneralTaxi" DROP CONSTRAINT "GeneralTaxi_taxiId_fkey";

-- DropForeignKey
ALTER TABLE "VipTaxi" DROP CONSTRAINT "VipTaxi_taxiId_fkey";

-- AddForeignKey
ALTER TABLE "VipTaxi" ADD CONSTRAINT "VipTaxi_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralTaxi" ADD CONSTRAINT "GeneralTaxi_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
