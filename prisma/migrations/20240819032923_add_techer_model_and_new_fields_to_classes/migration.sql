/*
  Warnings:

  - The primary key for the `Classes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classesID` on the `Classes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[classesUUID]` on the table `Classes` will be added. If there are existing duplicate values, this will fail.
  - The required column `classesUUID` was added to the `Classes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `description` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Classes` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `A` on the `_ClassesToUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_ClassesToUser" DROP CONSTRAINT "_ClassesToUser_A_fkey";

-- AlterTable
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_pkey",
DROP COLUMN "classesID",
ADD COLUMN     "classesUUID" UUID NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "Classes_pkey" PRIMARY KEY ("classesUUID");

-- AlterTable
ALTER TABLE "_ClassesToUser" DROP COLUMN "A",
ADD COLUMN     "A" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Teacher" (
    "teacherID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacherID")
);

-- CreateTable
CREATE TABLE "_ClassesToTeacher" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userID_key" ON "Teacher"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassesToTeacher_AB_unique" ON "_ClassesToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassesToTeacher_B_index" ON "_ClassesToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Classes_classesUUID_key" ON "Classes"("classesUUID");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassesToUser_AB_unique" ON "_ClassesToUser"("A", "B");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassesToTeacher" ADD CONSTRAINT "_ClassesToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Classes"("classesUUID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassesToTeacher" ADD CONSTRAINT "_ClassesToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("teacherID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassesToUser" ADD CONSTRAINT "_ClassesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Classes"("classesUUID") ON DELETE CASCADE ON UPDATE CASCADE;
