import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-10">Shipping Admin</h1>

      <nav className="flex flex-col gap-4">
        <Link href="/admin">Dashboard</Link>

        <Link href="/admin/users">Usuarios</Link>

        <Link href="/admin/shipments">Pedidos</Link>
      </nav>
    </aside>
  );
}
