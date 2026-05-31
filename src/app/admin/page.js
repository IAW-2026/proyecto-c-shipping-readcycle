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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-brand-forest">Dashboard</h1>

        <div className="w-24 h-1 bg-brand-clay rounded-full mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-brand-sand
        p-6
        shadow-sm
        hover:shadow-md
        transition-shadow
      "
    >
      <h3 className="text-brand-sage text-sm font-medium uppercase tracking-wide">
        {title}
      </h3>

      <p className="text-5xl text-brand-forest font-bold mt-3">{value}</p>
    </div>
  );
}
