"use client";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { IContacts } from "@/types/contacts";
import convertToMoscowAndTime from "@/utils/convertToMoscowTime";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "react-toastify";

const statusOptions = [
  { value: "PENDING", label: "В обработке" },
  { value: "IN_PROGRESS", label: "В работе" },
  { value: "COMPLETED", label: "Завершена" },
  { value: "CANCELLED", label: "Отменена" },
];

const ProfilePage = () => {
  const { data: session } = useSession();
  const [contacts, setContacts] = useState<IContacts[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [rating, setRating] = useState("");

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch("/api/findcontact");
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

  const getStatusValue = (value: any) => {
    switch (value) {
      case "PENDING":
        return "В обработке";
      case "IN_PROGRESS":
        return "В работе";
      case "COMPLETED":
        return "Завершена";
      case "CANCELLED":
        return "Отменена";
    }
  };

  const handleOpen = (contactId: any) => {
    setSelectedContactId(contactId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRating("");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/findcontact/${selectedContactId}`
      );
      if (response.status === 200) {
        setContacts(
          contacts.filter((contact) => contact.id !== selectedContactId)
        );
        toast.success("Объявление удалено");
        handleClose();
      }
    } catch (error) {
      toast.error("Объявление не удалось удалить");
      console.error("Ошибка при удалении контакта:", error);
    }
  };

  return (
    <>
      <Header session={session} />
      <h1 className="text-3xl text-center my-4">
        Имя профиля: {session?.user?.name}
      </h1>
      <div className="container mx-auto max-w-[70%]">
        <div className="border rounded-md w-full flex justify-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата подачи</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Статус заявления</TableHead>
                <TableHead>Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.length > 0 ? (
                contacts.map((contact: IContacts) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      {convertToMoscowAndTime(contact.createdAt as string)}
                    </TableCell>
                    <TableCell>{contact.id}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell
                      className={`${
                        contact.status === "PENDING"
                          ? "text-blue-500"
                          : contact.status === "IN_PROGRESS"
                          ? "text-yellow-400"
                          : contact.status === "COMPLETED"
                          ? "text-green-500"
                          : contact.status === "CANCELLED"
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {getStatusValue(contact.status as string)}
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"destructive"}
                            onClick={() => handleOpen(contact.id)}
                          >
                            Отменить
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Оцените работу</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogDescription>
                            <Select onValueChange={setRating}>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите оценку" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="long_wait">
                                  Долго ждать
                                </SelectItem>
                                <SelectItem value="poor_service">
                                  Плохое обслуживание
                                </SelectItem>
                                <SelectItem value="not_satisfied">
                                  Не удовлетворён
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogAction onClick={handleDelete}>
                              Удалить
                            </AlertDialogAction>
                            <AlertDialogCancel onClick={handleClose}>
                              Отменить
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Обращение не найдено
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
