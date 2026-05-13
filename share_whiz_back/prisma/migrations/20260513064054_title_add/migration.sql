/*
  Warnings:

  - You are about to drop the column `explanation` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - Added the required column `body` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "explanation",
DROP COLUMN "image_url",
DROP COLUMN "name",
DROP COLUMN "status",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
