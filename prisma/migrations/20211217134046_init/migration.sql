-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "voivodeship" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "group" TEXT,
    "lnpID" TEXT,
    "author" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);
