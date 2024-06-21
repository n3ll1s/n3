"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { IProject } from "@/types/project";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function NewsPage() {
  const { id } = useParams() as { id: string };
  const { data: session } = useSession();
  const [news, setNews] = useState<IProject>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/user");
        const user = await response.json();
        setIsAdmin(user.isAdmin);
      } catch (error) {
        console.error("Не удалось получить информацию о пользователе:", error);
      }
    }

    fetchUser();
  }, [router]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`/api/news/${id}`);
        if (!response.ok) {
          throw new Error("Новость не найдена");
        }
        const newsData = await response.json();
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchNews();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Проект удален");
        router.push("/");
      } else {
        throw new Error("Не удалось удалить проект");
      }
    } catch (error) {
      toast.error("Не удалось удалить проект");
      console.error("Error deleting news:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!news) {
    return <div>Новость не найдена</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header session={session} />
      <main className="flex-grow">
        <section className="container flex items-center justify-center py-10">
          <h1 className="text-3xl text-center">{news.name}</h1>
        </section>
        <hr className="bg-darkGreen w-full h-1" />
        <section className="container my-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-x-16 md:pl-36">
            <div className="flex flex-col gap-y-5 max-w-[380px]">
              <div>
                <h2>Цель проекта:</h2>
                <hr className="bg-darkGreen w-[150px] h-1" />
                <p>{news.goal}</p>
              </div>
              <div>
                <h2>Сроки реализации проекта:</h2>
                <hr className="bg-darkGreen w-[270px] h-1" />
                <p>{news.deadline}</p>
              </div>
            </div>
            <div>
              {news?.imageUrl ? (
                <Image
                  src={news.imageUrl}
                  alt={news.name}
                  width={727}
                  height={410}
                  className="h-full border border-black object-cover rounded-xl mt-8 md:mt-0"
                />
              ) : (
                <div className="h-[410px] flex items-center justify-center bg-gray-200 border border-black">
                  Нет картинки
                </div>
              )}
            </div>
          </div>
          <div className="py-12 md:pl-36">
            <h2 className="">Описание:</h2>
            <hr className="bg-darkGreen w-[270px] h-1" />
            <p className=" ">{news.description}</p>
          </div>
        </section>
        {isAdmin && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Удалить новость
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
