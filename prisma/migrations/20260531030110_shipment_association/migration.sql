-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "currentStatus" "StatusDescription" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
