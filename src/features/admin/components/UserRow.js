"use client";

export default function UserRow({ user, onEdit }) {
  async function handleDelete() {
    const confirmDelete = confirm("¿Desactivar usuario?");

    if (!confirmDelete) {
      return;
    }

    const token = await window.Clerk.session.getToken();
    await fetch(`/api/users/${user.id}`, {
      method: "DELETE",

      headers: {
        "X-API-Key": `${process.env.API_TOKEN}`,
      },
    });

    window.location.reload();
  }
  function getRoleClass(role) {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-700";

      case "OPERATOR":
        return "bg-blue-100 text-blue-700";

      case "CARRIER":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <tr className="text-brand-forest hover:bg-brand-beige transition-colors">
      <td className="px-4 py-3">{user.username}</td>

      <td className="px-4 py-3">{user.email}</td>

      <td className="px-4 py-3">
        <span
          className={`
            inline-flex
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            ${getRoleClass(user.role)}
          `}
        >
          {user.role}
        </span>
      </td>

      <td className="px-4 py-3">
        <span
          className={`
            inline-flex
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            ${
              user.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {user.isActive ? "Activo" : "Inactivo"}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="
            bg-brand-sage
            hover:bg-brand-forest
            text-white
            px-4
            py-2
            rounded-lg
            transition-colors
          "
          >
            Editar
          </button>

          <button
            onClick={handleDelete}
            className="
              bg-brand-clay
              hover:opacity-90
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Desactivar
          </button>
        </div>
      </td>
    </tr>
  );
}
