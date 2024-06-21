import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

const Contacts = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, firstName, lastName }),
      });

      if (response.ok) {
        toast.success("Заявка успешно отправлена");
        setEmail("");
        setPhone("");
        setFirstName("");
        setLastName("");
      } else {
        toast.error("Ошибка при отправке заявки");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Произошла ошибка при отправке заявки");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="contacts" className="bg-mainGrey">
      <div className="container py-10 flex flex-col items-center gap-y-8">
        <h2 className="text-3xl">
          Оставить заявку на консультацию по размещению вывески
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-y-4 w-full"
        >
          <Input
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-[617px]"
          />
          <Input
            type="tel"
            placeholder="Номер"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="max-w-[617px]"
          />
          <Input
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="max-w-[617px]"
          />
          <Input
            type="text"
            placeholder="Описание"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="max-w-[617px]"
          />
          <Button
            variant={"default"}
            type="submit"
            disabled={isLoading}
            className="bg-black"
          >
            {isLoading ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
