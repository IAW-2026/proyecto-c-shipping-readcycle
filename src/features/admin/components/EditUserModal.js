"use client";

import { useState } from "react";

export default function EditUserModal({ user, onClose }) {
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const token = await window.Clerk.session.getToken();

    await fetch(`/api/users/${user.id}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    });

    window.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          border
          border-brand-sand
          rounded-2xl
          shadow-xl
          p-8
          w-full
          max-w-lg
        "
      >
        <h2 className="text-2xl font-bold text-brand-forest mb-6">
          Editar usuario
        </h2>

        <div className="flex flex-col gap-4">
          <input
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
            className="
              border
              border-brand-sand
              rounded-xl
              px-4
              py-3
            "
          />

          <input
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="
              border
              border-brand-sand
              rounded-xl
              px-4
              py-3
            "
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            className="
              border
              border-brand-sand
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="ADMIN">ADMIN</option>
            <option value="OPERATOR">OPERATOR</option>
            <option value="CARRIER">CARRIER</option>
          </select>

          <select
            value={form.isActive.toString()}
            onChange={(e) =>
              setForm({
                ...form,
                isActive: e.target.value === "true",
              })
            }
            className="
              border
              border-brand-sand
              rounded-xl
              px-4
              py-3
            "
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="
                flex-1
                bg-brand-sage
                hover:bg-brand-forest
                text-white
                py-3
                rounded-xl
                transition-colors
              "
            >
              Guardar
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                bg-brand-clay
                text-white
                py-3
                rounded-xl
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
