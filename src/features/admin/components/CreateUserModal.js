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
        className="bg-black text-white px-4 py-2 rounded"
      >
        Crear usuario
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="text-black bg-white p-6 rounded-xl w-100"
      >
        <h2 className="text-2xl font-bold mb-6">Crear usuario</h2>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Username"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value,
              })
            }
          />

          <input
            placeholder="Email"
            className="border p-3 rounded"
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
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <select
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option value="OPERATOR">OPERATOR</option>

            <option value="DRIVER">DRIVER</option>

            <option value="ADMIN">ADMIN</option>
          </select>

          <button className="bg-black text-white p-3 rounded">Crear</button>
          <button
            onClick={() => setOpen(false)}
            className="bg-red-500 text-white p-3 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
