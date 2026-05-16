import UserRow from "./UserRow"

export default function UsersTable({ users }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">
              Username
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-left p-4">
              Rol
            </th>

            <th className="text-left p-4">
              Estado
            </th>

            <th className="text-left p-4">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
