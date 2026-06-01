"use client";

import { useState } from "react";
import UserRow from "./UserRow";
import EditUserModal from "./EditUserModal";

export default function UsersTable({ users }) {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        border
        border-brand-sand
        overflow-hidden
      "
    >
      <table className="w-full">
        <thead className="bg-brand-forest text-white">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Username</th>

            <th className="px-4 py-3 text-left font-semibold">Email</th>

            <th className="px-4 py-3 text-left font-semibold">Rol</th>

            <th className="px-4 py-3 text-left font-semibold">Estado</th>

            <th className="px-4 py-3 text-left font-semibold">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-brand-sand">
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={() => setSelectedUser(user)}
            />
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
