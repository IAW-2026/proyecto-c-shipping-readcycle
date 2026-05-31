import { UserButton } from "@clerk/nextjs";

export default function Topbar({ user }) {
  return (
    <header className="bg-white border-b border-brand-sand px-8 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-brand-forest font-bold text-2xl">Admin Panel</h2>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-brand-sage">{user.username}</span>

          <UserButton />
        </div>
      </div>
    </header>
  );
}
