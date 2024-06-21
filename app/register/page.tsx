"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col justify-center space-y-4 p-4 rounded-md mt-24 shadow-md"
      >
        <h1 className="text-3xl">Регистрация</h1>
        <div className="w-[500px]">
          <Label>Имя</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="w-[500px]">
          <Label>Почта</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-[500px]">
          <Label>Пароль</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <Button variant={"default"} type="submit" className="w-[500px]">
            Зарегистрироваться
          </Button>
          <p className="text-muted-foreground mt-4">
            Есть аккаунт?{" "}
            <Link href={`/login`} className="hover:text-blue-400 transition">
              Войти
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
