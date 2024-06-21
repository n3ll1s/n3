import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={20} className="text-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex flex-col gap-y-10 mt-24">
              <Link href="#about" className="hover:text-white/70 transition">
                О нас
              </Link>
              <Link href="#projects" className="hover:text-white/70 transition">
                Проекты
              </Link>
              <Link href="#contacts" className="hover:text-white/70 transition">
                Контакты
              </Link>
            </div>
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
