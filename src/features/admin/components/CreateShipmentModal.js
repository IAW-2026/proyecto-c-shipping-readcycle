"use client";

import { useState } from "react";

export default function CreateShipmentModal({ carriers }) {
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
          "X-API-Key": `${process.env.API_TOKEN}`,
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
        Crear shipment
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
          Crear shipment
        </h2>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Order ID"
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
                orderId: e.target.value,
              })
            }
          />

          <select
            value={form.carrierId}
            onChange={(e) =>
              setForm({
                ...form,
                carrierId: e.target.value,
              })
            }
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
          >
            <option value="">Seleccionar transportista</option>

            {carriers.map((carrier) => (
              <option key={carrier.id} value={carrier.id}>
                {carrier.username}
              </option>
            ))}
          </select>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="
                flex-1
                bg-brand-sage
                hover:bg-brand-forest
                disabled:opacity-50
                disabled:cursor-not-allowed
                text-white
                py-3
                rounded-xl
                font-medium
                transition-colors
              "
            >
              {loading ? "Creando..." : "Crear"}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                flex-1
                bg-brand-clay
                hover:opacity-90
                text-white
                py-3
                rounded-xl
                font-medium
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
