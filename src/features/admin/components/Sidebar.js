import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-brand-forest text-white flex flex-col">
      <div className="px-6 py-8 border-b border-brand-sage">
        <h1 className="text-2xl font-bold tracking-wide">
          ReadCycle Logistics
        </h1>

        <p className="text-sm text-brand-sand mt-1">Administration</p>
      </div>

      <nav className="flex flex-col p-4 gap-2">
        <Link
          href="/admin"
          className="
            px-4
            py-3
            rounded-lg
            hover:bg-brand-sage
            transition-colors
          "
        >
          Dashboard
        </Link>

        <Link
          href="/admin/users"
          className="
            px-4
            py-3
            rounded-lg
            hover:bg-brand-sage
            transition-colors
          "
        >
          Usuarios
        </Link>

        <Link
          href="/admin/shipments"
          className="
            px-4
            py-3
            rounded-lg
            hover:bg-brand-sage
            transition-colors
          "
        >
          Pedidos
        </Link>
      </nav>
    </aside>
  );
}
