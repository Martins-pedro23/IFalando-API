/*
  Warnings:

  - You are about to drop the column `permission` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ClassesToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `LanguegeID` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LevelID` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClassesToUser" DROP CONSTRAINT "_ClassesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassesToUser" DROP CONSTRAINT "_ClassesToUser_B_fkey";

-- AlterTable
ALTER TABLE "Classes" ADD COLUMN     "LanguegeID" INTEGER NOT NULL,
ADD COLUMN     "LevelID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permission";

-- DropTable
DROP TABLE "_ClassesToUser";

-- CreateTable
CREATE TABLE "Student" (
    "studentID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentID")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "languege" (
    "LanguegeID" SERIAL NOT NULL,
    "LanguegeName" TEXT NOT NULL,

    CONSTRAINT "languege_pkey" PRIMARY KEY ("LanguegeID")
);

-- CreateTable
CREATE TABLE "Level" (
    "LevelID" SERIAL NOT NULL,
    "LevelName" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("LevelID")
);

-- CreateTable
CREATE TABLE "_ClassesToStudent" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userID_key" ON "Admin"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassesToStudent_AB_unique" ON "_ClassesToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassesToStudent_B_index" ON "_ClassesToStudent"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_LevelID_fkey" FOREIGN KEY ("LevelID") REFERENCES "Level"("LevelID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_LanguegeID_fkey" FOREIGN KEY ("LanguegeID") REFERENCES "languege"("LanguegeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassesToStudent" ADD CONSTRAINT "_ClassesToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Classes"("classesUUID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassesToStudent" ADD CONSTRAINT "_ClassesToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("studentID") ON DELETE CASCADE ON UPDATE CASCADE;
