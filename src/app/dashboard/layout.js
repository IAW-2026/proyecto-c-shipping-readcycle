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
    <div className="min-h-screen bg-brand-beige">
      <nav className="bg-brand-forest text-white border-b border-brand-sage">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <h1 className="text-2xl font-bold tracking-wide">ACME S.A</h1>

          <UserButton />
        </div>
      </nav>

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
