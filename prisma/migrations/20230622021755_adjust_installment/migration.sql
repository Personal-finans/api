/*
  Warnings:

  - You are about to drop the column `due_data` on the `expenses` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `installments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `installments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expenses` DROP COLUMN `due_data`,
    ADD COLUMN `dueDate` DATE NOT NULL;

-- AlterTable
ALTER TABLE `installments` ADD COLUMN `dueDate` DATE NOT NULL,
    ADD COLUMN `number` INTEGER NOT NULL;
