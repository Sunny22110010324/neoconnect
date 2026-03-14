/*
  Warnings:

  - You are about to drop the column `title` on the `Case` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trackingId]` on the table `Case` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `severity` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackingId` to the `Case` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "title",
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "assignedTo" INTEGER,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "severity" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'New',
ADD COLUMN     "trackingId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Case_trackingId_key" ON "Case"("trackingId");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
