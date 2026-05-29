import prisma from "@/lib/prisma";

import ShipmentsTable from "@/features/admin/components/ShipmentsTable";
import { auth } from "@clerk/nextjs/server";

export default async function CarrierDashboardView({ permissions, carrierId }) {
  const shipments = await prisma.shipment.findMany({
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
  return <ShipmentsTable shipments={shipments} permissions={permissions} />;
}
