"use client";

import { useState } from "react";

export default function CreateShipmentModal() {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    orderId: "",
    carrierId: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/shipments", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Error creating shipment");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Crear shipment
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="text-black bg-white p-6 rounded-xl w-100"
      >
        <h2 className="text-2xl font-bold mb-6">Crear shipment</h2>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Order ID"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                orderId: e.target.value,
              })
            }
          />

          <input
            placeholder="Carrier ID"
            className="border p-3 rounded"
            onChange={(e) =>
              setForm({
                ...form,
                carrierId: e.target.value,
              })
            }
          />

          <button
            disabled={loading}
            className="bg-black text-white p-3 rounded disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear"}
          </button>

          <button
            type="button"
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
