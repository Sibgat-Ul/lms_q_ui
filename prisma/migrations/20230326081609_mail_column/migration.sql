/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `instructor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `instructor` ADD COLUMN `email` VARCHAR(30) NULL;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `email` VARCHAR(30) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `instructor`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `student`(`email`);
