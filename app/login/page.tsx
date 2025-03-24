"use client";
import { ArrowRight, LockKeyhole, Mail, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const Login = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 5) return "Boa madrugada!";
    if (hour >= 5 && hour < 12) return "Bom dia!";
    if (hour >= 12 && hour < 18) return "Boa tarde!";
    return "Boa noite!";
  };

  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex h-screen items-center justify-center font-rethink">
      <section className="mx-auto grid h-[500px] w-[1000px] grid-cols-2 overflow-hidden rounded-lg shadow-2xl">
        <div className="bg-[url('/farmabot.png')] bg-cover"></div>
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <div>
            <h1 className="text-4xl font-bold">Olá, {greeting}</h1>
            <h3 className="text-zinc-500">Faça login para começar</h3>
          </div>
          <form className="flex w-3/5 flex-col gap-4">
            <div className="flex h-10 w-full items-center gap-2 rounded-sm border bg-zinc-100 px-3">
              <UsersRound className="text-zinc-400" size={16} />
              <input
                className="w-3/4 bg-transparent focus:outline-none"
                type="text"
                placeholder="Nome da Empresa"
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px #f4f4f5 inset",
                }}
              />
            </div>
            <div className="flex h-10 w-full items-center gap-2 rounded-sm border bg-zinc-100 px-3">
              <Mail className="text-zinc-400" size={16} />
              <input
                className="w-3/4 bg-transparent focus:outline-none"
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px #f4f4f5 inset",
                }}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="flex h-10 w-full items-center gap-2 rounded-sm border bg-zinc-100 px-3">
              <LockKeyhole className="text-zinc-400" size={16} />
              <input
                className="w-3/4 bg-transparent focus:outline-none"
                type="password"
                placeholder="Senha"
                style={{
                  WebkitBoxShadow: "0 0 0px 1000px #f4f4f5 inset",
                }}
              />
            </div>
            <button className="rounded-sm bg-primary p-2 text-secondary">
              <Link
                href={"/dashboard"}
                className="flex items-center justify-center gap-2"
              >
                Entrar
                <ArrowRight size={16} />
              </Link>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
