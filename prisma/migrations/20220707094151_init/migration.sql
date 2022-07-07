/*
  Warnings:

  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "city" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "phoneNumber" VARCHAR(32) NOT NULL,
    "loggedInAtUTC" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(128) NOT NULL,
    "password" VARCHAR(32) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "theatre" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "numberOfScreens" INTEGER NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "theatre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screen" (
    "id" TEXT NOT NULL,
    "screenNumber" INTEGER NOT NULL,
    "theatreId" TEXT NOT NULL,

    CONSTRAINT "screen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat" (
    "id" TEXT NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "screenId" TEXT NOT NULL,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "durationInMin" INTEGER NOT NULL,
    "language" VARCHAR(32) NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "show" (
    "id" TEXT NOT NULL,
    "screenId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "showId" TEXT NOT NULL,
    "numberOfSeatsBooked" INTEGER NOT NULL,
    "showDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookedSeat" (
    "id" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    "showId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,

    CONSTRAINT "bookedSeat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theatre" ADD CONSTRAINT "theatre_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screen" ADD CONSTRAINT "screen_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "theatre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "show" ADD CONSTRAINT "show_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "show" ADD CONSTRAINT "show_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_showId_fkey" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookedSeat" ADD CONSTRAINT "bookedSeat_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookedSeat" ADD CONSTRAINT "bookedSeat_showId_fkey" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookedSeat" ADD CONSTRAINT "bookedSeat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
