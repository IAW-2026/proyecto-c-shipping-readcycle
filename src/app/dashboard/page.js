import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import OperatorDashboardView from "@/features/dashboard/views/OperatorDashboardView";
import CarrierDashboardView from "@/features/dashboard/views/CarrierDashboardView";

export default async function DashboardPage() {
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl text-black font-bold">Shipments</h1>
      </div>

      {user.role === "OPERATOR" ? (
        <OperatorDashboardView permissions={permissions} />
      ) : (
        <CarrierDashboardView permissions={permissions} carrierId={user.id} />
      )}
    </div>
  );
}
