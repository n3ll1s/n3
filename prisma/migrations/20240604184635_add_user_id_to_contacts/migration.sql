/*
  Warnings:

  - You are about to drop the column `authorId` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `News` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "News" DROP CONSTRAINT "News_authorId_fkey";

-- AlterTable
ALTER TABLE "News" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "deadline" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "goal" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Contacts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contacts_email_key" ON "Contacts"("email");
