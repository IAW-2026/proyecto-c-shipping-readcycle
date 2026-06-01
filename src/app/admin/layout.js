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
    <div className="flex min-h-screen bg-brand-beige">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar user={user} />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
