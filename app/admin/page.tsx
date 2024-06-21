"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const pathname = usePathname();
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

  return (
    <div className="flex items-center justify-center">
      {isAdmin ? (
        <div className="flex flex-col items-center justify-center gap-y-10 mt-28">
          <Button onClick={() => router.push(`${pathname}/contacts`)}>
            Обращения
          </Button>
          <Button onClick={() => router.push(`${pathname}/users`)}>
            Пользователи
          </Button>
          <Button variant={"outline"} onClick={() => router.push("/")}>
            На главную
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

export default Admin;
