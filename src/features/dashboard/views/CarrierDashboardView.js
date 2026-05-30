import prisma from "@/lib/prisma";

import ShipmentsTable from "@/features/admin/components/ShipmentsTable";
import { auth } from "@clerk/nextjs/server";

export default async function CarrierDashboardView({
  permissions,
  carrierId,
  page,
  filters,
}) {
  const pageSize = 5;
  const totalShipments = await prisma.shipment.count();
  const totalPages = Math.ceil(totalShipments / pageSize);
  const shipments = await prisma.shipment.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    where: {
      carrierId: carrierId,
    },
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
  return (
    <ShipmentsTable
      shipments={shipments}
      permissions={permissions}
      totalPages={totalPages}
    />
  );
}
