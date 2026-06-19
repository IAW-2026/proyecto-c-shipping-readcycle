"use client";

import { useState } from "react";

export default function CreateUserModal() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "OPERATOR",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/users", {
      method: "POST",

      headers: {
        "X-API-Key": `${process.env.API_TOKEN}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    });

    window.location.reload();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="
          bg-brand-sage
          hover:bg-brand-forest
          text-white
          px-5
          py-3
          rounded-xl
          font-medium
          transition-colors
        "
      >
        Crear usuario
      </button>
    );
  }

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
    >
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
          Crear usuario
        </h2>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Username"
            className="
              border
              border-brand-sand
              rounded-xl
              px-4
              py-3
              text-brand-forest
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
            "
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="
              border
              border-brand-sand
              rounded-xl
              px-4
              py-3
              text-brand-forest
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
            "
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="
              border
              border-brand-sand
              rounded-xl
              px-4
              py-3
              text-brand-forest
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
            "
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <select
            className="
              border
              border-brand-sand
              rounded-xl
              px-4
              py-3
              text-brand-forest
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
            "
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option value="OPERATOR">OPERATOR</option>

            <option value="CARRIER">CARRIER</option>

            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            className="
            bg-brand-sage
            hover:bg-brand-forest
            text-white
            py-3
            rounded-xl
            font-medium
            transition-colors
          "
          >
            Crear
          </button>
          <button
            onClick={() => setOpen(false)}
            className="
              bg-brand-clay
              hover:opacity-90
              text-white
              py-3
              rounded-xl
              font-medium
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
