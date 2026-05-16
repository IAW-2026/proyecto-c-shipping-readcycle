import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Sidebar from "@/features/admin/components/Sidebar";
import Topbar from "@/features/admin/components/Topbar";

export default async function AdminLayout({ children }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100">
        <Topbar user={user} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
