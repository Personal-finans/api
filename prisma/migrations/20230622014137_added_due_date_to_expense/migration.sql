/*
  Warnings:

  - Added the required column `due_data` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expenses` ADD COLUMN `due_data` DATE NOT NULL;
