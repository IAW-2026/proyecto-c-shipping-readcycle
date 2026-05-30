"use client";

export default function ShipmentFilters({ filters, carriers, onFilterChange }) {
  return (
    <div className="bg-white border border-brand-sand rounded-xl p-4 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-forest mb-1">
            Shipment ID
          </label>

          <input
            type="text"
            value={filters.shipmentId}
            onChange={(e) => onFilterChange("shipmentId", e.target.value)}
            placeholder="Buscar shipment..."
            className="
              w-full
              border
              border-brand-sand
              rounded-lg
              px-3
              py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
            "
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-forest mb-1">
            Estado
          </label>

          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="
              w-full
              border
              border-brand-sand
              rounded-lg
              px-3
              py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
            "
          >
            <option value="">Todos</option>

            <option value="PENDING">Pending</option>
            <option value="PICKED_UP">Picked Up</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="OUT_FOR_DELIVERY">Out For Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="FAILED">Failed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-forest mb-1">
            Carrier
          </label>

          <select
            value={filters.carrierId}
            onChange={(e) => onFilterChange("carrierId", e.target.value)}
            className="
              w-full
              border
              border-brand-sand
              rounded-lg
              px-3
              py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-brand-sage
            "
          >
            <option value="">Todos</option>

            {carriers.map((carrier) => (
              <option key={carrier.id} value={carrier.id}>
                {carrier.username}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
