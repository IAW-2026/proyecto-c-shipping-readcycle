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
      <div className="mb-8">
        <div className="w-24 h-1 bg-brand-clay rounded-full mt-3" />
      </div>

      {user.role === "OPERATOR" ? (
        <OperatorDashboardView permissions={permissions} />
      ) : (
        <CarrierDashboardView permissions={permissions} carrierId={user.id} />
      )}
    </div>
  );
}
