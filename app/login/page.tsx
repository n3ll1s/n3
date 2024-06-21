"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    try {
      router.push("/");
      toast.success("Вы успешно вошли");
    } catch (error: any) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col justify-center space-y-4 p-4 rounded-md mt-24 shadow-md"
      >
        <h1 className="text-3xl">Вход</h1>
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
            Войти
          </Button>
          <p className="text-muted-foreground mt-4">
            Нет аккаунта?{" "}
            <Link href={`/register`} className="hover:text-blue-400 transition">
              Зарегистрироваться
            </Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
