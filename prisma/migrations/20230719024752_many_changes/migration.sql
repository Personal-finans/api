/*
  Warnings:

  - You are about to drop the column `dueDate` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `installments` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `closesDay` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodId` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closesDay` to the `installments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_profileId_fkey`;

-- AlterTable
ALTER TABLE `expenses` DROP COLUMN `dueDate`,
    DROP COLUMN `totalValue`,
    ADD COLUMN `closesDay` DATE NOT NULL,
    ADD COLUMN `paymentMethodId` INTEGER NOT NULL,
    ADD COLUMN `value` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `installments` DROP COLUMN `dueDate`,
    ADD COLUMN `closesDay` INTEGER NOT NULL,
    MODIFY `paid` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `deleted`;

-- DropTable
DROP TABLE `cards`;

-- CreateTable
CREATE TABLE `creditCards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountName` VARCHAR(191) NOT NULL,
    `limit` DECIMAL(65, 30) NOT NULL,
    `closesDay` INTEGER NOT NULL,
    `expirationDay` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `financialInstitutionId` INTEGER NOT NULL,
    `profileId` INTEGER NOT NULL,

    UNIQUE INDEX `creditCards_financialInstitutionId_key`(`financialInstitutionId`),
    UNIQUE INDEX `creditCards_profileId_key`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `financialInstitutions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `iconUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `creditCards` ADD CONSTRAINT `creditCards_financialInstitutionId_fkey` FOREIGN KEY (`financialInstitutionId`) REFERENCES `financialInstitutions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `creditCards` ADD CONSTRAINT `creditCards_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
