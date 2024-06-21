"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Не удалось получить информацию о пользователе");
        }
        const user = await response.json();
        setIsAdmin(user.isAdmin);
        if (!user.isAdmin) {
          router.push("/");
        }
      } catch (error) {
        console.error("Не удалось получить информацию о пользователе:", error);
        router.push("/");
      }
    }

    fetchUser();
  }, [router]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Не удалось получить пользователей");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Не удалось получить пользователей:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleAdminChange = async (id: string, newStatus: boolean) => {
    try {
      const response = await fetch(`/api/users/${id}/admin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Не удалось обновить статус администратора");
      }

      setUsers(
        users.map((user: any) =>
          user.id === id ? { ...user, isAdmin: newStatus } : user
        )
      );
      toast.success("Статус администратора изменен");
    } catch (error) {
      console.error("Не удалось обновить статус администратора:", error);
      toast.error("Не удалось обновить статус администратора");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isAdmin ? (
        <div className="flex flex-col gap-y-5 w-full max-w-7xl">
          <div className="w-full border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Почта</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Права доступа</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <select
                          className="block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:border-blue-500"
                          value={user.isAdmin ? "true" : "false"}
                          onChange={(e) =>
                            handleAdminChange(
                              user.id,
                              e.target.value === "true"
                            )
                          }
                        >
                          <option
                            value="true"
                            className="bg-white text-gray-800"
                          >
                            Администратор
                          </option>
                          <option
                            value="false"
                            className="bg-white text-gray-800"
                          >
                            Пользователь
                          </option>
                        </select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Пользователи не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Button variant={"outline"} onClick={() => router.back()}>
            Назад
          </Button>
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-3xl text-center text-muted-foreground">
            Нет прав доступа
          </h1>
        </div>
      )}
    </div>
  );
};

export default Users;
