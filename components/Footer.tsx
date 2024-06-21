import { Mail, Phone } from "lucide-react";
import BrowserIcon from "./BrowserIcon";
import TelegramIcon from "./TelegramIcon";
import VkIcon from "./VkIcon";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container mx-auto py-10 flex items-center justify-center gap-x-5">
        <a
          href="https://www.mos.ru/oati/?amp&"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BrowserIcon />
        </a>
        <a
          href="mailto:ad.oati@mos.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail size={34} className="text-white bg-transparent rounded-xl" />
        </a>
        <a
          href="https://t.me/mosoati"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon />
        </a>
        <a
          href="https://vk.com/mosoati"
          target="_blank"
          rel="noopener noreferrer"
        >
          <VkIcon />
        </a>
        <a href="tel:+74956907770" target="_blank" rel="noopener noreferrer">
          <Phone size={34} className="text-white" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
