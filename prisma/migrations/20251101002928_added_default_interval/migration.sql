/*
  Warnings:

  - Made the column `maxLength` on table `Tarif` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxWeight` on table `Tarif` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxWidth` on table `Tarif` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minLength` on table `Tarif` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minWeight` on table `Tarif` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minWidth` on table `Tarif` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Tarif" ALTER COLUMN "maxLength" SET NOT NULL,
ALTER COLUMN "maxLength" SET DEFAULT 0,
ALTER COLUMN "maxWeight" SET NOT NULL,
ALTER COLUMN "maxWeight" SET DEFAULT 0,
ALTER COLUMN "maxWidth" SET NOT NULL,
ALTER COLUMN "maxWidth" SET DEFAULT 0,
ALTER COLUMN "minLength" SET NOT NULL,
ALTER COLUMN "minLength" SET DEFAULT 0,
ALTER COLUMN "minWeight" SET NOT NULL,
ALTER COLUMN "minWeight" SET DEFAULT 0,
ALTER COLUMN "minWidth" SET NOT NULL,
ALTER COLUMN "minWidth" SET DEFAULT 0;
