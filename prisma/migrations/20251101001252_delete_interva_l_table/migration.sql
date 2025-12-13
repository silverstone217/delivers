/*
  Warnings:

  - You are about to drop the `Interval` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Interval" DROP CONSTRAINT "Interval_tarifId_fkey";

-- AlterTable
ALTER TABLE "Tarif" ADD COLUMN     "maxLength" DOUBLE PRECISION,
ADD COLUMN     "maxWeight" DOUBLE PRECISION,
ADD COLUMN     "maxWidth" DOUBLE PRECISION,
ADD COLUMN     "minLength" DOUBLE PRECISION,
ADD COLUMN     "minWeight" DOUBLE PRECISION,
ADD COLUMN     "minWidth" DOUBLE PRECISION;

-- DropTable
DROP TABLE "public"."Interval";
