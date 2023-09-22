-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Completed', 'NotCompleted', 'NotRequired');

-- CreateEnum
CREATE TYPE "PremiumMenuStatus" AS ENUM ('Available', 'NotAvailable', 'Unconfirmed');

-- CreateEnum
CREATE TYPE "needOrNotStatus" AS ENUM ('Need', 'Not', 'Unconfirmed');

-- CreateEnum
CREATE TYPE "sexStatus" AS ENUM ('Men', 'Women', 'Unconfirmed');

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InCharge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InCharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArrivalInCharge" (
    "arrivalId" INTEGER NOT NULL,
    "inChargeId" INTEGER NOT NULL,

    CONSTRAINT "ArrivalInCharge_pkey" PRIMARY KEY ("arrivalId","inChargeId")
);

-- CreateTable
CREATE TABLE "Arrival" (
    "id" SERIAL NOT NULL,
    "company" TEXT,
    "scheduledArrival" TIMESTAMP(3),
    "reservationCount" INTEGER NOT NULL DEFAULT 0,
    "increaseDecrease" INTEGER NOT NULL DEFAULT 0,
    "adultsCount" INTEGER NOT NULL DEFAULT 0,
    "childrenCount" INTEGER NOT NULL DEFAULT 0,
    "arrivalTime" TIMESTAMP(3),
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Arrival_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3),
    "hasStarted" BOOLEAN NOT NULL DEFAULT false,
    "hasPremiumMenu" "PremiumMenuStatus" NOT NULL DEFAULT 'Unconfirmed',
    "paymentMethod" TEXT,
    "isPaid" "PaymentStatus" NOT NULL DEFAULT 'NotRequired',
    "hasLostItem" BOOLEAN NOT NULL DEFAULT false,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Taxi" (
    "id" SERIAL NOT NULL,
    "peopleCount" INTEGER NOT NULL DEFAULT 2,
    "carCount" INTEGER NOT NULL DEFAULT 1,
    "reservationTime" TEXT,
    "taxiCompany" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isCancel" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Taxi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VipTaxi" (
    "id" SERIAL NOT NULL,
    "taxiId" INTEGER NOT NULL,
    "needOrNot" "needOrNotStatus" NOT NULL DEFAULT 'Unconfirmed',
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "VipTaxi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralTaxi" (
    "id" SERIAL NOT NULL,
    "taxiId" INTEGER NOT NULL,
    "section" INTEGER NOT NULL DEFAULT 122,
    "column" INTEGER NOT NULL DEFAULT 1,
    "index" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "GeneralTaxi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotPotatos" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sex" "sexStatus" NOT NULL DEFAULT 'Unconfirmed',
    "detail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "generalTaxiId" INTEGER NOT NULL,

    CONSTRAINT "HotPotatos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_roomId_key" ON "Meal"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "VipTaxi_taxiId_key" ON "VipTaxi"("taxiId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneralTaxi_taxiId_key" ON "GeneralTaxi"("taxiId");

-- AddForeignKey
ALTER TABLE "ArrivalInCharge" ADD CONSTRAINT "ArrivalInCharge_inChargeId_fkey" FOREIGN KEY ("inChargeId") REFERENCES "InCharge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArrivalInCharge" ADD CONSTRAINT "ArrivalInCharge_arrivalId_fkey" FOREIGN KEY ("arrivalId") REFERENCES "Arrival"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arrival" ADD CONSTRAINT "Arrival_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VipTaxi" ADD CONSTRAINT "VipTaxi_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VipTaxi" ADD CONSTRAINT "VipTaxi_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralTaxi" ADD CONSTRAINT "GeneralTaxi_taxiId_fkey" FOREIGN KEY ("taxiId") REFERENCES "Taxi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotPotatos" ADD CONSTRAINT "HotPotatos_generalTaxiId_fkey" FOREIGN KEY ("generalTaxiId") REFERENCES "GeneralTaxi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
