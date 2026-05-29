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

export default function ShipmentRow({ shipment, carriers, canAssignCarrier }) {
  const [expanded, setExpanded] = useState(false);

  const latestStatus = shipment.statuses[0]?.description || "PENDING";

  async function handleStatusChange(status) {
    await fetch(`/api/shipments/${shipment.id}/tracking`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        description: status,
      }),
    });

    window.location.reload();
  }

  async function handleCarrierAssign(carrierId) {
    await fetch(`/api/shipments/${shipment.id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        carrierId,
      }),
    });

    window.location.reload();
  }

  return (
    <>
      <tr className="border-t text-black">
        <td className="p-4">{shipment.id}</td>

        <td className="p-4">{shipment.orderId}</td>

        {canAssignCarrier && (
          <td className="p-4">
            <select
              value={shipment.carrierId || ""}
              onChange={(e) => handleCarrierAssign(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Sin asignar</option>

              {carriers.map((carrier) => (
                <option key={carrier.id} value={carrier.id}>
                  {carrier.username}
                </option>
              ))}
            </select>
          </td>
        )}

        <td className="p-4">
          <div className="flex flex-col gap-2">
            <span>{latestStatus}</span>

            <select
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border rounded px-2 py-1"
              defaultValue=""
            >
              <option disabled value="">
                Cambiar estado
              </option>

              {AVAILABLE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </td>

        <td className="p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              {expanded ? "Ocultar" : "Tracking"}
            </button>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr className="text-black bg-gray-50">
          <td colSpan={5} className="p-4">
            <div className="flex flex-col gap-2">
              {shipment.statuses.map((status) => (
                <div
                  key={status.id}
                  className="border rounded p-2 flex justify-between"
                >
                  <span>{status.description}</span>

                  <span>{new Date(status.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
