import prisma from "@/lib/prisma";

import ShipmentsTable from "@/features/admin/components/ShipmentsTable";
import ShipmentPagination from "../components/ShipmentPagination";

export default async function CarrierDashboardView({
  permissions,
  carrierId,
  page,
  filters,
}) {
  const where = {
    carrierId: carrierId,
    ...(filters.shipmentId && {
      id: {
        contains: filters.shipmentId,
        mode: "insensitive",
      },
    }),
    ...(filters.status && {
      currentStatus: filters.status,
    }),
  };
  const pageSize = 5;
  const shipments = await prisma.shipment.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    where,
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
  const totalShipments = shipments.length;
  const totalPages = Math.ceil(totalShipments / pageSize);
  return (
    <>
      <ShipmentsTable
        shipments={shipments}
        permissions={permissions}
        totalPages={totalPages}
      />
      <ShipmentPagination totalPages={totalPages} currentPage={page} />
    </>
  );
}
