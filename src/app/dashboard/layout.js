import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Topbar from "@/features/admin/components/Topbar";

export default async function DashboardLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    redirect("/unauthorized");
  }

  if (user.role !== "OPERATOR" && user.role !== "CARRIER") {
    redirect("/admin");
  }
  return (
    <div className="min-h-screen bg-brand-beige">
      <header className="bg-brand-forest border-b border-brand-sand px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-brand-sand font-bold text-2xl">
              ReadCycle Logistics
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-brand-sand">{user.username}</span>

            <UserButton />
          </div>
        </div>
      </header>

      <header className="max-w-7xl mx-auto px-8 py-8">
        <h2 className="text-4xl font-bold text-brand-forest">
          Portal de Envíos
        </h2>

        <p className="text-brand-sage mt-2">
          Gestión y seguimiento de shipments
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-8 pb-10">{children}</main>
    </div>
  );
}
