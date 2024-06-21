"use client";

import { useRouter } from "next/navigation";
import NewsItem from "../components/NewsItem";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AboutCompany from "@/components/AboutCompany";
import Contacts from "@/components/Contacts";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [news, setNews] = useState([]);
  console.log(session);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`/api/news`);
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const newsData = await response.json();
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="mx-auto">
      <Header session={session} />
      <Image
        src={`/heroimage.png`}
        width={1200}
        height={1200}
        objectFit="cover"
        alt="hero_image"
        className="w-full"
      />
      <AboutCompany />
      <Contacts />
      <section id="projects" className="py-10 bg-white">
        <div className="flex items-center justify-center flex-col gap-y-4">
          <p className="text-3xl text-center">Проекты</p>
          <hr className="w-[200px] bg-darkGreen h-[2px] mb-4" />
        </div>
        {news.length > 0 ? (
          <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {news?.map((item: any) => (
              <NewsItem key={item.id} news={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-muted-foreground">
            Проектов нет
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
