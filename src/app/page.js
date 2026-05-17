import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user || !user.isActive) {
    redirect("/unauthorized");
  }

  switch (user.role) {
    case "ADMIN":
      redirect("/admin");

    case "OPERATOR":
      redirect("/dashboard");

    case "CARRIER":
      redirect("/dashboard");

    default:
      redirect("/unauthorized");
  }
}
