-- CreateTable
CREATE TABLE "CvVersion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CvVersion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CvVersion_isPublic_idx" ON "CvVersion"("isPublic");
