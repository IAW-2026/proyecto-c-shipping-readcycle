import prisma from "@/lib/prisma";

import ShipmentsTable from "@/features/admin/components/ShipmentsTable";
import CreateShipmentModal from "@/features/admin/components/CreateShipmentModal";
import ShipmentFilters from "@/features/dashboard/components/ShipmentFilters";
import ShipmentPagination from "@/features/dashboard/components/ShipmentPagination";

export default async function ShipmentsPage({ searchParams, totalPages }) {
  const searchedParams = await searchParams;

  const page = Number(searchedParams.page) || 1;

  const status = searchedParams.status;
  const carrierId = searchedParams.carrierId;
  const shipmentId = searchedParams.shipmentId;

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

      <ShipmentFilters carriers={carriers} />

      <ShipmentsTable
        shipments={shipments}
        carriers={carriers}
        permissions={permissions}
      />

      <ShipmentPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
