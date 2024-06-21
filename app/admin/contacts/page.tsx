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
import { IContacts } from "@/types/contacts";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const statusOptions = [
  { value: "PENDING", label: "В обработке" },
  { value: "IN_PROGRESS", label: "В работе" },
  { value: "COMPLETED", label: "Завершена" },
  { value: "CANCELLED", label: "Отменена" },
];

const Contacts = () => {
  const [contacts, setContacts] = useState<IContacts[]>([]);
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
    async function fetchContacts() {
      try {
        const response = await fetch("/api/contact");
        if (!response.ok) {
          throw new Error("Не удалось получить контакты");
        }
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Не удалось получить контакты:", error);
      }
    }

    fetchContacts();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Не удалось обновить статус");
      }

      setContacts(
        contacts.map((contact) =>
          contact.id === id ? { ...contact, status: newStatus } : contact
        )
      );
      toast.success("Стутс изменен");
    } catch (error) {
      console.error("Не удалось обновить статус:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isAdmin ? (
        <div className="flex flex-col gap-y-5 w-full max-w-7xl ">
          <div className="w-full border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Почта</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isAdmin ? (
                  contacts.length > 0 ? (
                    contacts.map((contact: IContacts) => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.firstName}</TableCell>
                        <TableCell>{contact.lastName}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>
                          <select
                            className="block w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:border-blue-500"
                            value={contact.status ?? "PENDING"}
                            onChange={(e) =>
                              handleStatusChange(
                                contact.id as string,
                                e.target.value
                              )
                            }
                          >
                            {statusOptions.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                className="bg-white text-gray-800"
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Контакты не найдены
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  <TableRow className="text-muted-foreground text-center">
                    Доступ запрещен
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

export default Contacts;
