-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "DeliveryPartner" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
