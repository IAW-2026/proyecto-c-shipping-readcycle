import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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
    <div className="min-h-full">
      <nav className="flex justify-between p-5 items-center">
        <h1 className="font-bold text-2xl">ACME S.A</h1>
        <UserButton />
      </nav>
      <div className="flex text-4xl justify-center p-5">
        <h2>Portal de Envios</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
