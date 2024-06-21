import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const NewsItem = ({ news }: any) => {
  const router = useRouter();
  return (
    <div className="border space-y-6 p-4 rounded-xl mb-4 w-full shadow-sm max-w-[400px] flex flex-col h-[350px]">
      <h2 className="text-2xl font-bold line-clamp-3 flex-shrink-0 text-center">
        {news.name}
      </h2>
      <div className="flex-grow overflow-hidden flex flex-col">
        <Image
          src={news.imageUrl}
          alt={news.name}
          width={500}
          height={500}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
      <Button
        className="mt-4"
        variant={"ghost"}
        onClick={() => router.push(`/news/${news.id}`)}
      >
        Подробнее
      </Button>
    </div>
  );
};

export default NewsItem;
