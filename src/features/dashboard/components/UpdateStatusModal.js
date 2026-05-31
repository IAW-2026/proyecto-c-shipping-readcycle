"use client";

import { useState } from "react";

const AVAILABLE_STATUSES = [
  "PENDING",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "FAILED",
  "CANCELLED",
];

export default function UpdateStatusModal({ shipment, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState("");

  async function handleSubmit() {
    await fetch(`/api/shipments/${shipment.id}/tracking`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        description: selectedStatus,
      }),
    });

    window.location.reload();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Actualizar estado</h3>

        <p className="text-sm text-gray-500 mb-4">
          Shipment: {shipment.orderId}
        </p>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Seleccione estado</option>

          {AVAILABLE_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="bg-brand-sage text-white px-4 py-2 rounded-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
