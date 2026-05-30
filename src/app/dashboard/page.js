import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import OperatorDashboardView from "@/features/dashboard/views/operatorDashboardView";
import CarrierDashboardView from "@/features/dashboard/views/CarrierDashboardView";
import ShipmentPagination from "@/features/dashboard/components/ShipmentPagination";
import ShipmentFilters from "@/features/dashboard/components/ShipmentFilters";

export default async function DashboardPage({ searchParams, totalPages }) {
  const searchedParams = await searchParams;

  const page = Number(searchedParams.page) || 1;

  const status = searchedParams.status;
  const carrierId = searchedParams.carrierId;
  const shipmentId = searchedParams.shipmentId;

  const clerk_user = await auth();
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: clerk_user.userId,
    },
  });

  const permissions = {
    canCreateShipment: user.role === "ADMIN",
    canAssignCarrier: user.role === "OPERATOR",
    canCancelShipment: user.role === "OPERATOR",
    canUpdateStatus: user.role !== "OPERATOR",
  };

  const carriers = await prisma.user.findMany({
    where: {
      role: "CARRIER",
    },
  });

  return (
    <div>
      <div className="mb-8">
        <div className="w-24 h-1 bg-brand-clay rounded-full mt-3" />
      </div>

      <ShipmentFilters
        filters={{ status, carrierId, shipmentId }}
        carriers={carriers}
      />

      {user.role === "OPERATOR" ? (
        <OperatorDashboardView
          permissions={permissions}
          page={page}
          filters={{ status, carrierId, shipmentId }}
        />
      ) : (
        <CarrierDashboardView
          permissions={permissions}
          carrierId={user.id}
          page={page}
          filters={{ status, carrierId, shipmentId }}
        />
      )}
      <ShipmentPagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
