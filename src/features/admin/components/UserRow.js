"use client";

export default function UserRow({ user }) {
  async function handleDelete() {
    const confirmDelete = confirm("¿Desactivar usuario?");

    if (!confirmDelete) {
      return;
    }

    await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <tr className="border-t">
      <td className="p-4">{user.username}</td>

      <td className="p-4">{user.email}</td>

      <td className="p-4">{user.role}</td>

      <td className="p-4">{user.isActive ? "Activo" : "Inactivo"}</td>

      <td className="p-4">
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Editar
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Desactivar
          </button>
        </div>
      </td>
    </tr>
  );
}
