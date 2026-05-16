export default function Topbar({ user }) {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black font-semibold text-xl">Admin Panel</h2>
        </div>

        <div>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
    </header>
  );
}
