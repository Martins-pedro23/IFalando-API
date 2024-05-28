/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "permission" TEXT NOT NULL DEFAULT 'ALUNO',
ADD COLUMN     "userID" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userID");

-- CreateTable
CREATE TABLE "Classes" (
    "classesID" SERIAL NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("classesID")
);

-- CreateTable
CREATE TABLE "_ClassesToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassesToUser_AB_unique" ON "_ClassesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassesToUser_B_index" ON "_ClassesToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "_ClassesToUser" ADD CONSTRAINT "_ClassesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Classes"("classesID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassesToUser" ADD CONSTRAINT "_ClassesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
