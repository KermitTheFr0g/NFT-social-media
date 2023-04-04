-- CreateTable
CREATE TABLE `Project` (
    `projectID` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `contractAddress` VARCHAR(191) NOT NULL,
    `ownerAddress` VARCHAR(191) NOT NULL,
    `banner_image` VARCHAR(191) NOT NULL,
    `pfp_image` VARCHAR(191) NOT NULL,
    `ethPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
