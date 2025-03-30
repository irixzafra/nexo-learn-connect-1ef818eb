
import { DataTable } from "./DataTable";
import { createColumn, createActionsColumn } from "./DataTableUtils";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

// Tipo de datos de ejemplo
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

// Datos de ejemplo
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "inactive",
  },
];

// Definición de columnas
const columns = [
  createColumn<User>({
    accessorKey: "name",
    header: "Nombre",
  }),
  createColumn<User>({
    accessorKey: "email",
    header: "Email",
  }),
  createColumn<User>({
    accessorKey: "role",
    header: "Rol",
  }),
  createColumn<User>({
    accessorKey: "status",
    header: "Estado",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <div className={`capitalize ${status === "active" ? "text-green-600" : "text-red-600"}`}>
          {status === "active" ? "Activo" : "Inactivo"}
        </div>
      );
    },
  }),
  createActionsColumn<User>(({ row }) => {
    const user = row.original;
    return (
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={() => console.log("Edit", user)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => console.log("Delete", user)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }),
];

export function DataTableExample() {
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Ejemplo de Tabla de Usuarios</h1>
      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Buscar usuarios..."
        searchColumn="name"
        initialSorting={[{ id: "name", desc: false }]}
      />
    </div>
  );
}
