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

export default function ShipmentRow({
  shipment,
  carriers,
  canAssignCarrier,
  onOpenStatusModal,
}) {
  const [expanded, setExpanded] = useState(false);

  const latestStatus = shipment.currentStatus;

  function getStatusClass(status) {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "IN_TRANSIT":
        return "bg-blue-100 text-blue-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      case "CANCELLED":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-orange-100 text-orange-700";
    }
  }

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
      <tr className="text-brand-forest hover:bg-brand-beige transition-colors">
        <td className="px-4 py-2">{shipment.id}</td>

        <td className="px-4 py-2">{shipment.orderId}</td>

        {canAssignCarrier && (
          <td className="px-4 py-2">
            {carriers.find((e) => e.id == shipment.carrierId).username}
            {/* <select
              value={shipment.carrierId || ""}
              onChange={(e) => handleCarrierAssign(e.target.value)}
              className="
              border border-brand-sand
              rounded-lg
              px-3
              py-2
              bg-white
              text-brand-forest
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
              "
            >
              <option value="">Sin asignar</option>

              {carriers.map((carrier) => (
                <option key={carrier.id} value={carrier.id}>
                  {carrier.username}
                </option>
              ))}
            </select>*/}
          </td>
        )}

        <td className="px-4 py-2">
          <div className="flex flex-col gap-2">
            <span
              className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                latestStatus,
              )}`}
            >
              {latestStatus}
            </span>

            {/* <select
              onChange={(e) => handleStatusChange(e.target.value)}
              className="
              border border-brand-sand
              rounded-lg
              px-3
              py-2
              bg-white
              text-brand-forest
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
              "
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
            </select>*/}
          </div>
        </td>

        <td className="px-4 py-2">
          <div className="flex gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className={`
              ${
                expanded
                  ? "bg-brand-clay"
                  : "bg-brand-sage hover:bg-brand-forest"
              }
              text-white
              px-4
              py-2
              rounded-lg
              font-medium
              transition-colors
              `}
            >
              {expanded ? "Ocultar" : "Tracking"}
            </button>
            {canAssignCarrier && (
              <button
                onClick={() => onOpenStatusModal(shipment)}
                className="bg-brand-clay text-white px-4 py-2 rounded-lg"
              >
                Actualizar Estado
              </button>
            )}
          </div>
        </td>
      </tr>

      {expanded && (
        <tr className="bg-brand-beige text-brand-forest">
          <td colSpan={5} className="px-4 py-2">
            <div className="flex flex-col gap-1 text-sm">
              {shipment.statuses.map((status) => (
                <div
                  key={status.id}
                  className="
                    bg-white
                    border
                    border-brand-sand
                    rounded-lg
                    px-3
                    py-2
                    flex
                    justify-between
                    items-center
                  "
                >
                  <span className="font-medium text-sm">
                    {status.description}
                  </span>

                  <span className="text-xs text-brand-sage">
                    {new Date(status.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
      {/* {statusModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Actualizar estado</h3>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Seleccione estado</option>

              {AVAILABLE_STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>

              <button
                onClick={async () => {
                  await handleStatusChange(selectedStatus);
                  setStatusModalOpen(false);
                }}
                className="bg-brand-sage text-white px-4 py-2 rounded-lg"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}*/}
    </>
  );
}
