import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-full">
      <nav className="flex justify-between p-5 items-center">
        <h1 className="font-bold text-2xl">ACME S.A</h1>
        <UserButton />
      </nav>
      <div className="flex text-4xl justify-center p-5">
        <h2>Portal de Envios</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
