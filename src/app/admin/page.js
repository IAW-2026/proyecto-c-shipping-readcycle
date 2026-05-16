import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const [totalUsers, totalOperators, totalDrivers, activeUsers] =
    await Promise.all([
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
    ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-black mb-8">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        <Card title="Usuarios" value={totalUsers} />

        <Card title="Operadores" value={totalOperators} />

        <Card title="Transportistas" value={totalDrivers} />

        <Card title="Usuarios activos" value={activeUsers} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-4xl text-black font-bold mt-4">{value}</p>
    </div>
  );
}
