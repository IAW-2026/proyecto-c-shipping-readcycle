import prisma from "@/lib/prisma";

import UsersTable from "@/features/admin/components/UsersTable";
import CreateUserModal from "@/features/admin/components/CreateUserModal";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-brand-forest">Usuarios</h1>

          <div className="w-24 h-1 bg-brand-clay rounded-full mt-3" />
        </div>

        <CreateUserModal />
      </div>

      <UsersTable users={users} />
    </div>
  );
}
