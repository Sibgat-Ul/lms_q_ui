/*
  Warnings:

  - The primary key for the `course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `course_id` on the `course` table. The data in that column could be lost. The data in that column will be cast from `Char(10)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `course` DROP PRIMARY KEY,
    MODIFY `course_id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`course_id`);
