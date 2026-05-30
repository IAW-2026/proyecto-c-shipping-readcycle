import prisma from "@/lib/prisma";

import ShipmentsTable from "@/features/admin/components/ShipmentsTable";
import CreateShipmentModal from "@/features/admin/components/CreateShipmentModal";

export default async function ShipmentsPage() {
  const shipments = await prisma.shipment.findMany({
    include: {
      statuses: {
        orderBy: {
          timestamp: "desc",
        },
        // take: 1,
      },
    },

    orderBy: {
      id: "desc",
    },
  });

  const carriers = await prisma.user.findMany({
    where: {
      role: "CARRIER",
    },
  });

  const permissions = {
    canCreateShipment: true,
    canAssignCarrier: true,
    canCancelShipment: true,
    canUpdateStatus: true,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl text-black font-bold">Shipments</h1>

        <CreateShipmentModal />
      </div>

      <ShipmentsTable
        shipments={shipments}
        carriers={carriers}
        permissions={permissions}
      />
    </div>
  );
}
