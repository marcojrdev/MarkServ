/*
  Warnings:

  - You are about to drop the column `prestadorId` on the `Agenda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Agenda" DROP CONSTRAINT "Agenda_prestadorId_fkey";

-- AlterTable
ALTER TABLE "public"."Agenda" DROP COLUMN "prestadorId";
