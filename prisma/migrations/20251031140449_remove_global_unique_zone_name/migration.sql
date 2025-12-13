-- DropIndex
DROP INDEX "public"."Zone_name_key";

-- AlterTable
ALTER TABLE "Tarif" ADD COLUMN     "express" BOOLEAN NOT NULL DEFAULT false;
