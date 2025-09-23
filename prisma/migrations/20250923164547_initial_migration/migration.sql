-- CreateTable
CREATE TABLE "public"."Producer" (
    "id" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" DOUBLE PRECISION NOT NULL,
    "arableArea" DOUBLE PRECISION NOT NULL,
    "vegetationArea" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Culture" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Culture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CultureToProducer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CultureToProducer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_cpfCnpj_key" ON "public"."Producer"("cpfCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Culture_name_key" ON "public"."Culture"("name");

-- CreateIndex
CREATE INDEX "_CultureToProducer_B_index" ON "public"."_CultureToProducer"("B");

-- AddForeignKey
ALTER TABLE "public"."_CultureToProducer" ADD CONSTRAINT "_CultureToProducer_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Culture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CultureToProducer" ADD CONSTRAINT "_CultureToProducer_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
