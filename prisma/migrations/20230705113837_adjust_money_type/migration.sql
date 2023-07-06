/*
  Warnings:

  - You are about to alter the column `totalValue` on the `expenses` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to alter the column `value` on the `installments` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `expenses` MODIFY `totalValue` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `installments` MODIFY `value` DECIMAL(65, 30) NOT NULL;
