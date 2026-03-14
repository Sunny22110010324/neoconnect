/*
  Warnings:

  - You are about to drop the column `assignedTo` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `severity` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `trackingId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `votes` on the `Poll` table. All the data in the column will be lost.
  - Added the required column `description` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "assignedTo",
DROP COLUMN "category",
DROP COLUMN "department",
DROP COLUMN "location",
DROP COLUMN "severity",
DROP COLUMN "status",
DROP COLUMN "trackingId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "options",
DROP COLUMN "votes",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL;
