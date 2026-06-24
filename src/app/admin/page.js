import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    totalUsers,
    totalOperators,
    totalCarriers,
    activeUsers,

    totalShipments,
    pendingShipments,
    inTransitShipments,
    deliveredShipments,

    failedShipments,
    unassignedShipments,

    recentShipments,
    topCarriers,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
      where: {
        role: "OPERATOR",
      },
    }),

    prisma.user.count({
      where: {
        role: "CARRIER",
      },
    }),

    prisma.user.count({
      where: {
        isActive: true,
      },
    }),

    prisma.shipment.count(),

    prisma.shipment.count({
      where: {
        currentStatus: "PENDING",
      },
    }),

    prisma.shipment.count({
      where: {
        currentStatus: "IN_TRANSIT",
      },
    }),

    prisma.shipment.count({
      where: {
        currentStatus: "DELIVERED",
      },
    }),

    prisma.shipment.count({
      where: {
        currentStatus: "FAILED",
      },
    }),

    prisma.shipment.count({
      where: {
        carrierId: null,
      },
    }),

    prisma.shipment.findMany({
      take: 5,

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.user.findMany({
      where: {
        role: "CARRIER",
      },

      include: {
        shipments: true,
      },
    }),
  ]);

  const sortedCarriers = topCarriers
    .map((carrier) => ({
      ...carrier,
      shipmentCount: carrier.shipments.length,
    }))
    .sort((a, b) => b.shipmentCount - a.shipmentCount)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-brand-forest">Dashboard</h1>

        <div className="w-24 h-1 bg-brand-clay rounded-full mt-3" />
      </div>

      <section>
        <h2 className="text-xl font-semibold text-brand-forest mb-4">
          Usuarios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card title="Usuarios" value={totalUsers} />

          <Card title="Operadores" value={totalOperators} />

          <Card title="Transportistas" value={totalCarriers} />

          <Card title="Usuarios activos" value={activeUsers} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-brand-forest mb-4">Envíos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card title="Total envíos" value={totalShipments} />

          <Card title="Pendientes" value={pendingShipments} />

          <Card title="En tránsito" value={inTransitShipments} />

          <Card title="Entregados" value={deliveredShipments} />
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-brand-sand p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-brand-forest mb-4">
            Alertas
          </h3>

          <div className="space-y-3">
            <AlertItem label="Envíos fallidos" value={failedShipments} />

            <AlertItem
              label="Sin transportista asignado"
              value={unassignedShipments}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-brand-sand p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-brand-forest mb-4">
            Top transportistas
          </h3>

          <div className="space-y-3">
            {sortedCarriers.length === 0 && (
              <p className="text-brand-sage">No hay transportistas.</p>
            )}

            {sortedCarriers.map((carrier) => (
              <div key={carrier.id} className="flex justify-between">
                <span>{carrier.username}</span>

                <span className="font-semibold">{carrier.shipmentCount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-sand shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-brand-sand">
          <h3 className="text-xl font-semibold text-brand-forest">
            Últimos envíos
          </h3>
        </div>

        <table className="w-full">
          <thead className="bg-brand-forest text-white">
            <tr>
              <th className="text-left px-4 py-3">Shipment ID</th>

              <th className="text-left px-4 py-3">Order ID</th>

              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-brand-sand">
            {recentShipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-brand-beige">
                <td className="px-4 py-3">{shipment.id}</td>

                <td className="px-4 py-3">{shipment.orderId}</td>

                <td className="px-4 py-3">
                  <StatusBadge status={shipment.currentStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border
        border-brand-sand
        px-5
        py-4
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <span
          className="
            text-sm
            text-brand-sage
            font-medium
          "
        >
          {title}
        </span>

        <span
          className="
            text-2xl
            font-bold
            text-brand-forest
          "
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function AlertItem({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span>{label}</span>

      <span className="font-bold text-brand-clay">{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    DELIVERED: "bg-green-100 text-green-700",
    IN_TRANSIT: "bg-blue-100 text-blue-700",
    FAILED: "bg-red-100 text-red-700",
    CANCELLED: "bg-gray-200 text-gray-700",
    PENDING: "bg-orange-100 text-orange-700",
    PICKED_UP: "bg-indigo-100 text-indigo-700",
    OUT_FOR_DELIVERY: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span
      className={`
        inline-flex
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}
