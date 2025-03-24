"use client";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const UsersPage = () => {
  interface User {
    id: string;
    name: string;
    last_name: string;
    phone: string;
    email: string;
    date_birth: string;
    cpf: string;
    city: string;
    state: string;
    created_at: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = () => {
    fetch("http://localhost:8000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar usuários:", err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (id: string) => {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchUsers();
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir usuário:", err);
      });
  };

  return (
    <div className="w-full space-y-8">
      <h1 className="text-3xl font-bold">Usuários</h1>
      <Card className="my-6 p-6">
        <h3 className="text-sm font-medium text-muted-foreground">
          Total de Usuários
        </h3>
        <p className="text-2xl font-bold">{users.length}</p>
      </Card>
      <ScrollArea className="h-[600px]">
        <Table className="relative w-full">
          <TableCaption>Lista de usuários registrados.</TableCaption>
          <TableHeader className="bg-primary text-zinc-300">
            <TableRow className="hover:bg-primary">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Sobrenome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="">Data de Criação</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell
                  style={{
                    width: "100px",
                    maxWidth: "100px",
                  }}
                  className="truncate"
                >
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell
                  className="truncate"
                  style={{
                    width: "100px",
                    maxWidth: "100px",
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell>
                  {new Date(user.date_birth).toLocaleDateString()}
                </TableCell>
                <TableCell>{user.cpf}</TableCell>
                <TableCell className="truncate">{user.city}</TableCell>
                <TableCell className="uppercase">{user.state}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Trash
                    onClick={() => deleteUser(user.id)}
                    className="cursor-pointer text-red-800"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-transparent">
            <TableRow>
              <TableCell colSpan={9}>Total de Usuários</TableCell>
              <TableCell className="text-right">{users.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default UsersPage;
