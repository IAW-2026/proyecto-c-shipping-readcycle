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
        <h1 className="text-3xl font-bold">Usuarios</h1>

        <CreateUserModal />
      </div>

      <UsersTable users={users} />
    </div>
  );
}
