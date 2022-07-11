/*
  Warnings:

  - Added the required column `availableUntilUtc` to the `show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showEndTimeInUtc` to the `show` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showStartTimeInUtc` to the `show` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "show" ADD COLUMN     "availableUntilUtc" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "showEndTimeInUtc" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "showStartTimeInUtc" TIMESTAMP(3) NOT NULL;
