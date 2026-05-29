import ShipmentRow from "./ShipmentsRow";

export default function ShipmentsTable({ shipments, carriers, permissions }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="text-left p-4">ID</th>

            {permissions.canAssignCarrier && (
              <th className="text-left p-4">Order ID</th>
            )}

            <th className="text-left p-4">Carrier ID</th>

            <th className="text-left p-4">Estado</th>

            <th className="text-left p-4">Acciones</th>
          </tr>
        </thead>

        <tbody>
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
