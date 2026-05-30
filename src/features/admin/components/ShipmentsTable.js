import ShipmentRow from "./ShipmentsRow";

export default function ShipmentsTable({ shipments, carriers, permissions }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-brand-sand overflow-hidden">
      <table className="w-full">
        <thead className="bg-brand-forest text-white">
          <tr>
            <th className="text-left px-6 py-4 font-semibold tracking-wide">
              ID
            </th>

            {permissions.canAssignCarrier && (
              <th className="text-left px-6 py-4 font-semibold tracking-wide">
                Order ID
              </th>
            )}

            <th className="text-left px-6 py-4 font-semibold tracking-wide">
              Carrier ID
            </th>

            <th className="text-left px-6 py-4 font-semibold tracking-wide">
              Estado
            </th>

            <th className="text-left px-6 py-4 font-semibold tracking-wide">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-brand-sand">
          {shipments.map((shipment) => (
            <ShipmentRow
              key={shipment.id}
              shipment={shipment}
              carriers={carriers}
              canAssignCarrier={permissions.canAssignCarrier}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
