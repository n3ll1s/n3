import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Header = ({ session }: any) => {
  const router = useRouter();
  return (
    <header className="bg-black p-5">
      <div className="hidden md:flex container mx-auto items-center justify-between flex-col lg:flex-row mb-5 lg:mb-0">
        <Link href={`/`} className="text-4xl font-bold text-white">
          <Image
            src={"/logo.png"}
            width={100}
            height={50}
            objectFit="cover"
            alt={"logo"}
          />
        </Link>
        <div className="text-white flex items-center gap-x-6">
          <Link href="#about" className="hover:text-white/70 transition">
            О нас
          </Link>
          <Link href="#projects" className="hover:text-white/70 transition">
            Проекты
          </Link>
          <Link href="#contacts" className="hover:text-white/70 transition">
            Контакты
          </Link>
          {session ? (
            <>
              <Button
                onClick={() => router.push("/profile")}
                className="hover:text-black/70 text-black transition bg-white hover:bg-white/80"
              >
                Профиль
              </Button>
              <LogOut
                size={20}
                onClick={() => signOut()}
                className="hover:cursor-pointer hover:text-white/80 transition"
              />
            </>
          ) : (
            <>
              <Button
                onClick={() => router.push("/login")}
                className="bg-white text-black hover:bg-white/80 hover:text-black-80"
              >
                Вход
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between">
        <Link href={`/`} className="text-xl font-bold text-white">
          ОАТИ
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
