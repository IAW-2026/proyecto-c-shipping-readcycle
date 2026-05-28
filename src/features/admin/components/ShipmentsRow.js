"use client";

export default function ShipmentRow({ shipment }) {
  const latestStatus = shipment.statuses[0]?.description || "PENDING";

  async function handleCancel() {
    const confirmCancel = confirm("¿Cancelar shipment?");

    if (!confirmCancel) {
      return;
    }

    await fetch(`/api/shipments/${shipment.id}/tracking`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        description: "CANCELLED",
      }),
    });

    window.location.reload();
  }

  return (
    <tr className="border-t text-black">
      <td className="p-4">{shipment.id}</td>

      <td className="p-4">{shipment.orderId}</td>

      <td className="p-4">{shipment.carrierId}</td>

      <td className="p-4">{latestStatus}</td>

      <td className="p-4">
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">
            Editar
          </button>

          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Cancelar
          </button>
        </div>
      </td>
    </tr>
  );
}
