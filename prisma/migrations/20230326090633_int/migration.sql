/*
  Warnings:

  - The primary key for the `course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `course_id` on the `course` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `instructor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `instructor` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `student` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `takes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `takes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `course_id` on the `takes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `student_id` on the `takes` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `teaches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `teaches` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `course_id` on the `teaches` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `instructor_id` on the `teaches` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `takes` DROP FOREIGN KEY `takes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `teaches` DROP FOREIGN KEY `teaches_ibfk_1`;

-- AlterTable
ALTER TABLE `course` DROP PRIMARY KEY,
    MODIFY `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`course_id`);

-- AlterTable
ALTER TABLE `instructor` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`, `name`);

-- AlterTable
ALTER TABLE `takes` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `course_id` INTEGER NULL,
    MODIFY `student_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `teaches` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `course_id` INTEGER NULL,
    MODIFY `instructor_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `takes` ADD CONSTRAINT `takes_ibfk_1` FOREIGN KEY (`student_id`, `student_name`) REFERENCES `student`(`id`, `name`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `teaches` ADD CONSTRAINT `teaches_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
