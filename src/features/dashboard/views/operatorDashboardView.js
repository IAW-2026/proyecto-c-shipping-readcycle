import prisma from "@/lib/prisma";

import ShipmentsTable from "@/features/admin/components/ShipmentsTable";

export default async function OperatorDashboardView({
  permissions,
  page,
  filters,
}) {
  const pageSize = 5;
  const totalShipments = await prisma.shipment.count();
  const totalPages = Math.ceil(totalShipments / pageSize);
  const where = {
    ...(filters.carrierId && {
      carrierId: filters.carrierId,
    }),

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

  const shipments = await prisma.shipment.findMany({
    where,

    take: pageSize,

    skip: (page - 1) * pageSize,

    include: {
      statuses: {
        orderBy: {
          timestamp: "desc",
        },
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

  return (
    <ShipmentsTable
      shipments={shipments}
      carriers={carriers}
      permissions={permissions}
      totalPages={totalPages}
    />
  );
}
