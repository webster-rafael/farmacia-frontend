"use client";

import { Card } from "@/components/ui/card";
import { LineChart, BarChart } from "@/components/dashboard/charts";
import { MessagesList } from "@/components/dashboard/messages-list";
import { Overview } from "@/components/dashboard/overview";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    messagesReceived: 0,
    messagesReceivedToday: 0,
    responseRate: 0,
    activeUsers: 0,
  });

  const fetchActiveUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/activeUsers");
      const data = await res.json();
      setStats((prevStats) => ({
        ...prevStats,
        activeUsers: data.activeUsers,
      }));
    } catch (error) {
      console.error("Erro ao buscar usuários ativos:", error);
    }
  };

  const fetchMessagesToday = async () => {
    try {
      const res = await fetch("http://localhost:8000/messagesToday");
      const data = await res.json();
      setStats((prevStats) => ({
        ...prevStats,
        messagesReceivedToday: data.messagesReceivedToday,
      }));
    } catch (error) {
      console.error(
        "Erro ao buscar a quantidade de mensagens recebidas hoje:",
        error,
      );
    }
  };

  const fetchMessagesCount = async () => {
    try {
      const res = await fetch("http://localhost:8000/messagesCount");
      const data = await res.json();

      setStats((prevStats) => ({
        ...prevStats,
        messagesReceived: data.messagesReceived,
      }));
    } catch (error) {
      console.error("Erro ao buscar a quantidade de mensagens:", error);
    }
  };

  useEffect(() => {
    fetchMessagesToday();
    fetchMessagesCount();
    fetchActiveUsers();

    const intervalId = setInterval(() => {
      fetchMessagesCount();
      fetchMessagesToday();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Mensagens de hoje
          </h3>
          <p className="text-2xl font-bold">
            {stats.messagesReceivedToday.toLocaleString()}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Todas as mensagens
          </h3>
          <p className="text-2xl font-bold">{stats.messagesReceived}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Taxa de resposta
          </h3>
          <p className="text-2xl font-bold">{stats.responseRate}%</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Usuários ativos
          </h3>
          <p className="text-2xl font-bold">{stats.activeUsers}</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <h3 className="mb-4 text-lg font-medium">Atividade de mensagem</h3>
          <LineChart />
        </Card>
        <Card className="col-span-3 p-6">
          <h3 className="mb-4 text-lg font-medium">Usuários Cadastrados</h3>
          <BarChart />
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-medium">Mensagens recentes</h3>
          <MessagesList />
        </Card>
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-medium">Visão geral do sistema</h3>
          <Overview />
        </Card>
      </div>
    </div>
  );
}
