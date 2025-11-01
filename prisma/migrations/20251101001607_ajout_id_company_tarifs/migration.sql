/*
  Warnings:

  - Added the required column `companyId` to the `Tarif` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tarif" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tarif" ADD CONSTRAINT "Tarif_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "DeliveryCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
