"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { toast } from "react-toastify";

const CreateNews = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [deadline, setDeadlint] = useState("");
  const [description, setDescription] = useState("");
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/news/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, goal, imageUrl, deadline, description }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Проект успешно создан");
        router.push(`/news/${data.id}`);
      } else {
        toast.error("Что-то пошло не так");
        console.error("Failed to create news");
      }
    } catch (error) {
      toast.error("Что-то пошло не так");
      console.error("Failed to create news:", error);
    }
  };

  return (
    <div className="mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      {isAdmin ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Создать проект</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Имя проекта:
              </Label>
              <Input
                type="text"
                id="title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Цель проекта:
              </Label>
              <Textarea
                id="title"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Фото проекта:
              </Label>
              <UploadDropzone
                endpoint={"image"}
                onClientUploadComplete={(res) => {
                  if (res?.[0].url) {
                    console.log("GJ!", res?.[0].url);
                    setImageUrl(res?.[0].url);
                    toast.success("Фото загружено успешно");
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Ooops something is wrong", error);
                }}
              />
              <div className="text-xs text-muted-foreground mt-4">
                16:9 рекомендованное разрешение
              </div>
              {imageUrl && (
                <div>
                  <Image
                    alt="Upload"
                    width={350}
                    height={350}
                    className="object-cover rounded-md"
                    src={imageUrl}
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <Label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Сроки реализации проекта:
              </Label>
              <Input
                id="content"
                value={deadline}
                onChange={(e) => setDeadlint(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <Label
                htmlFor="authorId"
                className="block text-sm font-medium text-gray-700"
              >
                Описание проекта:
              </Label>
              <Textarea
                id="authorId"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-col gap-y-6">
              <Button
                variant={"default"}
                type="submit"
                className="w-full bg-green-500 hover:bg-green-500/80 "
              >
                Создать
              </Button>
              <Button
                variant={"ghost"}
                type="button"
                className="w-full border"
                onClick={() => router.push("/")}
              >
                Назад
              </Button>
            </div>
          </form>
        </>
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

export default CreateNews;
